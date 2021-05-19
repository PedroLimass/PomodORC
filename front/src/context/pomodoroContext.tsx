import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface PomodoroContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    pausePomodoro: () => void;
    startPomodoro: () => void;
    resetPomodoro: () => void;
    breakTimePomodoro: () => void;
    newTime: (time: number) => void;
}

interface PomodoroProviderProps {
    children: ReactNode;
}

export const PomodoroContext = createContext({} as PomodoroContextData);

let countdownTimeout: NodeJS.Timeout;

export function PomodoroProvider({ children }: PomodoroProviderProps) {


    const [time, setTime] = useState(20 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function pausePomodoro() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
    }


    function startPomodoro() {
        setIsActive(true);
    }

    function resetPomodoro() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(20 * 60);
    }

    function breakTimePomodoro() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(5 * 60);
        setIsActive(true);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        }
        else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            // startNewChallenge();
        }
    }, [isActive, time])

    function newTime(time: number) {
        setTime(time * 60);
    }

    return (
        <PomodoroContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            pausePomodoro,
            startPomodoro,
            breakTimePomodoro,
            resetPomodoro,
            newTime,
        }}>
            {children}
        </PomodoroContext.Provider>
    );
}


import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { TaskListContext } from './taskListContext'
interface PomodoroContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    isBreakout: boolean;
    time: number;
    taskTime: number;
    pausePomodoro: () => void;
    startPomodoro: () => void;
    resetPomodoro: () => void;
    breakTimePomodoro: () => void;
    newTime: (time: number) => void;
    changeTaskListId: (id: string) => void;
    changeTaskIndex: (index: number) => void;
}

interface PomodoroProviderProps {
    children: ReactNode;
}

export const PomodoroContext = createContext({} as PomodoroContextData);

let countdownTimeout: NodeJS.Timeout;

export function PomodoroProvider({ children }: PomodoroProviderProps) {
    const breakoutTime = 5 * 60;
    const taskTime = 25 * 60;
    const [time, setTime] = useState(taskTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const [isBreakout, setIsBreakout] = useState(false);
    const [taskListId, setTaskListId] = useState('');
    const [taskIndex, setTaskIndex] = useState(-1);
    const { addTaskTime } = useContext(TaskListContext);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function changeTaskListId(id: string) { setTaskListId(id); }
    function changeTaskIndex(index: number) { setTaskIndex(index); }

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
        setTime(taskTime);
        setIsBreakout(false);

    }

    function breakTimePomodoro() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(true);
        setTime(breakoutTime);
        setIsActive(false);
        setIsBreakout(true);

    }

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        }
        else if (isActive && time === 0) {
            if (isBreakout) {
                endBreakOutNotification();
                resetPomodoro();

            } else {
                endPomoNotification();
                addTaskTime(taskIndex, Math.floor((taskTime - time) / 60), taskListId);
                breakTimePomodoro();
            }

        }
        // eslint-disable-next-line
    }, [isActive, time])

    function endBreakOutNotification() {
        if (Notification.permission === 'granted') {
            new Audio('/endBreakout.mp3').play();

            const notification = new Notification('Acabou descanso!', {
                body: 'Bora trabalhar 📚'
            });
            notification.onclick = (e) => {
                e.preventDefault();
                window.focus();
                notification.close();
            }
        }
    }

    function endPomoNotification() {
        if (Notification.permission === 'granted') {
            new Audio('/endpomo.wav').play();

            const notification = new Notification('Parabéns!', {
                body: 'Bora descansar 💤'
            });
            notification.onclick = (e) => {
                e.preventDefault();
                window.focus();
                notification.close();
            }
        }
    }

    function newTime(time: number) {
        setTime(time * 60);
    }

    return (
        <PomodoroContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            isBreakout,
            time,
            taskTime,
            pausePomodoro,
            startPomodoro,
            breakTimePomodoro,
            resetPomodoro,
            newTime,
            changeTaskListId,
            changeTaskIndex
        }}>
            {children}
        </PomodoroContext.Provider>
    );
}


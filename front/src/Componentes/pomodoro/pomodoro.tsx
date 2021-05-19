import React, { useContext, useEffect, useState } from 'react'
import Modal from "react-modal";
import close from "../../assets/close.png";
import reset from '../../assets/reset.png';
import pause from '../../assets/pause.png';
import sleep from '../../assets/sleep.png';
import play from '../../assets/play.png';
import { PomodoroProvider, PomodoroContext } from '../../context/pomodoroContext';
import "./pomodoro.css";

function Pomodoro(props: any) {
    const { open, setOpen } = props;
    const { content } = props;
    const { minutes, seconds, startPomodoro, isActive, pausePomodoro, resetPomodoro, breakTimePomodoro } = useContext(PomodoroContext);
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    useEffect(() => {
    }, [])

    return (

        <Modal isOpen={open} className="modalTimer">
            <div className="pomo">
                <div className="fechar">
                    <button onClick={() => {
                        pausePomodoro();
                        setOpen(false);
                    }} className="closeB"><img src={close} alt="Close button" className="closeIcon" /></button></div>
                <div className="Titulo"><p>{content}</p></div>
                <div className="timer">

                    {seconds < 10 ? (<p>{minutes}:0{seconds}</p>) : <p>{minutes}:{seconds}</p>}
                </div>
                <div className="botoes">
                    {isActive ? (
                        <>
                            <button onClick={() => {
                                pausePomodoro();

                            }} className="Button"><img src={pause} alt="Pause button" className="pauseIcon" /></button>
                            <button onClick={() => {
                                resetPomodoro();
                            }} className="Button"><img src={reset} alt="Reset button" className="resetIcon" /></button>
                            <button onClick={() => {
                                breakTimePomodoro();
                            }} className="Button"><img src={sleep} alt="Break button" className="sleep" /></button>
                        </>) : (<>
                            <button onClick={() => {
                                startPomodoro();
                            }} className="Button"><img src={play} alt="Play button" className="play" /></button>
                            <button onClick={() => {
                                resetPomodoro();
                            }} className="Button"><img src={reset} alt="Reset button" className="resetIcon" /></button>
                        </>)}
                </div>
            </div>
        </Modal>



    );
}

export default Pomodoro;

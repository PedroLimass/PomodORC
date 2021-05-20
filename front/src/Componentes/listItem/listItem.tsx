import React, { useContext, useState, BaseSyntheticEvent } from "react";
import { TaskListContext } from "../../context/taskListContext";
import iconPencil from "../../assets/iconPencil.png";
import close from "../../assets/close.png";
import timer from "../../assets/iconTimer.png";
import saveIcon from "../../assets/saveIcon.png";
import deleteIcon from "../../assets/delete.svg";
import plus from "../../assets/plus.png"
import subtract from "../../assets/subtract.png"
import close15 from "../../assets/close15.png"
import edit from "../../assets/edit.png"
import "./listItem.css";

import Pomodoro from '../pomodoro/pomodoro';
import { PomodoroContext } from '../../context/pomodoroContext';


function ListItem(props: any) {
    const { index, item, id } = props;
    const [openModal, setOpenModal] = useState(false);
    const [taskContent, setTaskContent] = useState("");
    const [editingContent, setEditingContent] = useState(false);
    const [newTimeModifier, setNewTimeModifier] = useState(0);
    const {
        taskList,
        updateTaskStatus,
        updateTask,
        deleteTask,
        setTaskTime,
    } = useContext(TaskListContext);

    const { changeTaskIndex, changeTaskListId } = useContext(PomodoroContext);

    const handleCheckBox = (index: number) => {
        updateTaskStatus(taskList._id, index);
    };
    const clickHandle = () => {
        setEditingContent(!editingContent);
        if (taskContent !== "") setTaskContent("");
    };
    const handleChangeContent = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (name === "newContent") {
            setTaskContent(value);
        } else {
        }
    };
    const handleSaveContent = () => {
        let aux = taskContent;
        if (aux.trim() !== "") {
            updateTask(taskList._id, index, taskContent);
        }
        setEditingContent(false);
    };

    const handleDeleteButton = () => {
        deleteTask(taskList._id, index);
    };

    const handleSaveNewTime = () => {
        setTaskTime(index, item.time + newTimeModifier, id);
        setNewTimeModifier(0);
    }
    const handlerSubtractModifier = () => {
        if (item.time + newTimeModifier > 0)
            setNewTimeModifier(newTimeModifier - 1)
    }
    return (
        <div className="item2">
            <input
                type="checkbox"
                name="status"
                checked={item.status}
                onChange={() => {
                    handleCheckBox(index);
                }}
                className="check"
            />
            {editingContent ? (
                <>
                <div className="AlinhamentoI">
                    <div className="Div">
                    <label htmlFor="status">
                        <form>
                            <input
                                type="text"
                                value={taskContent}
                                onChange={handleChangeContent}
                                placeholder={item.content}
                                name="newContent"
                                className="newContent"
                            />
                        </form>

                    </label>
                    
                    <button
                        onClick={() => {
                            handleSaveContent();
                            handleSaveNewTime();
                        }}
                        className="editarTask"
                    >
                        <img src={saveIcon} alt="Save button" className="saveIcon" />
                    </button>

                    <button
                        onClick={() => {
                            clickHandle();
                            setNewTimeModifier(0);
                        }}
                        className="editarTask"
                    >
                        <img src={close} alt="Close button" className="closeIcon" />
                    </button> 
                    
                    </div>
                    <div className='time'>
                        {`Total: ${item.time + newTimeModifier} min.`}
                        <button className='timebuttons' onClick={() => { setNewTimeModifier(newTimeModifier + 1) }}>
                            <img src={plus} alt="Plus button" /></button>
                        <button className='timebuttons' onClick={() => { handlerSubtractModifier() }}>
                            <img src={subtract} alt="Subtract button" /></button>
                    </div>
                </div>
                </>
            ) : (
                <div className="task2">
                    <label htmlFor="status">
                        <p>{item.content} </p>

                        <div className='time'>
                            Total: {item.time} min.
                        </div>
                    </label>

                    <button
                        onClick={() => {
                            clickHandle();
                        }}
                        className="editarTask"
                    >
                        <img src={iconPencil} alt="iconPencil" className="iconPencil" />
                    </button>
                    <button
                        onClick={() => {
                            handleDeleteButton();
                        }}
                        className="editarTask"
                    >
                        <img src={deleteIcon} alt="deleteIcon" className="deleteIcon" />
                    </button>
                    <button
                        onClick={() => {
                            // changeOpenM();
                            setOpenModal(true);
                            changeTaskIndex(index);
                            changeTaskListId(id);
                            // setOpenModal(true);
                        }}
                        className="editarTask"
                    >
                        <img src={timer} alt="Timer button" className="TimerIcon" />
                    </button>
                    <Pomodoro content={item.content} open={openModal} setOpen={setOpenModal} id={id} index={index} />
                </div>
            )
            }
            {/* <label htmlFor="status">{item.content}</label> */}
        </div >
    );
}

export default ListItem;

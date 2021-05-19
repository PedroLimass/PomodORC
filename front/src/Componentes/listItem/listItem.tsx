import React, { useContext, useState, BaseSyntheticEvent } from "react";
import { TaskListContext } from "../../context/taskListContext";
import iconPencil from "../../assets/iconPencil.png";
import close from "../../assets/close.png";
import timer from "../../assets/iconTimer.png";
import saveIcon from "../../assets/saveIcon.png";
import deleteIcon from "../../assets/delete.svg";
import "./listItem.css";

import Pomodoro from '../pomodoro/pomodoro';
import { PomodoroContext } from '../../context/pomodoroContext';


function ListItem(props: any) {
    const { index, item } = props;
    const [openModal, setOpenModal] = useState(false);
    const [taskContent, setTaskContent] = useState("");
    const [editingContent, setEditingContent] = useState(false);
    const {
        taskList,
        updateTaskStatus,
        updateTask,
        deleteTask
    } = useContext(TaskListContext);

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
                        }}
                        className="editarTask"
                    >
                        <img src={saveIcon} alt="Save button" className="saveIcon" />
                    </button>
                    <button
                        onClick={() => {
                            clickHandle();
                        }}
                        className="editarTask"
                    >
                        <img src={close} alt="Close button" className="closeIcon" />
                    </button>
                </>
            ) : (
                <div className="task2">
                    <label htmlFor="status">
                        <p>{item.content}</p>
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
                            // setOpenModal(true);
                        }}
                        className="editarTask"
                    >
                        <img src={timer} alt="Timer button" className="TimerIcon" />
                    </button>
                    <Pomodoro content={item.content} open={openModal} setOpen={setOpenModal} />
                </div>
            )}
            {/* <label htmlFor="status">{item.content}</label> */}
        </div>
    );
}

export default ListItem;

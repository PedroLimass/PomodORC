import React, { useState, BaseSyntheticEvent, useContext } from 'react';
import Modal from "react-modal";
import { TaskListContext } from '../../context/taskListContext';
import close from '../../assets/close.png';
import Addbtn from '../../assets/Addbtn.png';
import { Link } from 'react-router-dom';
import './taskList.css';

function List(props: any,) {
    const [openList, setOpenList] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const { addTask, getTaskLists } = useContext(TaskListContext);

    const taskList: TaskList = props.taskList;


    function change() {
        setOpenList(!openList);
    }

    const handleChangeInput = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (name === "taskAdd") {
            setInputValue(value);
        } else { }
    }

    const handleSaveInput = () => {
        let newTask = inputValue;
        save(newTask);
    }
    const save = (newTask: string) => {
        addTask(taskList.title, newTask);

        getTaskLists();
        setOpenList(true);

    }


    return (
        <>

        <button className='c' onClick={props.onClick}> <p>{taskList.title}</p></button>

            <Modal className='taskListModal' isOpen={openList} >
                <div className='top'>
                    <h2>{taskList.title}</h2>
                    <button onClick={change}>
                        <img src={close} alt="close button" />
                    </button>
                </div>


                <form className='form'>
                    <input type="text" name='taskAdd' value={inputValue} onChange={handleChangeInput} />
                    <button onClick={handleSaveInput}><img src={Addbtn} alt="Add button" /></button>
                </form>

                <div className="list">
                    {taskList.tasks.map((item: Task, index: number) => {
                        return (
                            <div id={`${index}`} className="item">
                                <input type="checkbox" name='status' checked={item.status} />
                                <label htmlFor="status">{item.content}</label>
                            </div>)
                    })}
                </div>


            </Modal>
        </>
    )
}

export default List

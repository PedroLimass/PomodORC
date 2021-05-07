import React, { useState, BaseSyntheticEvent, useContext } from 'react'
import Modal from "react-modal";
import { TaskListContext } from '../context/taskListContext';


import './list.css'




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

    }


    return (
        <>
            <div className='c' onClick={change}> {taskList.title}</div>


            <Modal isOpen={openList} >
                <div className='listHead'>
                    <h2>{taskList.title}</h2>

                    <button onClick={change}>X</button>

                </div>
                <form >
                    <input type="text" name='taskAdd' value={inputValue} onChange={handleChangeInput} />
                    <button onClick={handleSaveInput}>Adicionar</button>
                </form>

                {taskList.tasks.map((item: Task, index: number) => {
                    return <div id={`${index}`} className="item">
                        <input type="checkbox" name='status' checked={item.status} />
                        <label htmlFor="status">{item.content}</label>
                    </div>
                })}


            </Modal>
        </>
    )
}

export default List

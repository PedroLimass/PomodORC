import React, { BaseSyntheticEvent, useContext, useEffect, useState } from 'react';
import Modal from "react-modal";
import { useParams } from 'react-router-dom';
import { TaskListContext } from '../../context/taskListContext';

import addbtn from '../../assets/Addbtn.png';

function TasksPage(props: any) {
    const { taskList, readTaskList, addTask } = useContext(TaskListContext);
    const id = props.location.state;
    const [modalOpen, setOpen] = useState(false);
    const [taskContent, setTaskContent] = useState("");

    useEffect(() => {
        readTaskList(id);
        // console.log(taskList);
    }, [addTask])


    const handleChangeInput = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (name === "newTaskContent") {
            setTaskContent(value);
        } else { }
    }

    const handleCriarInput = () => {
        let newTaskContent = taskContent;
        let aux = newTaskContent
        if (aux.trim() !== '') {
            addTask(taskList.title, newTaskContent);
            setOpen(false);
            setTaskContent('');
        }

    }

    return (
        <>
            <div className='top'>
                <h2>{taskList && taskList.title}</h2>

                <button
                    onClick={() => {
                        setOpen(true);
                    }}
                    className="adicionar"
                >
                    <img src={addbtn} alt="create button" />
                </button>

            </div>
            <div>
                <Modal isOpen={modalOpen} contentLabel="New Tasks Modal">
                    <h2>Adicionar tarefas</h2>
                    <form>
                        <div>
                            <label>Nome</label>
                            <input value={taskContent} onChange={handleChangeInput} name="newTaskContent" />
                        </div>
                    </form>
                    <button onClick={handleCriarInput}>Criar</button>
                    <button
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Sair
        </button>
                </Modal>
            </div>

            {/* <form className='form'>
                <input type="text" name='taskAdd' value={inputValue} onChange={handleChangeInput} />
                <button onClick={handleSaveInput}><img src={Addbtn} alt="Add button" /></button>
            </form> */}

            <div className="list">
                {taskList.tasks && taskList.tasks.map((item: Task, index: number) => {
                    return (
                        <div id={`${index}`} className="item">
                            <input type="checkbox" name='status' checked={item.status} />
                            <label htmlFor="status">{item.content}</label>
                        </div>)
                })}
            </div>
        </>
    )
}


export default TasksPage;
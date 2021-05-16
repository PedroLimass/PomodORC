import React, { BaseSyntheticEvent, useContext, useEffect, useState } from 'react';
import Modal from "react-modal";
// import { useParams } from 'react-router-dom';
import { TaskListContext } from '../../context/taskListContext';
import close from '../../assets/close.png';
import addbtn from '../../assets/Addbtn.png';

function TasksPage(props: any) {
    const { taskList, readTaskList, addTask, editTaskListTitle } = useContext(TaskListContext);
    const id = props.location.state;
    const [modalOpen, setOpen] = useState(false);
    const [editingTitle, setEditingTitle] = useState(false);
    const [taskContent, setTaskContent] = useState("");
    const [taskTitle, setTaskTitle] = useState('');

    useEffect(() => {
        readTaskList(id);
        // eslint-disable-next-line
    }, [addTask])


    const handleChangeInput = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (name === "newTaskContent") {
            setTaskContent(value);
        } else { }
    }

    const handleChangeTitle = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (name === "newTitle") {
            setTaskTitle(value);
        } else { }
    }

    const handleSaveTitle = () => {
        let newTaskTitle = taskTitle;
        let aux = newTaskTitle;
        if (aux.trim() !== '') {
            editTaskListTitle(taskList._id, newTaskTitle);
            setTaskTitle('');
            setEditingTitle(false);
        }
    }

    const handleCriarInput = () => {
        let newTaskContent = taskContent;
        let aux = newTaskContent
        if (aux.trim() !== '') {
            addTask(taskList.title, newTaskContent);
            setTaskContent('');
            setOpen(false);
        }

    }

    return (
        <>
            <div className='top'>
                {editingTitle ? (
                    <> <form>
                        <input
                            type="text"
                            value={taskTitle}
                            onChange={handleChangeTitle}
                            placeholder={taskList.title}
                            name="newTitle" />
                    </form>
                        <button onClick={handleSaveTitle}>Salvar</button>
                        <button onClick={() => { setEditingTitle(false) }}><img src={close} alt="Close button" /></button>
                    </>
                ) : (
                    <>
                        <h2>{taskList && taskList.title}</h2>
                        <button onClick={() => { setEditingTitle(true) }}>Editar titulo</button>
                    </>
                )}

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
                        <img src={close} alt="Close button" />
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
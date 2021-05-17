import React, { useContext, useState, BaseSyntheticEvent } from 'react'
import { TaskListContext } from '../../context/taskListContext';

function ListItem(props: any) {
    const { index, item } = props;

    const [taskContent, setTaskContent] = useState("");
    const [editingContent, setEditingContent] = useState(false);
    const { taskList, readTaskList, addTask, editTaskListTitle, updateTaskStatus, updateTask } = useContext(TaskListContext);

    const handleCheckBox = (index: number) => {
        updateTaskStatus(taskList._id, index);
    }
    const clickHandle = () => {
        setEditingContent(!editingContent);
        if (taskContent !== '')
            setTaskContent('');
    }
    const handleChangeContent = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (name === "newContent") {
            setTaskContent(value);
        } else { }
    }
    const handleSaveContent = () => {
        let aux = taskContent;
        if (aux.trim() !== '') {
            updateTask(taskList._id, index, taskContent);
        }
        setEditingContent(false);

    }

    return (
        <div className="item">
            <input type="checkbox" name='status' checked={item.status} onChange={() => { handleCheckBox(index) }} />
            {editingContent ? (
                <><label htmlFor="status">
                    <form>
                        <input
                            type="text"
                            value={taskContent}
                            onChange={handleChangeContent}
                            placeholder={item.content}
                            name="newContent" />
                    </form>
                </label>
                    <button onClick={() => {handleSaveContent() }}>Salvar</button>
                    <button onClick={() => { clickHandle() }}>Cancelar</button>
                </>
            ) : (
                <>
                    <label htmlFor="status">{item.content}</label>
                    <button onClick={() => { clickHandle() }}>Editar</button>

                </>
            )
            }
            {/* <label htmlFor="status">{item.content}</label> */}

        </div >
    )
}

export default ListItem

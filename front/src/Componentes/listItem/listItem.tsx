import React, { useContext } from 'react'
import { TaskListContext } from '../../context/taskListContext';

function ListItem(props: any) {
    const { index, item } = props;

    const { taskList, readTaskList, addTask, editTaskListTitle, updateTaskStatus } = useContext(TaskListContext);

    const handleCheckBox = (index: number) => {
        updateTaskStatus(taskList._id, index);
    }
    return (
        <div className="item">
            <input type="checkbox" name='status' checked={item.status} onChange={() => { handleCheckBox(index) }} />
            <label htmlFor="status">{item.content}</label>

        </div>
    )
}

export default ListItem

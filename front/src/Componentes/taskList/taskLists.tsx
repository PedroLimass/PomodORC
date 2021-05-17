
import './taskLists.css';

function TaskLists(props: any,) {

    const taskList: TaskList = props.taskList;

    return (
        <>
            <button className='c' onClick={props.onClick}> <p>{taskList.title}</p></button>
        </>
    )
}

export default TaskLists;

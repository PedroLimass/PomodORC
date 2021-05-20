
import './taskLists.css';

function TaskLists(props: any,) {

    const taskList: TaskList = props.taskList;

    return (
        <div className="alinharC">
            <button className='c' onClick={props.onClick}> <p>{taskList.title}</p></button>
        </div>
    )
}

export default TaskLists;

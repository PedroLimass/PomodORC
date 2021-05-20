
import './taskLists.css';

function TaskLists(props: any,) {

    const taskList: TaskList = props.taskList;
    return (
        <>
            <button className='c' onClick={props.onClick}>
                <div>
                    <p>{taskList.title}</p>
                </div>
            </button>
        </>
    )
}

export default TaskLists;

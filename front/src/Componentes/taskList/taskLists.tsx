
import './taskLists.css';

function TaskLists(props: any,) {

    const taskList: TaskList = props.taskList;
    return (
        <>
            <button className='c' onClick={props.onClick}>
                <div className='deleteButton'> 
                    <button className='delete'onClick={props.deleteClick}>
                        <img src="./delete.png" alt="" />   
                    </button>
                </div> 
                <div>
                    <p>{taskList.title}</p>
                </div>
            </button>
        </>
    )
}

export default TaskLists;

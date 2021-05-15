import React from 'react';
// import { TaskListContext } from '../../context/taskListContext';
import { useParams } from 'react-router-dom'

function TasksPage(props: any) {
    const id = props.location.state;
    console.log(id);
    //  
    // const [inputValue, setInputValue] = useState('')
    // const { addTask, getTaskLists } = useContext(TaskListContext);
    // const taskList: TaskList = props.taskList;

    // const handleChangeInput = (e: BaseSyntheticEvent) => {
    //     e.preventDefault();
    //     const { name, value } = e.target;

    //     if (name === "taskAdd") {
    //         setInputValue(value);
    //     } else { }
    // }

    // const handleSaveInput = () => {
    //     let newTask = inputValue;
    //     save(newTask);
    // }
    // const save = (newTask: string) => {
    //     addTask(taskList.title, newTask);

    //     getTaskLists();

    // }

    // return (
    //     <>
    //     <p>a funciona</p>
    //         <p>batata</p>
    //         <div className='top'>
    //             <h2>{taskList.title}</h2>

    //         </div>


    //         <form className='form'>
    //             <input type="text" name='taskAdd' value={inputValue} onChange={handleChangeInput} />
    //             <button onClick={handleSaveInput}><img src={Addbtn} alt="Add button" /></button>
    //         </form>

    //         <div className="list">
    //             {taskList.tasks.map((item: Task, index: number) => {
    //                 return (
    //                     <div id={`${index}`} className="item">
    //                         <input type="checkbox" name='status' checked={item.status} />
    //                         <label htmlFor="status">{item.content}</label>
    //                     </div>)
    //             })}
    //         </div>
    //     </>
    // )

    return <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
}


export default TasksPage;
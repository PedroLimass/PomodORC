import React, {BaseSyntheticEvent, useEffect,useState} from 'react';
import Modal from 'react-modal';

function Tasks() {
   
const [modalOpen, setOpen] = useState(false);
const [taskName, setTaskName] = useState("");
const [taskList, setTaskList] = useState([]);
const handleChange = (e:BaseSyntheticEvent) => {
    const {name, value} = e.target;
    if(name === "taskName"){
        setTaskName(value);
    }else{
    }
}
// const save=(taskObject) =>{
//   let tempList = taskList;
//   tempList.push(taskObject);
//   setTaskList(tempList);
//   setOpen(false);
// }
    return (
    <div>
      <h1>Tarefas</h1>
      <button onClick = {()=>{setOpen(true)}}>
       Informe a tarefa   
      </button>
      <Modal isOpen={modalOpen} contentLabel="New Tasks Modal">
        <h2>Digite a tarefa</h2>
        <form>
            <div>
             <label>Nome</label>
                <input value={taskName} onChange={handleChange} name="taskName"/>
            </div>
        </form>
        <button>
       Criar  
      </button>
      <button onClick = {()=>{setOpen(false)}}>
       Sair 
      </button>
      </Modal>
    </div>
  );
}

export default Tasks;

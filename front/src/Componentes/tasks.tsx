import React, { BaseSyntheticEvent, useEffect, useState, useContext } from "react";
import { UserContext } from '../context/userContext';
import { TaskListContext } from '../context/taskListContext';

import Modal from "react-modal";
import create from "../../src/create.png";
import "./tasks.css";


interface Task {

  name: string,
  status: boolean

}
interface TaskList {

  _id: string,
  title: string,
  user: string,
  tasks: Task[],

}

function Tasks() {
  const [modalOpen, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const { user, getUser } = useContext(UserContext);
  const { taskLists, getTaskLists, createTasklist } = useContext(TaskListContext);


  useEffect(() => {
    getTaskLists();
  }, [user])


  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    if (name === "taskName") {
      setTaskName(value);
    } else {
    }
  };


  const save = (taskListObject: TaskList) => {

    createTasklist(taskListObject);

    setOpen(false);
  };

  const handleSave = () => {
    let taskListObj: TaskList = {
      title: taskName,
      tasks: [],
      _id: "Batata",
      user: user.email
    };
    save(taskListObj);
    // window.location.reload();
    getUser();
  };

  return (
    <section className="task">
      <div className="t">
        <div>
          <h1 className="titulo">Pomod'Orc</h1>
        </div>
        <div>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="adicionar"
          >
            <img src={create} alt="create button" />
          </button>
        </div>
      </div>
      <div>
        <Modal isOpen={modalOpen} contentLabel="New Tasks Modal">
          <h2>Digite a tarefa</h2>
          <form>
            <div>
              <label>Nome</label>
              <input value={taskName} onChange={handleChange} name="taskName" />
            </div>
          </form>
          <button onClick={handleSave}>Criar</button>
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            Sair
          </button>
        </Modal>
        <div className="card">
          {taskLists.map((element) => (
            <div className="c">{element.title}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tasks;

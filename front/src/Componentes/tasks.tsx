import React, { BaseSyntheticEvent, useEffect, useState, useContext } from "react";
import { UserContext } from '../context/userContext';
import { TaskListContext } from '../context/taskListContext';

import Modal from "react-modal";
import create from "../../src/create.png";
import "./tasks.css";

//#region interface
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
//#endregion


function Tasks() {
  const [modalOpen, setOpen] = useState(false);
  const [refresher, setRefresher] = useState(true);
  const [taskListTitle, setTaskListTitle] = useState("");
  const { user, getUser } = useContext(UserContext);
  const { taskLists, getTaskLists, createTasklist } = useContext(TaskListContext);


  function refresh() {
    setRefresher(!refresh);
  }

  useEffect(() => {
    getTaskLists();
  }, [refresher])


  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    if (name === "taskListTitle") {
      setTaskListTitle(value);
    } else {
    }
  };


  const save = (taskListObject: TaskList) => {

    createTasklist(taskListObject);

    setOpen(false);
  };

  const handleSave = () => {
    let taskListObj: TaskList = {
      title: taskListTitle,
      tasks: [],
      _id: "Batata",
      user: user.email
    };
    save(taskListObj);
    // window.location.reload();
    refresh();

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
              <input value={taskListTitle} onChange={handleChange} name="taskListTitle" />
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

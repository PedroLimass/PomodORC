import React, { BaseSyntheticEvent, useEffect, useState, useContext } from "react";
import Modal from "react-modal";

import { UserContext } from '../context/userContext';
import { TaskListContext } from '../context/taskListContext';

import List from './list';
import create from "../../src/assets/create.png";
import "./tasks.css";



function Tasks() {
  const [modalOpen, setOpen] = useState(false);
  const [taskListTitle, setTaskListTitle] = useState("");
  const { user, getUser } = useContext(UserContext);
  const { taskLists, getTaskLists, createTasklist } = useContext(TaskListContext);



  useEffect(() => {
    if (user.name === "temp") {
      getUser();
    }
    getTaskLists();
  }, [user])



  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    if (name === "taskListTitle") {
      setTaskListTitle(value);
    } else {
    }
  };


  const save = (taskListObject: any) => {

    createTasklist(taskListObject);

    setOpen(false);
  };

  const handleSave = () => {
    let taskListObj: TaskList = {
      title: taskListTitle,
      tasks: [] as Task[],
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
          <h2>Adicionar lista de tarefas</h2>
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
          {taskLists.map((element) => (<List taskList={element} ></List>))}
        </div>
      </div>
    </section>
  );
}

export default Tasks;

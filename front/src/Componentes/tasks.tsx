import React, { BaseSyntheticEvent, useEffect, useState, useContext } from "react";
import { UserContext } from '../context/userContext';
import Modal from "react-modal";
import create from "../../src/create.png";
import "./tasks.css";

interface ITask {
  Name: string;
}
function Tasks() {
  const [modalOpen, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const { user, getUser } = useContext(UserContext);

  useEffect(() => {
    let arr = localStorage.getItem("taskList");
    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
    getUser();
  }, []);


  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    if (name === "taskName") {
      setTaskName(value);
    } else {
    }
  };


  const save = (taskObject: ITask) => {
    const temp = [...taskList, taskObject];
    setTaskList([...taskList, taskObject]);
    localStorage.setItem("taskList", JSON.stringify(temp));
    setOpen(false);
  };

  const handleSave = () => {
    let taskObj: ITask = {
      Name: taskName,
    };
    save(taskObj);
    window.location.reload();
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
          {taskList.map((element) => (
            <div className="c">{element.Name}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tasks;

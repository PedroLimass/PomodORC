import React, {
  BaseSyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import Modal from "react-modal";
import { TaskListContext } from "../../context/taskListContext";
import close from "../../assets/close.png";
import addbtn from "../../assets/Addbtn.png";
import returnbtn from "../../assets/Return.svg";
import iconPencil from "../../assets/iconPencil.png";
import saveIcon from "../../assets/saveIcon.png";

import "./index.css";

import ListItem from "../../Componentes/listItem/listItem";

function TasksPage(props: any) {
  const id = props.location.state;
  const {
    taskList,
    readTaskList,
    addTask,
    editTaskListTitle,
    updateTaskStatus,
  } = useContext(TaskListContext);
  const [modalOpen, setOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [taskContent, setTaskContent] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    readTaskList(id);
    // eslint-disable-next-line
  }, [addTask, updateTaskStatus]);

  const handleChangeInput = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "newTaskContent") {
      setTaskContent(value);
    } else {
    }
  };

  const handleChangeTitle = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "newTitle") {
      setTaskTitle(value);
    } else {
    }
  };

  const handleSaveTitle = () => {
    let newTaskTitle = taskTitle;
    let aux = newTaskTitle;
    if (aux.trim() !== "") {
      editTaskListTitle(taskList._id, newTaskTitle);
      setTaskTitle("");
      setEditingTitle(false);
    }
  };

  const handleCriarInput = () => {
    let newTaskContent = taskContent;
    let aux = newTaskContent;
    if (aux.trim() !== "") {
      addTask(taskList.title, newTaskContent);
      setTaskContent("");
      setOpen(false);
    }
  };

  const handleCheckBox = (index: number) => {
    updateTaskStatus(taskList._id, index);
  };

  const handleBackButton = () => {
    props.history.push({ pathname: `/` });
  };

  return (
    <>
      <section className="T">
        <button
          onClick={() => {
            handleBackButton();
          }}
          className="return"
        >
          <img src={returnbtn} alt="Return button" />
        </button>
        <div className="titulo">
          {editingTitle ? (
            <>
              <form className="editarT">
                <input
                  className="editarTitulo"
                  type="text"
                  value={taskTitle}
                  onChange={handleChangeTitle}
                  placeholder={taskList.title}
                  name="newTitle"
                />
              </form>
              <button onClick={handleSaveTitle} className="salvar">
                <img src={saveIcon} alt="Save button" />
              </button>
              <button
                onClick={() => {
                  setEditingTitle(false);
                }}
                className="adicionarTarefa"
              >
                <img src={close} alt="Close button" />
              </button>
            </>
          ) : (
            <>
              <h2>{taskList && taskList.title}</h2>
              <button
                onClick={() => {
                  setEditingTitle(true);
                }}
                className="editar"
              >
                <img src={iconPencil} alt="iconPencil" />
              </button>
            </>
          )}
        </div>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="adicionarTarefa"
        >
          <img src={addbtn} alt="create button" />
        </button>
      </section>
      <div>
        <Modal
          isOpen={modalOpen}
          contentLabel="New Tasks Modal"
          className="novaTarefa"
        >
          <div className="alinhar">
            <div className="tituloModal">
              <h2>Adicionar tarefas</h2>
            </div>
            <div className="linear">
              <form>
                <div>
                  <label>Nome</label>
                  <input
                    className="criarT"
                    value={taskContent}
                    onChange={handleChangeInput}
                    name="newTaskContent"
                  />
                </div>
              </form>
              <button onClick={handleCriarInput} className="criarTarefa">
                <img src={saveIcon} alt="Save button" />
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="closeTarefa"
              >
                <img src={close} alt="Close button" />
              </button>
            </div>
          </div>
        </Modal>
      </div>

      {/* <form className='form'>
                <input type="text" name='taskAdd' value={inputValue} onChange={handleChangeInput} />
                <button onClick={handleSaveInput}><img src={Addbtn} alt="Add button" /></button>
            </form> */}

      <div className="list">
        {taskList.tasks &&
          taskList.tasks.map((item: Task, index: number) => {
            return (
              <>
                {/* <div key={index} className="item">
                                <input type="checkbox" name='status' checked={item.status} onChange={() => { handleCheckBox(index) }} />
                                <label htmlFor="status">{item.content}</label>

                            </div> */}
                <ListItem key={index} index={index} item={item} />
              </>
            );
          })}
      </div>
    </>
  );
}

export default TasksPage;

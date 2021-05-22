import React, {
    BaseSyntheticEvent,
    useEffect,
    useState,
    useContext,
} from "react";
import Modal from "react-modal";
import close from "../../assets/close.png";
import { UserContext } from "../../context/userContext";
import { TaskListContext } from "../../context/taskListContext";
import TaskLists from "../../Componentes/taskList/taskLists";
import create from "../../assets/create.png";
import saveIcon from "../../assets/saveIcon.png";
import "./styles.css";
import deleteImg from "../../assets/delete.svg"

function HomePage(props: any) {
  const [modalOpen, setOpen] = useState(false);
  const [taskListTitle, setTaskListTitle] = useState("");
  const { user, getUser } = useContext(UserContext);
  const { taskLists, getTaskLists, createTasklist, deleteTaskList } =
    useContext(TaskListContext);

    useEffect(() => {
        if (user.name === "temp") {
            getUser();
        }
        getTaskLists();
        // eslint-disable-next-line
    }, [createTasklist]);

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
        setTaskListTitle("");
    };

    const handleSave = () => {
        let taskListObj: TaskList = {
            title: taskListTitle,
            tasks: [] as Task[],
            _id: "Batata",
            user: user.email,
        };
        save(taskListObj);
        getUser();
    };

    const handleListClick = (id: string) => {
        props.history.push({
            pathname: `/tasks/${id}`,
            state: id,
        });
    };

    return (
        <section className="task">
            <div className="t">
                <div className="titulo">
                    <p>Pomod'Orc</p>
                </div>
                <div>
                    <button
                        onClick={() => {
                            setOpen(true);
                        }}
                        className="adicionarLista"
                    >
                        <img src={create} alt="create button" />
                    </button>
                </div>
            </div>
            <div>
                <Modal
                    isOpen={modalOpen}
                    contentLabel="New Tasks Modal"
                    className="novaLista"
                >
                    <div className="alinhar">
                        <div className="tituloModal">
                            <h2>Adicionar lista de tarefas</h2>
                        </div>
                        <div className="linear">
                            <form>
                                <div>
                                    <label>Nome</label>
                                    <input
                                        className="nomeTarefa"
                                        value={taskListTitle}
                                        onChange={handleChange}
                                        name="taskListTitle"
                                    />
                                </div>
                            </form>
                            <button onClick={handleSave} className="salvarLista">
                                <img src={saveIcon} alt="Save button" />
                            </button>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                }}
                                className="fecharNovaLista"
                            >
                                <img src={close} alt="Close button" />
                            </button>
                        </div>
                    </div>
                    </Modal>
                <div className="card">
                    {taskLists.map((element) => (
                        <div className="orgButton">
                            <TaskLists
                                key={element._id}
                                taskList={element}
                                onClick={() => {
                                    handleListClick(element._id);
                                }}
                            />
                            <div className="aligned">
                                <div className='deleteButton'> 
                                    <button className='deleteButton'onClick={() =>{
                                        return deleteTaskList(element._id)
                                    }}>
                                        <img src={deleteImg} alt="delete" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HomePage;

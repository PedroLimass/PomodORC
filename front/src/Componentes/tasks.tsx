import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import Modal from "react-modal";

interface ITask {
    Name: string;
}
interface Props {
    titulo: String
}

function Tasks(props: Props) {
    const [modalOpen, setOpen] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskList, setTaskList] = useState<ITask[]>([]);
    useEffect(() => {
        let arr = localStorage.getItem("taskList");
        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
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
        <div>
            <h1>{props.titulo}</h1>
            <button
                onClick={() => {
                    setOpen(true);
                }}
            >
                Informe a tarefa
            </button>
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
            <div>
                {taskList.map((element) => (
                    <li className="tasks">{element.Name}</li>
                ))}
            </div>
        </div>
    );
}

export default Tasks;

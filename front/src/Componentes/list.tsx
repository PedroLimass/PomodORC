import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import Tasks from './tasks'
import Modal from "react-modal";

interface Item {
    title: string,
}


function List() {
    const [modalListOpen, setListOpen] = useState(false);
    const [listName, setListName] = useState("");
    const [titleList, setTitleList] = useState<Item[]>([]);

    useEffect(() => {
        let arr = localStorage.getItem("titleList");
        if (arr) {
            let obj = JSON.parse(arr);
            setTitleList(obj);
        }
        console.log({ "titleListUseeffect": titleList });
    }, []);

    const handleChange = (e: BaseSyntheticEvent) => {
        const { name, value } = e.target;
        if (name === "listName") {
            setListName(value);
        } else {
        }
    };

    const save = (titleItem: Item) => {
        const temp = [...titleList, titleItem];
        setTitleList([...titleList, titleItem]);
        localStorage.setItem("titleList", JSON.stringify(temp));
        console.log({ "titleListTemp": temp });
        console.log({ "titleList": titleList })
        setListOpen(false);
    };

    const handleSave = () => {
        let titleItem: Item = {
            title: listName,
        };
        save(titleItem);
        window.location.reload();
    };

    return (
        <div>
            <button onClick={() => { setListOpen(true); }}>
                Adicionar lista
            </button>

            <Modal isOpen={modalListOpen}>
                <h1>Nomeie a lista</h1>
                <form >
                    <label>Nome</label>
                    <input value={listName} onChange={handleChange} name="listName" />
                </form>
                <button onClick={handleSave}>Criar</button>
                <button onClick={() => { setListOpen(false); }}>
                    Sair
                </button>
            </Modal>
            <div>
                {titleList.map((element) => {
                    return < Tasks titulo={element.title} />
                })}
            </div>

        </div>
    )
}

export default List

import React, { createContext, ReactNode, useState, useContext } from 'react';
import api from '../services/api'
import { UserContext } from './userContext'


interface TaskListContextData {
    taskLists: TaskList[];
    taskList: any;
    getTaskLists: () => void;
    createTasklist: (taskList: TaskList) => Promise<void>;
    addTask: (title: string, content: string) => Promise<void>;
    updateTask: (id: string, index: number, content: string) => Promise<void>;
    updateTaskStatus: (id: string, index: number) => Promise<void>;
    readTaskList: (id: string) => Promise<void>;
    deleteTask: (id: string, index: number) => Promise<void>;
    editTaskListTitle: (id: string, title: string) => Promise<void>;
    addTaskTime: (index: number, time: number, id: string) => Promise<void>;
    setTaskTime: (index: number, time: number, id: string) => Promise<void>;


}
interface TaskListProviderProps {

    children: ReactNode;

}

export const TaskListContext = createContext({} as TaskListContextData);

export function TaskListProvider({ children }: TaskListProviderProps) {
    const [taskLists, setTaskLists] = useState<TaskList[]>([]);
    const [taskList, setTaskList] = useState<TaskList>({} as TaskList);
    const { user } = useContext(UserContext);

    async function getTaskLists() {
        try {
            const email = user.email;
            const response = await api.get(`/taskList/${email}`);
            const responseData: TaskList[] = response.data.taskList;

            setTaskLists(responseData);
        } catch (err) {
            console.error(err);
        }

    }

    async function createTasklist(taskList: TaskList) {

        try {
            // const response = 
            await api.post('/taskList', {
                title: taskList.title,
                user: taskList.user
            });

        } catch (err) {
            console.error({ erro: err.message })
        }
    }
    async function addTask(title: string, content: string) {
        try {
            await api.put('/taskList/task', {
                title: title,
                user: user.email,
                content: content
            });

        } catch (err) {
            console.error({ error: err.message })
        }

    }
    async function updateTask(id: string, index: number, content: string) {
        try {
            await api.put(`/taskList/task/${id}`, {
                index: index,
                content: content
            })
        } catch (err) {
            console.error({ error: err.message })
        }
    }
    async function updateTaskStatus(id: string, index: number) {

        try {
            await api.put(`/taskList/task/status/${id}`, {
                id: id,
                index: index
            })
        } catch (err) {
            console.error({ error: err.message });
        }

    }

    async function readTaskList(id: string) {
        try {
            const response = await api.get(`taskList/read/${id}`);
            // const tasklist = response.data;
            setTaskList(response.data as TaskList);

        } catch (err) {
            console.error({ error: err.message })
        }

    }

    async function deleteTask(id: string, index: number) {
        try {
            const response = await api.put(`taskList/task/delete/${id}`, { index: index, });
            // const tasklist = response.data;
            setTaskList(response.data as TaskList);

        } catch (err) {
            console.error({ error: err.message })
        }

    }

    async function editTaskListTitle(id: string, title: string) {
        try {
            const response = await api.put(`taskList/editTitle/${id}`, { title: title });
            // const tasklist = response.data;
            setTaskList(response.data as TaskList);

        } catch (err) {
            console.error({ error: err.message })
        }

    }

    async function addTaskTime(index: number, time: number, id: string) {
        try {
            await api.put(`taskList/task/time/${id}`, { index: index, time: time });

        } catch (err) {
            console.error({ error: err.message })
        }
    }

    async function setTaskTime(index: number, time: number, id: string) {
        try {
            await api.put(`taskList/task/time/set/${id}`, { index: index, time: time });

        } catch (err) {
            console.error({ error: err.message })
        }
    }


    return (
        <TaskListContext.Provider value={{
            taskLists,
            taskList,
            getTaskLists,
            createTasklist,
            addTask,
            updateTask,
            addTaskTime,
            readTaskList,
            deleteTask,
            editTaskListTitle,
            updateTaskStatus,
            setTaskTime,
        }}>{children}</TaskListContext.Provider>
    )
}
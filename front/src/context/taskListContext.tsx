import React, { createContext, ReactNode, useState, useContext } from 'react';
import api from '../services/api'
import { UserContext } from './userContext'


interface TaskListContextData {
    taskLists: TaskList[];
    getTaskLists: () => void;
    createTasklist: (taskList: TaskList) => Promise<void>;
    addTask: (title: string, content: string) => Promise<void>;
    updateTask: (id: string, index: number, content: string) => Promise<void>;
    readTaskList: (id: string) => Promise<void>;

}
interface TaskListProviderProps {

    children: ReactNode;

}

export const TaskListContext = createContext({} as TaskListContextData);

export function TaskListProvider({ children }: TaskListProviderProps) {
    const [taskLists, setTaskLists] = useState<TaskList[]>([]);
    const [taskList, setTaskList] = useState<TaskList>();
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

    async function readTaskList(id: string) {
        try {
            const taskList: TaskList = await api.get(`/taskList/${id}`);
            setTaskList(taskList);

        } catch (err) {
            console.error({ error: err.message })
        }

    }

    return (
        <TaskListContext.Provider value={{
            taskLists,
            getTaskLists,
            createTasklist,
            addTask,
            updateTask,
            readTaskList,
        }}>{children}</TaskListContext.Provider>
    )
}
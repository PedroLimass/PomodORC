import React, { createContext, ReactNode, useState, useContext } from 'react';
import api from '../services/api'
import { UserContext } from './userContext'


interface TaskListContextData {
    taskLists: TaskList[];
    getTaskLists: () => void;
    createTasklist: (taskList: TaskList) => Promise<void>;
    addTask: (title: string, content: string) => Promise<void>
}
interface TaskListProviderProps {

    children: ReactNode;

}

export const TaskListContext = createContext({} as TaskListContextData);

export function TaskListProvider({ children }: TaskListProviderProps) {
    const [taskLists, setTaskLists] = useState<TaskList[]>([]);
    const { user } = useContext(UserContext);

    async function getTaskLists() {
        try {
            const email = user.email;
            const response = await api.get(`/taskLists/${email}`);
            setTaskLists(response.data.tasklists);
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
            await api.put('/task', {
                title: title,
                user:user.email,
                content: content
            });

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
        }}>{children}</TaskListContext.Provider>
    )
}
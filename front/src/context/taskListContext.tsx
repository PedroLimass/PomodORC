import React, { createContext, ReactNode, useState, useContext } from 'react';
import api from '../services/api'
import { UserContext } from './userContext'


interface Task {

    name: string,
    status: boolean

}

interface TaskList {

    _id: string,
    title: string,
    user: string,
    tasks: Task[],
    // __v: number,

}
interface TaskListContextData {
    taskLists: TaskList[];
    getTaskLists: () => void;
    createTasklist: (taskList: TaskList) => Promise<void>;
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

    return (
        <TaskListContext.Provider value={{
            taskLists,
            getTaskLists,
            createTasklist,
        }}>{children}</TaskListContext.Provider>
    )
}
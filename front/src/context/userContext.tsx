import React, { createContext, ReactNode, useState } from 'react';
import api from '../services/api'
interface User {
    _id: string,
    name: string,
    email: string,
    password: string,
    __v: number,
}
interface UserContextData {
    user: User;
    getUser: () => void;
}
interface UserProviderProps {

    children: ReactNode;

}


export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
    const defaultUser = {
        _id: "Batata",
        name: "Default User",
        email: "defaulto@user.com",
        password: "Senha",
        __v: 0
    };
    const [user, setUser] = useState(defaultUser);

    async function getUser() {
        try {
            const email = "defaulto@user.com";
            const response = await api.get(`/user/${email}`)
            console.log(response);
            setUser(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <UserContext.Provider value={{ user, getUser }}>{children}</UserContext.Provider>
    )
}
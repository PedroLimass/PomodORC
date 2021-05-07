import React, { createContext, ReactNode, useState } from 'react';
import api from '../services/api';
interface User {
    _id: string,
    name: string,
    email: string,
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


    const [user, setUser] = useState<any>({
        _id: "Batata",
        name: "temp",
        email: "defaulto@user.com",
        __v: 0
    });
    async function getUser() {
        try {
            // const email = "defaulto@user.com";
            // const response = await api.get(`/user/${email}`)
            if (user.name === "temp") {
                const response = await api.post('/defaulto');
                setUser(response.data.user);

            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <UserContext.Provider value={{ user, getUser }}>{children}</UserContext.Provider>
    )
}
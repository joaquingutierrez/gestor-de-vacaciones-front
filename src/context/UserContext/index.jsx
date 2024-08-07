import { createContext, useState, useEffect } from "react";

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: "",
        rol: ""
    })

    const openSession = (data) => {
        setUser({
            name: data.userName,
            rol: data.rol
    })
    }

    const closeSession = () => {
        setUser({
            uid: '',
            name: '',
            email: '',
            profilePic: '',
            wishList: [],
            buys: []
        })
    }


    return (
        <UserContext.Provider value={{ user, openSession, closeSession }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
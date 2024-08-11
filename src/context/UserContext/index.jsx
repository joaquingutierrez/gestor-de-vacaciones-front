import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext()

const UserProvider = ({ children }) => {

    const URL = "http://localhost:8080/"

    const [user, setUser] = useState({
        name: "",
        rol: ""
    })

    useEffect(() => {
        const token = Cookies.get("access_token");

        fetch(URL + 'api/validate-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.user) {
                    setUser({
                        name: data.user.userName,
                        rol: data.user.rol
                    });
                } else {
                    Cookies.remove('access_token');
                }
            })
            .catch(err => {
                console.error("Error verifying token", err);
                Cookies.remove('access_token');
            });

    }, [])

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
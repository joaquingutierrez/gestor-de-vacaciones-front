import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const LogoutContainer = () => {
    const { user, closeSession } = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.name) {
            navigate('/');
        }
    }, [user, navigate]);

    const logout = async () => {
        try {
            const response = await fetch("http://localhost:8080/logout", {
                method: 'POST',
                credentials: 'include'
            })
            if (response.ok) {
                console.log(response)
                closeSession()
                navigate('/login');
            } else {
                console.error('Error during logout');
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        logout()
    }, [])

    return (
        <h2>Sesión cerrada</h2>
    )

}

export default LogoutContainer
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../utils/const"

const LogoutContainer = () => {
    const { user, closeSession } = useContext(UserContext)
    const navigate = useNavigate();

    const URL = api_url

    useEffect(() => {
        if (!user.name) {
            navigate('/');
        }
    }, [user, navigate]);

    const logout = async () => {
        try {
            const response = await fetch(URL + "/logout", {
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
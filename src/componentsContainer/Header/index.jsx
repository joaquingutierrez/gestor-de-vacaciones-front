import { NavLink } from "react-router-dom"

import "./style.css"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

const Header = () => {

    const { user } = useContext(UserContext)

    return (
        <header className="headerContainer">
                <h3> {user.name && `¡Hola, ${user.name}!`}</h3>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    {
                        user.name ?
                        <>
                            <li><NavLink to="/employees">Empleados</NavLink></li>
                            <li><NavLink to="/logout">Cerrar Sesión</NavLink></li>
                        </>
                            :
                            <li><NavLink to="/login">Iniciar Sesión</NavLink></li>
                    }
                </ul>
        </header>
    )
}

export default Header
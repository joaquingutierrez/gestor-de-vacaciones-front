import { useContext } from "react"

import "./style.css"
import { UserContext } from "../../context/UserContext"
import { NavLink, Outlet } from "react-router-dom"

const EmployeesView = () => {

    const { user } = useContext(UserContext)


    return (
        <main>
            {user &&
                <div className="adminMenu">
                    <ul>
                        <li><NavLink to={"/employees/list"}><li>Lista empleados</li></NavLink></li>
                        <li><NavLink to={"/employees/create"}><li>Registrar empleado</li></NavLink></li>
                        <li><NavLink to={"/employees/rol"}><li>Crear/Editar Cargos</li></NavLink></li>
                        <li><NavLink to={"/employees/history"}><li>Historial de vacaciones</li></NavLink></li>
                    </ul>
                </div>
            }
            <Outlet />
        </main>
    )
}

export default EmployeesView
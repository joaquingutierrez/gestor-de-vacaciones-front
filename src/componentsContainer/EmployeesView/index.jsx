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
                        <NavLink to={"/employees/list"}><li>Lista empleados</li></NavLink>
                        <NavLink to={"/employees/create"}><li>Registrar empleado</li></NavLink>
                        <NavLink to={"/employees/rol"}><li>Crear/Editar Cargos</li></NavLink>
                        <NavLink to={"/employees/history"}><li>Historial de vacaciones</li></NavLink>
                    </ul>
                </div>
            }
            <Outlet />
        </main>
    )
}

export default EmployeesView
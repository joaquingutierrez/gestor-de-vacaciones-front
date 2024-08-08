import { useContext } from "react"

import "./style.css"
import { UserContext } from "../../context/UserContext"

const EmployeesView = () => {

    const { user } = useContext(UserContext)


    return (
        <main>
            {user &&
                <div className="adminMenu">
                    <ul>
                        <li>Registrar empleado</li>
                        <li>Editar empleado</li>
                        <li>Ver empleado</li>
                        <li>Historial de vacaciones</li>
                    </ul>
                </div>
            }
        </main>
    )
}

export default EmployeesView
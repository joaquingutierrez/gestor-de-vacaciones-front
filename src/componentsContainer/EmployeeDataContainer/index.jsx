import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"

import "./style.css"
import { EmployeeService } from "../../utils/employees"
import { VacationsService } from "../../utils/vacations"
import { convertDate } from "../../utils/date"

const EmployeeDataContainer = () => {

    const [employeeData, setEmployeeData] = useState({})
    const [vacationsData, setVacationsData] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchEmployee()
    }, [])

    const fetchEmployee = async () => {
        const employee = await EmployeeService.getEmployeeById(id)
        setEmployeeData(employee)
        const vacations = await VacationsService.getVacationByEmployeeId(id)
        setVacationsData(vacations)
    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: "¿Esta seguro que quiere eliminar a este empleado?",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await EmployeeService.deleteEmployee(id)
                    Swal.fire({
                        title: "Eliminado con éxito",
                        confirmButtonText: "Cerrar"
                    })
                        .then(() => {
                            navigate("/employees/list")
                        })
                }
            })
    }

    return (
        <section className="employeeDataContainer">
            <h2>{employeeData.firstName + " " + employeeData.lastName}</h2>
            <Link to={"/employees/edit/" + employeeData._id}><button>Editar empleado</button></Link>
            <button onClick={() => handleDelete(employeeData._id)}>Eliminar</button>
            <h3>DNI: {employeeData.dni}</h3>
            <p>Fecha de inicio: {convertDate(employeeData.joiningDate)}</p>
            <p>Dias tomados: {employeeData.daysTaken}</p>
            <p>Dias disponibles: "PRÓXIMAMENTE"</p>
            <h4>Historial de vacaciones: </h4>
            {vacationsData.length > 0 ? (
                vacationsData.map((item, index) =>
                    <ul key={index}>
                        <li>Fecha Inicio: {convertDate(item.startDate)}</li>
                        <li>Fecha Fin: {convertDate(item.endDate)}</li>
                    </ul>
                )
            ) : (
                <h5>No hay vacaciones registradas</h5>
            )}
        </section>
    )
}

export default EmployeeDataContainer
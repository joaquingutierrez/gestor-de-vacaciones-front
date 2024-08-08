import { useEffect, useState } from "react"

import "./style.css"
import { useParams } from "react-router-dom"
import { EmployeeService } from "../../utils/employees"
import { VacationsService } from "../../utils/vacations"
import { convertDate } from "../../utils/date"

const EmployeeDataContainer = () => {

    const [employeeData, setEmployeeData] = useState({})
    const [vacationsData, setVacationsData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        fetchEmployee()
    }, [])

    const fetchEmployee = async () => {
        const employee = await EmployeeService.getEmployeeById(id)
        setEmployeeData(employee)
        const vacations = await VacationsService.getVacationByEmployeeId(id)
        setVacationsData(vacations)
    }

    return (
        <section>
            <h2>{employeeData.firstName + " " + employeeData.lastName}</h2>
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
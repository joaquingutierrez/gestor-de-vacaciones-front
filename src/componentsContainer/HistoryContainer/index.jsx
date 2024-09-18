import { useEffect, useState } from "react"
import { VacationsService } from "../../utils/vacations"
import { EmployeeService } from "../../utils/employees"
import { Employee_VacationCard } from "../../components"

const HistoryContainer = () => {

    const [employees_vacations, setEmployees_vacations] = useState([])

    const getVacations = async () => {
        const vacations = await VacationsService.getAllVacations()
        const employees = await EmployeeService.getAllEmployees()
        vacations.map((vac) => {
            const emp = employees.find(emp => emp._id === vacations.employeeId)
            return {
                ...vac,
                ...emp
            }
        })
        console.log("history", vacations)
        setEmployees_vacations(vacations)
    }

    useEffect(() => {
        getVacations()
    }, [])

    return (
        <section>
            <h2>Historial de Vacaciones</h2>
            {employees_vacations.length > 0 && (
                employees_vacations.map((item, index) => (
                    <Employee_VacationCard item={item} />
                ))
            )}
        </section>
    )
}

export default HistoryContainer
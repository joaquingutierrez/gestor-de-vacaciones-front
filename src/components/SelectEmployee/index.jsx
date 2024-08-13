import { useEffect, useState } from "react"

import "./style.css"
import Select from "../Select"

const SelectEmployee = ({ data, handleEmployeeData, handleFilter }) => {

    const [employeesFiltered, setEmployeesFiltered] = useState([])

    useEffect(() => {
        setEmployeesFiltered(data.employees)
    }, [data.employees])

    const handleChangeRol = (e) => {
        if (e.target.value === "0") {
            setEmployeesFiltered(data.employees)
            handleFilter(null, null)
        } else {
            const filteredEmployee = data.employees.filter(item => item.rol === e.target.value)
            setEmployeesFiltered(filteredEmployee)
            handleFilter(filteredEmployee, null)
        }
    }

    const handleChangeEmployee = (e) => {
        const employeeId = e.target.value === "0" ? null : e.target.value
        handleEmployeeData(employeeId)
        handleFilter(null, employeeId)
    }

    return (
        <div>
            <Select title={"Cargo"} data={data.rols} handleChange={handleChangeRol} />
            <Select title={"Empleado"} data={employeesFiltered} handleChange={handleChangeEmployee} />
        </div>
    )
}

export default SelectEmployee
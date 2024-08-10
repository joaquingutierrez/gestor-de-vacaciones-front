import { useEffect, useState } from "react"

import "./style.css"
import Select from "../Select"

const SelectEmployee = ({ data, handleEmployeeData }) => {

    const [employeesFiltered, setEmployeesFiltered] = useState([])

    useEffect(()=>{
        setEmployeesFiltered(data.employees)
    },[data.employees])

    const handleChangeRol = (e) => {
        if (e.target.value === "0") return setEmployeesFiltered(data.employees)
        setEmployeesFiltered(data.employees.filter(item => item.rol === e.target.value))
    }

    const handleChangeEmployee = (e) => {
        handleEmployeeData(e.target.value)
    }

    return (
        <div>
            <Select data={data.rols} handleChange={handleChangeRol} />
            <Select data={employeesFiltered} handleChange={handleChangeEmployee} />

        </div>
    )
}

export default SelectEmployee
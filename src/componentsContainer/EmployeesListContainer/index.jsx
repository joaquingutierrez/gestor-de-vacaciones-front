import { useEffect, useState } from "react"

import "./style.css"
import { EmployeeService } from "../../utils/employees"
import { useNavigate } from "react-router-dom"

const EmployeesListContainer = () => {

    const [employeesList, setEmployeesList] = useState([])
    const navigate = useNavigate();



    useEffect(() => {
        fetchEmployees();
    }, [])

    const fetchEmployees = async () => {
        try {
            const employees = await EmployeeService.getAllEmployees();
            setEmployeesList(employees);
        } catch (err) {
            console.error('Failed to fetch employees:', err);
        }
    };

    const handleClick = (id) => {
        navigate("/employees/" + id)
    }

    return (
        <section className="employeeListContainer">
            <h2>Lista de empleados</h2>
            <ul>
                {employeesList.map((item, index) =>
                    <li onClick={() => handleClick(item._id)} key={index}>{item.firstName + " " + item.lastName}</li>
                )}
            </ul>
        </section>
    )
}

export default EmployeesListContainer
import { useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';

import "./style.css"
import { SelectEmployee } from '../../components';
import EmployeeInfoContainer from '../EmployeeContainer';

const Home = () => {

    const [vacations, setVacations] = useState([new Date(), new Date()]);
    const [data, setData] = useState({})
    const [selectedEmployee, setSelectedEmployee] = useState(null)

    async function getVacations() {
        const url = "http://localhost:8080/api/vacation";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            return json
        } catch (error) {
            console.error(error.message);
        }
    }


    async function getEmployees() {
        const url = "http://localhost:8080/api/employee";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json)
            json.map(item => {
                item.desc = item.firstName + " " + item.lastName
            })
            return json
        } catch (error) {
            console.error(error.message);
        }
    }

    async function getRols() {
        const url = "http://localhost:8080/api/rol";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            return json
        } catch (error) {
            console.error(error.message);
        }
    }

    async function getData() {
        const info = { vacations: [], employees: [], rols: [] }
        info.vacations = await getVacations()
        info.employees = await getEmployees()
        info.rols = await getRols()
        setData(info)
    }

    useEffect(() => {
        getData()
    }, [])

    const createVacation = (employeeId,rolId, startDate, endDate) => {
        const url = "http://localhost:8080/api/vacation";
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                employeeId: employeeId,
                startDate: startDate,
                endDate: endDate
            })
        })
        .then((data)=>{console.log(data)})
        .catch((err)=>{console.log(err)})
    }

    const onChange = (value) => {
        if (selectedEmployee) {
            setVacations(value)
            console.log(selectedEmployee)
            createVacation(selectedEmployee._id, selectedEmployee.rol, vacations[0], vacations[1])
        }
    }

    const handleEmployeeData = (empId) => {
        const filteredEmp = data.employees.find(emp => emp._id === empId)
        if (filteredEmp) {
            const emp = { ...filteredEmp }
            const rolDesc = { ...data.rols.find(rol => rol._id === emp.rol) }
            emp.rol = rolDesc?.desc
            setSelectedEmployee(emp)
        } else {
            setSelectedEmployee(null)
        }
    }

    const tileClassName = useMemo(() => ({ date, view }) => {
        if (view === 'month' && data.vacations) {
            for (let vacation of data.vacations) {
                const startDate = new Date(vacation.startDate);
                const endDate = new Date(vacation.endDate);
                if (date >= startDate && date <= endDate) {
                    return 'highlight';
                }
            }
                const startDate = vacations[0]
                const endDate = vacations[1]
                if (date >= startDate && date <= endDate) {
                    return 'highlight-selected';
                }
            
        }
        return null;
    }, [data.vacations, vacations]);

    return (
        <main>
            Home
            <SelectEmployee data={data} handleEmployeeData={handleEmployeeData} />
            <Calendar onChange={onChange} value={vacations} selectRange={true} tileClassName={tileClassName} />
            {selectedEmployee && <EmployeeInfoContainer emp={selectedEmployee} />}
        </main>
    )
}

export default Home
import { useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';

import "./style.css"
import { SelectEmployee } from '../../components';
import EmployeeInfoContainer from '../EmployeeContainer';
import { VacationsService } from '../../utils/vacations';
import { EmployeeService } from '../../utils/employees';
import { RolsService } from '../../utils/rols';

const Home = () => {

    const [vacations, setVacations] = useState([new Date(), new Date()]);
    const [data, setData] = useState({})
    const [selectedEmployee, setSelectedEmployee] = useState(null)

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        const info = { vacations: [], employees: [], rols: [] }
        info.vacations = await VacationsService.getAllVacations()
        info.employees = await EmployeeService.getAllEmployees()
        info.rols = await RolsService.getAllRols()
        info.employees = info.employees.map((item) => ({
            ...item,
            desc: `${item.firstName} ${item.lastName}`
        }));
        setData(info)
    }


    const onChange = (value) => {
        if (selectedEmployee) {
            setVacations(value)
            VacationsService.addVacation(selectedEmployee._id, value[0], value[1])
        }
    }

    const handleEmployeeData = (empId) => {
        const filteredEmp = data.employees.find(emp => emp._id === empId)
        if (filteredEmp) {
            const emp = { ...filteredEmp }
            const rolDesc = { ...data.rols.find(rol => rol._id === emp.rol) }
            emp.rolDesc = rolDesc?.desc
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
            <SelectEmployee data={data} handleEmployeeData={handleEmployeeData} />
            <Calendar onChange={onChange} value={vacations} selectRange={true} tileClassName={tileClassName} />
            {selectedEmployee && <EmployeeInfoContainer emp={selectedEmployee} />}
        </main>
    )
}

export default Home
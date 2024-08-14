import { useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import Swal from 'sweetalert2'

import "./style.css"
import { SelectEmployee } from '../../components';
import EmployeeInfoContainer from '../EmployeeContainer';
import { VacationsService } from '../../utils/vacations';
import { EmployeeService } from '../../utils/employees';
import { RolsService } from '../../utils/rols';
import { areDatesEqual, convertDate } from '../../utils/date';

const Home = () => {

    const [vacations, setVacations] = useState([]);
    const [data, setData] = useState({})
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [selectedCalendar, setSelectedCalendar] = useState(null)
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

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
            if (value[0] && value[1]) {
                const formatedStartDate = convertDate(value[0])
                const formatedEndDate = convertDate(value[1])
                Swal.fire({
                    title: "¿Reservar estas fechas?",
                    text: "Desde: " + formatedStartDate + " Hasta: " + formatedEndDate,
                    showDenyButton: true,
                    confirmButtonText: "Confirmar",
                    denyButtonText: `Cancelar`
                })
                    .then(async (result) => {
                        if (result.isConfirmed) {
                            const data = await VacationsService.addVacation(selectedEmployee._id, value[0], value[1])
                            if (data.message) {
                                Swal.fire("Ocurrió un problema", data.message, "error");
                            } else {
                                Swal.fire("¡Guardado con éxito!", "", "success");
                            }
                        }
                        setVacations([])
                    })
            }
        }
    }

    const onClickDay = (value) => {
        if (vacations.length < 1) {
            setVacations([value, null])
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

    const fileredCalendar = async (employeeFilteredByRol, employeeId) => {
        let vacations = []
        if (employeeFilteredByRol) {
            for (let i = 0; i < employeeFilteredByRol.length; i++) {
                const vacationsData = await VacationsService.getVacationByEmployeeId(employeeFilteredByRol[i]._id)
                if (vacationsData.length > 0) {
                    vacations.push(...vacationsData)
                }
            }
        } else if (employeeId) {
            vacations = await VacationsService.getVacationByEmployeeId(employeeId)
        } else {
            vacations = await VacationsService.getAllVacations()
        }
        setData((prevState) => ({ ...prevState, vacations: vacations }))
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
            const startDate = vacations[0] ? new Date(vacations[0]) : null
            const endDate = vacations[1] ? new Date(vacations[1]) : null
            if (startDate) {
                if (areDatesEqual(date, startDate) && !endDate) {
                    return 'highlight-selected';
                }
            }
            if (date >= startDate && date <= endDate) {
                return 'highlight-selected';
            }

        }
        return null;
    }, [data.vacations, vacations]);

    const formatShortWeekday = (locale, date) => {
        const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return weekdays[date.getDay()];
    };

    // Define cómo se deben mostrar los meses
    const formatMonth = (locale, date) => {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return months[date.getMonth()];
    };

    const renderCalendarYear = () => {
        const months = Array.from({ length: 12 }, (_, i) => i);
        return (
            <div>
                <button onClick={() => setSelectedYear((prevState) => prevState - 1)}>prev</button>
                <p>{selectedYear}</p>
                <button onClick={() => setSelectedYear((prevState) => prevState + 1)}>next</button>
                <div className="calendar-year-grid">
                    {months.map((month) => (
                        <div onClick={() => handleSelectedCalendar(month)} key={month} className="calendar-month">
                            <h3>{formatMonth('es-ES', new Date(selectedYear, month))}</h3>
                            <Calendar
                                value={new Date(selectedYear, month, 1)}
                                tileClassName={tileClassName}
                                formatShortWeekday={formatShortWeekday}
                                formatMonth={formatMonth}
                                calendarType={"gregory"}
                                showNavigation={false}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const handleSelectedCalendar = (month) => {
        setVacations([])
        setSelectedCalendar(month)
    }

    return (
        <main className='homeContainer'>
            <SelectEmployee handleFilter={fileredCalendar} data={data} handleEmployeeData={handleEmployeeData} />
            {selectedCalendar !== null ? (
                <>
                    <button onClick={() => handleSelectedCalendar(null)}>Volver a vista del año</button>
                    <Calendar
                        onChange={onChange}
                        onClickDay={onClickDay}
                        value={vacations}
                        selectRange={true}
                        tileClassName={tileClassName}
                        formatShortWeekday={formatShortWeekday}
                        formatMonth={formatMonth}
                        calendarType={"gregory"}
                        activeStartDate={new Date(selectedYear, selectedCalendar, 1)}
                    />
                </>
            ) : renderCalendarYear()}
            {selectedEmployee && <EmployeeInfoContainer emp={selectedEmployee} />}
        </main>
    )
}

export default Home
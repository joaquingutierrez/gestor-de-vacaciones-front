import Calendar from "react-calendar";
import "./style.css"
import { areDatesEqual, convertDate } from "../../utils/date";
import { useEffect, useMemo, useState } from "react";
import { VacationsService } from "../../utils/vacations";
import { EmployeeService } from "../../utils/employees";
import { RolsService } from "../../utils/rols";
import Swal from "sweetalert2";

const CustomCalendar = ({ employeeId }) => {

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
        const employee = await EmployeeService.getEmployeeById(employeeId)
        info.vacations = info.vacations.filter((vacation)=>vacation.rolId === employee.rol)
        console.log(info.vacations)
        setSelectedEmployee(employee)
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
                            const data = await VacationsService.addVacationWithOutLimit(selectedEmployee._id, value[0], value[1])
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

    const tileClassName = useMemo(() => ({ date, view }) => {
        if (view === 'month' && data.vacations) {
            for (let vacation of data.vacations) {
                const startDate = new Date(vacation.startDate);
                const endDate = new Date(vacation.endDate);
                if (date >= startDate && date <= endDate) {
                    if (vacation.employeeId === employeeId) {
                        return 'highlight-employeeVacation'
                    } else {
                        return 'highlight';
                    }
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

    const tileContent = ({ date, view }) => {
        if (view === 'month' && data.vacations) {
            for (let vacation of data.vacations) {
                const startDate = new Date(vacation.startDate);
                const endDate = new Date(vacation.endDate);
                if (date >= startDate && date <= endDate) {
                    return (
                        <button
                            className="calendar-more-info-button"
                            onClick={(e) => handleInfoClick(date, e)}
                        >
                            +
                        </button>
                    );
                }
            }
        }
        return null;
    };

    const handleDeleteVacation = async (vacationId) => {
        try {
            await VacationsService.deleteVacation(vacationId)
            const vacations = await VacationsService.getAllVacations()
            const div = document.getElementById(`info-container-${vacationId}`)
            div.remove()
            setData({ ...data, vacations: vacations })
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleInfoClick = async (date, e) => {
        e.stopPropagation()
        const vacationsList = await VacationsService.getVacationByDate(date)

        const alertContentPromise = async () => {
            let content = ``
            for (let vacation of vacationsList) {
                const employee = await EmployeeService.getEmployeeById(vacation.employeeId)
                content += `
                    <div id="info-container-${vacation._id}" class="calendar-alert-dateInfo-container">
                        <h3>${employee.firstName + " " + employee.lastName}</h3>
                        <div>
                            <ul>
                                <li>${convertDate(vacation.startDate)}</li>
                                <li>${convertDate(vacation.endDate)}</li>
                            </ul>
                            <button id="delete-btn-${vacation._id}">Borrar</button>
                        </div>
                    </div>
                `
            }
            return content
        }
        const alertContent = await alertContentPromise()
        Swal.fire({
            title: 'Detalles',
            html: alertContent,
            confirmButtonText: "Cerrar"
        })
        vacationsList.forEach(vacation => {
            document.getElementById(`delete-btn-${vacation._id}`).addEventListener('click', () => handleDeleteVacation(vacation._id));
        });
    }

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
            {selectedCalendar !== null ? (
                <>
                    <button onClick={() => handleSelectedCalendar(null)}>Volver a vista del año</button>
                    <Calendar
                        onChange={onChange}
                        onClickDay={onClickDay}
                        value={vacations}
                        selectRange={true}
                        tileClassName={tileClassName}
                        tileContent={tileContent}
                        formatShortWeekday={formatShortWeekday}
                        formatMonth={formatMonth}
                        calendarType={"gregory"}
                        activeStartDate={new Date(selectedYear, selectedCalendar, 1)}
                    />
                </>
            ) : renderCalendarYear()}
        </main>
    )
}

export default CustomCalendar
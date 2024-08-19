import { useEffect, useState } from "react";

import "./style.css"
import { convertDate } from "../../utils/date";
import { EmployeeService } from "../../utils/employees";

const EmployeeInfoContainer = ({ emp }) => {

    const [daysLeft, setDaysLeft] = useState(0)

    const getDaysLeft = async() => {
        const days = await EmployeeService.getEmployeeVacationsDaysLeft(emp._id)
        setDaysLeft(days)
    }

    useEffect(()=>{
        if (emp) {
            getDaysLeft()
        }
    },[emp])

    const getAvailableVacationDays = (joiningDate) => {
        const today = new Date();
        joiningDate = new Date(joiningDate)
        const diffMonths = (today.getFullYear() - joiningDate.getFullYear()) * 12 + (today.getMonth() - joiningDate.getMonth());

        const maxVacationDays = (diffMonths) => {
            const nineMonthsDate = new Date(joiningDate)
            const twelveMonthsDate = new Date(joiningDate)
            nineMonthsDate.setMonth(joiningDate.getMonth() + 9);
            twelveMonthsDate.setMonth(joiningDate.getMonth() + 12)
            switch (true) {
                case diffMonths < 9:
                    return `Hoy: 0; a partir del ${convertDate(nineMonthsDate)}: 7; a partir del ${convertDate(twelveMonthsDate)}: 14`;
                case diffMonths >= 9 && diffMonths < 12:
                    return `Hoy: 7; a partir del ${convertDate(twelveMonthsDate)}: 14`;
                case diffMonths >= 12:
                    return 14;
                default:
                    return 0;
            }
        }
        return maxVacationDays(diffMonths)
    }

    return (
        <div>
            <ul>
                <li>{emp?.desc}</li>
                <li>{emp?.rolDesc}</li>
                <li>Dias Tomados: {emp?.daysTaken}</li>
                <li>Dias disponibles: {daysLeft}</li>
                <li>Máxima cantidad de dias que se puede tomar: {getAvailableVacationDays(emp.joiningDate)}</li>
            </ul>

        </div>
    )
}

export default EmployeeInfoContainer
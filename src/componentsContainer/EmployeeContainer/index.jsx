import "./style.css"

const EmployeeInfoContainer = ({emp}) => {

    const getAvailableVacationDays  = (joiningDate) => {
        const today = new Date();
        joiningDate = new Date(joiningDate)
        const diffMonths = (today.getFullYear() - joiningDate.getFullYear()) * 12 + (today.getMonth() - joiningDate.getMonth());
    
        const maxVacationDays = (diffMonths) => {
            switch(true) {
                case diffMonths < 9:
                    return 0;
                case diffMonths >= 9 && diffMonths < 12:
                    return 7; 
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
                <li>Cantidad de dias que se puede tomar: {getAvailableVacationDays(emp.joiningDate)}</li>
            </ul>

        </div>
    )
}

export default EmployeeInfoContainer
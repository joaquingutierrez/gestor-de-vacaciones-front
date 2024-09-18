const Employee_VacationCard = ({item}) => {
    return (
        <div>
            <h3>{item.firstName + " " + item.lastName}</h3>
            <ul>
                <li>{item.starDate}</li>
                <li>{item.endDate}</li>
            </ul>
        </div>
    )
}

export default Employee_VacationCard
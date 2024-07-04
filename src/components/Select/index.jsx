import "./style.css"

const Select = ({ data, handleChange }) => {

    return (
        <div>
            <select onChange={handleChange}>
                <option value="0">Seleccione un Rol...</option>
                {data?.map((item, index) => {
                    return (
                        <option key={index} value={item._id}>{item.desc}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select
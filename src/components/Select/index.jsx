import "./style.css"

const Select = ({ title, data, handleChange }) => {

    return (
        <div className="selectContainer">
            <select onChange={handleChange}>
                <option value="0">Seleccione un {title}...</option>
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
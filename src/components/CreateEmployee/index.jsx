import { useState } from "react";
import "./style.css"
import { EmployeeService } from "../../utils/employees";

const CreateEmployee = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dni: "",
        street: "",
        nro: "",
        birthDate: "",
        joiningDate: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const newEmployee = await EmployeeService.addEmployee(formData)
    }

    return (
        <section>
            <h2>Ingresar Empleado</h2>
            <form>
                <div>
                    <label htmlFor="firstName">Nombre</label>
                    <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="lastName">Apellido</label>
                    <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="dni">DNI</label>
                    <input type="number" name="dni" id="dni" value={formData.dni} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="street">Calle</label>
                    <input type="text" name="street" id="street" value={formData.street} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="nro">Numero</label>
                    <input type="number" name="nro" id="nro" value={formData.nro} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="birthDate">Fecha de nacimiento</label>
                    <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="joiningDate">Fecha de inicio</label>
                    <input type="date" name="joiningDate" id="joiningDate" value={formData.joiningDate} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="rol">Cargo</label>
{/*                     <select
                        id="dropdown"
                        value={selectedOption}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione...</option>
                        
                    </select> */}
                </div>
                <button onClick={handleClick} type="submit">Crear</button>
            </form>
        </section>
    )
}

export default CreateEmployee
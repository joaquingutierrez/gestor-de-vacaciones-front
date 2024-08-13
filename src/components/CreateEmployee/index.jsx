import { useEffect, useState } from "react";
import "./style.css"
import { EmployeeService } from "../../utils/employees";
import { RolsService } from "../../utils/rols";
import Swal from "sweetalert2";

const CreateEmployee = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dni: "",
        street: "",
        nro: "",
        birthDate: "",
        joiningDate: "",
        rol: ""
    });
    const [selectedOption, setSelectedOption] = useState("")
    const [rolsList, setRolsList] = useState([]);

    useEffect(() => {
        fetchRols();
    }, []);

    const fetchRols = async () => {
        const rols = await RolsService.getAllRols();
        setRolsList(rols);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "rol") {
            setSelectedOption(value);
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const data = await EmployeeService.addEmployee(formData);
            if (data.message) {
                Swal.fire("Ocurrió un problema", data.message, "error");
            } else {
                Swal.fire("Empleado agregado con éxito", "", "success");
                setFormData({
                    firstName: "",
                    lastName: "",
                    dni: "",
                    street: "",
                    nro: "",
                    birthDate: "",
                    joiningDate: "",
                    rol: ""
                });
            }
        } catch (error) {
            Swal.fire("Ocurrió un problema", error, "error");

        }
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
                    <select
                        id="dropdown"
                        value={selectedOption}
                        onChange={handleChange}
                        name="rol"
                    >
                        <option value="">Seleccione...</option>
                        {rolsList.length > 0 && rolsList.map((item, index) =>
                            <option key={index} value={item._id}>{item.desc}</option>
                        )}
                    </select>
                </div>
                <button onClick={handleClick} type="submit">Crear</button>
            </form>
        </section>
    )
}

export default CreateEmployee
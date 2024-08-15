import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./style.css"
import { EmployeeService } from "../../utils/employees";
import { RolsService } from "../../utils/rols";
import Swal from "sweetalert2";
import { convertDateForFormData } from "../../utils/date";

const CreateEmployee = ({ edit = false }) => {

    const { id: employeeId } = useParams()

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
        if (edit) {
            getEmployee(employeeId);
        }
    }, []);

    const getEmployee = async (id) => {
        try {
            const employee = await EmployeeService.getEmployeeById(id)
            setFormData({
                firstName: employee.firstName,
                lastName: employee.lastName,
                dni: employee.dni,
                street: employee.street,
                nro: employee.nro,
                birthDate: convertDateForFormData(employee.birthDate),
                joiningDate: convertDateForFormData(employee.joiningDate),
                rol: employee.rol
            })
            setSelectedOption(employee.rol)
        }
        catch (err) {
            console.log(err)
        }
    }

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

    const handleClick_create = async (e) => {
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

    const handleClick_edit = async (e) => {
        e.preventDefault();
        try {
            const data = await EmployeeService.updateEmployee(employeeId, formData);
            if (data.message) {
                Swal.fire("Ocurrió un problema", data.message, "error");
            } else {
                Swal.fire("Empleado actualizado con éxito", "", "success");
            }
        } catch (error) {
            Swal.fire("Ocurrió un problema", error, "error");
        }
    }

    return (
        <section className="createEmployeeContainer">
            <h2>Ingresar Empleado</h2>
            <form>
                <div>
                    <label htmlFor="firstName">Nombre</label>
                    <input placeholder="Ingrese el nombre..." type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="lastName">Apellido</label>
                    <input placeholder="Ingrese el Apellido..." type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="dni">DNI</label>
                    <input placeholder="Ingrese el DNI..." type="number" name="dni" id="dni" value={formData.dni} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="street">Calle</label>
                    <input placeholder="Ingrese la calle..." type="text" name="street" id="street" value={formData.street} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="nro">Numero</label>
                    <input placeholder="Ingrese el numero de la casa..." type="number" name="nro" id="nro" value={formData.nro} onChange={handleChange} />
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
                <button onClick={edit ? handleClick_edit : handleClick_create} type="submit">{edit ? 'Editar' : 'Crear'}</button>
            </form>
        </section>
    )
}

export default CreateEmployee
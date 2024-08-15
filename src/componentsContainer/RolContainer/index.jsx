import { useEffect, useState } from "react"
import "./style.css"
import { RolsService } from "../../utils/rols"
import Swal from "sweetalert2"

const RolContainer = () => {

    const [rolData, setRolData] = useState("")
    const [rolEdit, setRolEdit] = useState("")
    const [loading, setLoading] = useState(false)
    const [selectedOption, setSelectedOption] = useState("")
    const [rolsList, setRolsList] = useState([])

    useEffect(() => {
        fetchRols()
    }, [])

    const fetchRols = async () => {
        const rols = await RolsService.getAllRols()
        setRolsList(rols)
    }

    const handleChange = (e) => {
        if (e.target.name === "desc") {
            setRolData(e.target.value);
        } else if (e.target.name === "rols") {
            setSelectedOption(e.target.value);
        } else if (e.target.name === "editDesc") {
            setRolEdit(e.target.value)
        }
    }

    const handleClick = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await RolsService.addRol({ desc: rolData })
            if (response.message) {
                Swal.fire("Ocurrió un error", response.message, "error")
            }
        } catch (err) {
            Swal.fire("Ocurrió un error", err, "error")
        }
        setLoading(false)
        setRolData("")
    }

    const handleClickEdit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const id = document.getElementById("dropdown").value
        await RolsService.updateRol(id, { desc: rolEdit })
        setLoading(false)
        setRolEdit("")
        fetchRols()
    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Rol Eliminado con éxito",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cerrar"
        })
            .then(async (response) => {
                if (response.isConfirmed) {
                    try {
                        await RolsService.deleteRol(id)
                        Swal.fire({
                            title: "Rol Eliminado con éxito",
                            confirmButtonText: "Confirmar"
                        })
                    }
                    catch (err) {
                        Swal.fire({
                            title: "Error al eliminar el Rol",
                            text: "Por favor, intente más tarde",
                            confirmButtonText: "Confirmar"
                        })
                    }
                }
            })
    }


    return (
        <section>
            <h3>Crear Cargo</h3>
            <form>
                <label htmlFor="rol">Nombre del Cargo</label>
                <input onChange={handleChange} type="text" id="rol" name="desc" value={rolData} />
                <button onClick={handleClick} type="submit">{loading ? "Cargando..." : "Enviar"}</button>
            </form>
            <h3>Editar Cargo</h3>
            <select
                id="dropdown"
                value={selectedOption}
                onChange={handleChange}
                name="rols"
            >
                <option value="">Seleccione...</option>
                {rolsList.length > 0 && rolsList.map((item, index) =>
                    <option key={index} value={item._id}>{item.desc}</option>
                )}
            </select>
            {selectedOption && (
                <div>
                    <form>
                        <label htmlFor="editDesc">Editar</label>
                        <input type="text" name="editDesc" id="editDesc" value={rolEdit} onChange={handleChange} />
                        <button onClick={handleClickEdit} type="submit">Confirmar</button>
                    </form>
                    <button onClick={() => handleDelete(selectedOption)}>Eliminar</button>
                </div>
            )}
        </section>
    )
}

export default RolContainer
const URL = "http://localhost:8080"

export class RolsService {

    static async getAllRols() {
        try {
            const response = await fetch(URL + "/api/rol");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err);
            throw err; // Re-throw the error to handle it in the component if needed
        }
    }

    static async getRolById(id) {
        try {
            const response = await fetch(URL + "/api/rol/" + id);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err);
            throw err; // Re-throw the error to handle it in the component if needed
        }
    }

    // Actualizar un empleado
    static async updateRol(id, data) {
        try {
            const response = await fetch(`${URL}/api/rol/` + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const newRol = await response.json();
            return newRol;
        } catch (error) {
            console.error('Failed to add Rol:', error);
            throw error;
        }
    }

    // Agregar un nuevo empleado
    static async addRol(data) {
        try {
            const response = await fetch(`${URL}/api/rol`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const newRol = await response.json();
            return newRol;
        } catch (error) {
            console.error('Failed to add Rol:', error);
            throw error;
        }
    }

    // Eliminar un empleado
    static async deleteRol(id) { }
}
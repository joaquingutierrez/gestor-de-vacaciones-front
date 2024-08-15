const URL = "http://localhost:8080"

export class EmployeeService {

    static async getAllEmployees() {
        try {
            const response = await fetch(URL + "/api/employee");
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

    static async getEmployeeById(id) {
        try {
            const response = await fetch(URL + "/api/employee/" + id);
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
    static async updateEmployee(id, data) {
        try {
            const response = await fetch(`${URL}/api/employee/` + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({data}),
            });
            const updatedEmployee = await response.json();
            return updatedEmployee;
        } catch (error) {
            throw error;
        }
    }

    // Agregar un nuevo empleado
    static async addEmployee(data) {
        try {
            const response = await fetch(`${URL}/api/employee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });
            const newEmployee = await response.json();
            return newEmployee;
        } catch (error) {
            throw error;
        }
    }

    // Eliminar un empleado
    static async deleteEmployee(id) { }
}
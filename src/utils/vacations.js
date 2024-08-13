const URL = "http://localhost:8080"

export class VacationsService {

    static async getAllVacations() {
        try {
            const response = await fetch(URL + "/api/vacation");
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

    static async getVacationByEmployeeId(employeeid) {
        try {
            const response = await fetch(URL + "/api/vacation/" + employeeid);
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

    static async updateVacation(id, data) { }

    static async addVacation(employeeId, startDate, endDate) {
        const data = { employeeId, startDate, endDate }
        try {
            const response = await fetch(`${URL}/api/vacation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });
            /*             if (!response.ok) {
                            throw new Error('Network response was not ok');
                        } */
            const newEmployee = await response.json();
            return newEmployee;
        } catch (error) {
            console.error('Failed to add vacation:', error);
            throw error;
        }
    }

    // Eliminar un empleado
    static async deleteVacation(id) { }
}
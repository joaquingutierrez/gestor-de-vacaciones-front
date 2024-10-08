import { api_url } from "./const"
const token = localStorage.getItem('access_token') || null;

const URL = api_url

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

    static async getVacationByDate(date) {
        try {
            const response = await fetch(URL + "/api/vacation/date", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify({ date: date }),
            })
            const data = await response.json()
            return data
        }
        catch (err) {
            throw err
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
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });
            const newVacation = await response.json();
            return newVacation;
        } catch (error) {
            console.error('Failed to add vacation:', error);
            throw error;
        }
    }

    static async addVacationWithOutLimit(employeeId, startDate, endDate) {
        const data = { employeeId, startDate, endDate }
        try {
            const response = await fetch(`${URL}/api/vacation/withoutLimit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });
            const newVacation = await response.json();
            return newVacation;
        } catch (error) {
            console.error('Failed to add vacation:', error);
            throw error;
        }
    }

    // Eliminar un empleado
    static async deleteVacation(id) {
        try {
            const response = await fetch(`${URL}/api/vacation/` + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
            });
            return response;
        } catch (error) {
            console.error('Failed to delete vacation:', error);
            throw error;
        }
    }
}
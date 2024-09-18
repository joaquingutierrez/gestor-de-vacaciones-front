import { api_url } from "./const"
const token = localStorage.getItem('access_token') || null;

const URL = api_url

export class EmployeeService {

    static async getAllEmployees() {
        try {
            const response = await fetch(URL + "/api/employee");
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
            const data = await response.json();
            return data;
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err);
            throw err; // Re-throw the error to handle it in the component if needed
        }
    }

    static async getEmployeeVacationsDaysLeft(id) {
        try {
            const response = await fetch(URL + "/api/employee/" + id + "/daysleft");
            const data = await response.json();
            return data.daysLeft;
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err);
            throw err;
        }
    }

    static async updateEmployee(id, data) {
        try {
            const response = await fetch(`${URL}/api/employee/` + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify({ data }),
            });
            const updatedEmployee = await response.json();
            return updatedEmployee;
        } catch (error) {
            throw error;
        }
    }

    static async addEmployee(data) {
        try {
            const response = await fetch(`${URL}/api/employee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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

    static async deleteEmployee(id) {
        try {
            const response = await fetch(`${URL}/api/employee/` + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            });
            const newEmployee = await response.json();
            return newEmployee;
        } catch (error) {
            throw error;
        }
    }
}
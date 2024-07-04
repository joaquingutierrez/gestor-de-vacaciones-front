import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

import "./style.css"
import {SelectEmployee} from '../../components';

const Home = () => {

    const [vacations, setVacations] = useState([new Date(), new Date()]);
    const [data, setData] = useState({})

    async function getVacations() {
        const url = "http://localhost:8080/api/vacation";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            return json
        } catch (error) {
            console.error(error.message);
        }
    }

    
    async function getEmployees() {
        const url = "http://localhost:8080/api/employee";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json)
            json.map(item=>{
                item.desc = item.firstName + " " + item.lastName
            })
            return json
        } catch (error) {
            console.error(error.message);
        }
    }

    async function getRols() {
        const url = "http://localhost:8080/api/rol";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            return json
        } catch (error) {
            console.error(error.message);
        }
    }

    async function getData() {
        const info = {vacations: [], employees: [], rols: []}
        info.vacations = await getVacations()
        info.employees = await getEmployees()
        info.rols = await getRols()
        setData(info)
    }

    useEffect(()=>{
        getData()
    },[])

    const onChange = (value) => {
        setVacations(value)
    }


    return (
        <main>
            Home
            <SelectEmployee data={data} />
            <Calendar onChange={onChange} value={vacations} selectRange={true} />
        </main>
    )
}

export default Home
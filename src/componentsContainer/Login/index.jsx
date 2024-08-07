import { useContext, useEffect, useState } from "react";

import "./style.css"
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { user, openSession } = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (user.name) {
            navigate('/');
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }

            const data = await response.json();
            openSession(data.user)

        } catch (error) {
            console.error('Error de inicio de sesión:', error.message);
        }
    };

    return (
        <main>
            <form>
                <div>
                    <label htmlFor="user">Nombre de Usuario</label>
                    <input
                        type="email"
                        name="email"
                        id="user"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={handleSubmit} type="submit">Iniciar Sesion</button>
            </form>
        </main>
    )
}

export default Login
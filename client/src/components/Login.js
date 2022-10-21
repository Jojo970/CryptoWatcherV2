import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Form.css"

const Login = ({ setLoggedIn, user, setUser }) => {
    const navigate = useNavigate();
    const [userSession, setUserSession] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setUserSession({
        ...userSession,
        [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post('http://localhost:8000/login', userSession, { withCredentials: true })
        .then((res) => {
            console.log(res.data);
            setLoggedIn(true);
            setUser(res.data)
            setUserSession(res.data)
            console.log(user)
            navigate(`/list/:${res.data.user.username}`);
        })
        .catch((err) => console.log(err));
    };
    return (
        <form  onSubmit={handleSubmit}>
            <h1 className='stuff'>Login</h1>
            <p>
                <label className='stuff' htmlFor="email">Email:</label>
                <input className='stuff' type="email" name="email" value={userSession.email} onChange={handleChange} required />
            </p>
            <p>
                <label className='stuff' htmlFor="password">Password:</label>
                <input className='stuff' type="password" name="password" value={userSession.password} onChange={handleChange} required />
            </p>
            <p>
                <button>Login</button>
            </p>
        </form>
    );
};

export default Login;
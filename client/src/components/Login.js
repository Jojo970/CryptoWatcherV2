import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <form style = {{fontSize: '1.2em', color: 'white'}} onSubmit={handleSubmit}>
        <label style = {{backgroundColor: 'black', margin: '22px', padding: '5px 25px'}} htmlFor="email">Email:</label>
        <input type="email" name="email" value={userSession.email} onChange={handleChange} required />
        <label style = {{backgroundColor: 'black', margin: '22px', padding: '5px 25px'}} htmlFor="password">Password:</label>
        <input type="password" name="password" value={userSession.password} onChange={handleChange} required />
        <button>Login</button>
        </form>
    );
};

export default Login;
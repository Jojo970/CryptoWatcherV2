import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Form.css"

const Register = ({ setLoggedIn }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleChange = (e) => {
        setUser({
        ...user,
        [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post('http://localhost:8000/register', user, { withCredentials: true })
        .then((res) => {
            console.log(res.data);
            setLoggedIn(true);
            navigate(`/list/:${user.username}`);
        })
        .catch((err) => console.log(err));
    };
    return (
        <form onSubmit={handleSubmit}>
            <h1 className='stuff'>Register</h1>
        <p>
            <label className='stuff' htmlFor="username">Username:</label>
            <input className='stuff'  type="text" name="username" value={user.username} onChange={handleChange} required />
        </p>
        <p>
            <label className='stuff' htmlFor="email">Email:</label>
            <input className='stuff'  type="email" name="email" value={user.email} onChange={handleChange} required />
        </p>
        <p>
            <label className='stuff' htmlFor="password">Password:</label>
            <input className='stuff' type="password" name="password" value={user.password} onChange={handleChange} required />
        </p>
        <p>
            <label className='stuff' htmlFor="confirmPassword">Confirm Password:</label>
            <input className='stuff' 
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                required
            />
        </p>
        <p>
            <button>Register</button>
        </p>
        </form>
    );
};

export default Register;
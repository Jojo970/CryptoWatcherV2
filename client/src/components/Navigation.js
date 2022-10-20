import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navigation.css'

const Navigation = ({loggedIn, setLoggedIn, user, setUser}) => {

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/current-user', {withCredentials: true}).then(
            (res) => {setUser(res.data);
            console.log(res)}
        ).catch((err) => console.log("error in getting user",err));
    }, [loggedIn]);

    const handleLogout = () => {
        axios.post('http://localhost:8000/logout', {}, {withCredentials: true}).then(
            (res) => {
                setUser(null);
                setLoggedIn(false)
                navigate('/')}
        ).catch(err => console.log('Error in logging out', err));
    };


    return (
        <header>
            <div>
                <h1>
                    CryptoWatch
                </h1>
            </div>
            <div className='links'>
                <NavLink to="/">
                    Home
                </NavLink>
                <NavLink to="/add">
                    Add Crypto
                </NavLink>
                {user? (
                    <div className='loggedIn'>
                        <NavLink to= {`/list/:${user.username}`}>
                            Crypto List
                        </NavLink>
                        <p id='welcome' >Hello: {user.username}</p>
                        <button id= 'logout' onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div >
                        <NavLink to = "/login">
                            Login
                        </NavLink>
                        <span> / </span>
                        <NavLink to = "/register">
                            Register
                        </NavLink>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navigation;
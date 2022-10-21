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
                <h1 id='title'>
                    CryptoWatch
                </h1>
            </div>
            <div className='links'>
                {user? (
                    <div className='loggedIn'>
                        <NavLink id='clickLink' to="/add">
                            Add Crypto
                        </NavLink>
                        
                        <NavLink id='clickLink' to= {`/list/:${user.username}`}>
                            Crypto List
                        </NavLink>
                        <p id='welcome' >Hello: {user.username}</p>
                        <button id= 'logout' onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div style={{backgroundColor: "rgba(133, 168, 189, 1)"}}>
                        <NavLink id='clickLink' to = "/login">
                            Login
                        </NavLink>
                        <span id='clickLink'> / </span>
                        <NavLink id='clickLink' to = "/register">
                            Register
                        </NavLink>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navigation;
/*jshint esversion: 6 */
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline,ThemeProvider } from "@mui/material";

import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CryptoList from './components/CryptoList';
import CryptoForm from './components/CryptoForm';
import CryptoEdit from './components/CryptoEdit';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import Topbar from "./scenes/global/Topbar";

function App() {
  const [theme, colorMode] = useMode()
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <ColorModeContext value = {colorMode}>
      <div className='whole'>
        <Topbar loggedIn ={loggedIn} setLoggedIn={setLoggedIn} user = {user} setUser = {setUser}/>
        <Routes>
          <Route path = "/" element = {<HomePage/>}/>
          <Route path = "/list/:username" element = {<CryptoList />} />
          <Route path = "/add" element = {<CryptoForm user = {user} setUser = {setUser}/>} />
          <Route path = "/edit/:id" element = {<CryptoEdit user = {user} />} />
          <Route path = "/login" element = {<Login setLoggedIn={setLoggedIn} user = {user} setUser = {setUser}/>} />
          <Route path = "/register" element = {<Register setLoggedIn={setLoggedIn} user = {user} setUser = {setUser}/>} />
        </Routes>
      </div>
    </ColorModeContext>
  );
}

export default App;

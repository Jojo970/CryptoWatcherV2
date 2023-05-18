import { Box, IconButton, useTheme} from '@mui/material';
import { useContext, useEffect } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import  LightModeOutlinedIcon  from '@mui/icons-material/LightModeOutlined';
import  DarkModeOutlinedIcon  from '@mui/icons-material/DarkModeOutlined';
import  SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import  PersonOutlinedIcon  from '@mui/icons-material/PersonOutlined';
import  SearchIcon  from '@mui/icons-material/Search';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Topbar = ({loggedIn, setLoggedIn, user, setUser}) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

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
    <Box display = "flex" justifyContent="space-between"  p={2}>
        
        <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>    
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon/> ) : ( <LightModeOutlinedIcon/> 
                    )}
            </IconButton>
            

            <IconButton> <SearchIcon /> </IconButton>

            <IconButton> <SettingsOutlinedIcon /> </IconButton>

            <IconButton> <PersonOutlinedIcon /> </IconButton>
        </Box>
        

    </Box>
  )
}

export default Topbar
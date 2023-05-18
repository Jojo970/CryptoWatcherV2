import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box , IconButton, Typography, useTheme } from "@mui/material";
import  MenuOutlinedIcon  from '@mui/icons-material/MenuOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import  HomeOutlinedIcon  from '@mui/icons-material/HomeOutlined';
import  LightModeOutlinedIcon  from '@mui/icons-material/LightModeOutlined';
import  DarkModeOutlinedIcon  from '@mui/icons-material/DarkModeOutlined';

import { Link } from "react-router-dom";
import { tokens } from '../../theme';

const Item = ( {title, to, icon, selected, setSelected} ) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    return (
    <MenuItem active = {selected === title} style={{color: colors.grey[100]}} onClick={() => setSelected(title)} icon = {icon} >
        <Typography>{title}</Typography>
        <Link to = {to}/>
    </MenuItem>

    )

}

const Sidebar = () => {
    const { collapseSidebar } = useProSidebar();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Box style={{ display: 'flex', height: '100%' }}>
            <Sidebar>
            <Menu iconShape = "square">
            <MenuItem onClick={()=> collapseSidebar()}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style = {{
            margin: "10px 0 20px 0",
            color: colors.grey[100],
          }}
          >
            {!isCollapsed && (
              <Box 
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  CRYPTO
                </Typography>
                <IconButton  onClick={() => collapseSidebar()}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}

          </MenuItem>
                <MenuItem> Documentation</MenuItem>
                <MenuItem> Calendar</MenuItem>
                <MenuItem> E-commerce</MenuItem>
            </Menu>
            </Sidebar>
        </Box>
    );
}

export default Sidebar
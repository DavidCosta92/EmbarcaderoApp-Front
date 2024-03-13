// @ts-nocheck
import "./navbar.css"
import { redirect,  useNavigate} from "react-router-dom"
import { AuthContext } from "../utils/authContext";
import { useContext } from "react";

//navbar mui
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SailingIcon from '@mui/icons-material/Sailing';

const pages = ['Dashboard', 'Matriculas', 'Personas', 'Algo mas?'];
const settings = ['Perfil', 'Logout'];

export default function Navbar(){

    const {loguedUser , logout} = useContext(AuthContext)
    const navigate = useNavigate()
    
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);

    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const navMenuNavigateTo = (page) =>{
        handleCloseNavMenu()
        switch(page){
            case 'Dashboard':
                navigate("/dashboard")
                break
            case 'Matriculas':
                navigate("/licenses")
                break
            case 'Personas':
                navigate("/persons")
                break
            case 'Algo mas?':
                navigate("/dashboard")
                break
        }
    }
    const userMenuNavigateTo = (page) =>{
        handleCloseUserMenu()
        switch (page){
            case 'Perfil':
                navigate("/userProfile")
                break
            case 'Logout':
                logout()
                navigate("/")
                break
            case 'Algo mas?':
                navigate("/dashboard")
                break
        }

    }
  
  
    return (
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SailingIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} onClick={()=> navigate("/")}/>
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={()=> navigate("/")}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Embarcadero App
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={()=>navMenuNavigateTo(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <SailingIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} onClick={()=> navigate("/")} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              onClick={()=> navigate("/")}
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Embarcadero
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={()=>navMenuNavigateTo(page)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            { !loguedUser? (<Typography textAlign="center" onClick={()=> navigate("/auth")}>Iniciar sesion</Typography>) : (
              <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Cuenta usuario">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={loguedUser.username} src={loguedUser.profilePicture} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={()=>userMenuNavigateTo(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            )}

          </Toolbar>
        </Container>
      </AppBar>
    );
  }
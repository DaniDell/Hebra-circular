import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AlertDialog from "./AlertDialog";
import HideOnScroll from "../Components/Utils/HideOnScroll";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import {logoutMeasures} from '../redux/measuresSlice';

const pages = [
  { text: "Probar calculadora de mitigación ", path: "/calculadora" },
  
  { text: "Conocer más sobre este proyecto", path: "/home" },
  { text: "Suscribite a nuestro Newsletter 📨", path: "/registro" },
  // { text: "Sugerencias aquí", path: "/retroalimentacion" },
 
];



function Navbar({ user }) {
const nameUser = useSelector(state => state.user.logUser.email ? state.user.logUser.email.toUpperCase() : '');
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log('Llamando a handleLogout');  // Nuevo console.log
    dispatch(logout());
    dispatch(logoutMeasures());
    navigate("/");
  };

  const settings = [
    { text: "Mi perfil ", path: "/perfil" },
    { text: "Generar un nuevo registro gestión", path: "/recepcion" },
    { text: "Historia de gestión de materiales", path: "/historica" },
    { text: "Salir de la cuenta", onClick: handleLogout },
  ];

  
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

  const navigate = useNavigate();

 
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (option) => {
    setOpenDialog(false);
    if (option === 'register') {
      navigate("/registro");
    } else if (option === 'login') {
      navigate("/iniciar-sesion");
    }
  };

  const handleUserChoice = () => {
    handleOpenDialog();
  };
  
  
  return (
    <HideOnScroll>
<AppBar position="sticky" sx={{ height: '4rem' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <IconButton style={{ marginLeft: '0px', padding: '0px' }}
              size="large"
              aria-label="cuenta del usuario actual"
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: "block",
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path}
                >
                  {page.text}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
    <Link to="/">
      <img
        src="/Hebra.svg"
        alt="logo Hebra circular soluciones textiles"
        style={{
          height: "40px",
          width: "180px",
          paddingTop: "6px",
        }}
      />
      
    </Link>

  </Box>

          
  <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title={user ? "Abrir" : "Inicia sesión"}>
              <IconButton style={{ marginRight: '0px' }}
                onClick={(event) => {
                  if (user) {
                    handleOpenUserMenu(event);
                  } else {
                    handleUserChoice();
                  }
                }}
                sx={{ p: 0 }}
              >
<Avatar 
  alt={nameUser} 
  src={user ? "  " : ""} 
  style={{
    backgroundColor: user ? '#009d71' : 'grey',
  }}
>
 
</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
  sx={{ mt: "45px" }}
  id="menu-appbar-user"
  anchorEl={anchorElUser}
  anchorOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
  keepMounted
  transformOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
  open={Boolean(anchorElUser)}
  onClose={handleCloseUserMenu}
>
{settings.map((setting) => (
      <MenuItem
        key={setting.text}
        onClick={() => {
          handleCloseUserMenu();
          if (setting.onClick) {
            setting.onClick();
          }
        }}
        component={setting.path ? Link : 'li'}
        to={setting.path}
      >
        {setting.text}
      </MenuItem>
    ))}
</Menu>
          </Box>
          
        </Toolbar>
      </Container>
      <AlertDialog
      open={openDialog}
      handleClose={() => handleCloseDialog(null)}
      title="Debes logearte acceder a esta sección"
      content="Elige una opción a continuación:"
      confirmText="Crear nuevo usuario"
      cancelText="Acceder a mi sesión 🔑"
      onConfirm={() => handleCloseDialog('register')}
      onCancel={() => handleCloseDialog('login')}
    />
    </AppBar>
    </HideOnScroll>
  );
}

export default Navbar;

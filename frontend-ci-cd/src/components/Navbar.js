import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar({ onOpenMenu }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="sticky" elevation={1} color="default">
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto' }}>
        <IconButton color="inherit" edge="start" sx={{ mr: 1, display: { md: 'none' } }} onClick={onOpenMenu}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>📱 Agenda Personal - InfraDockers</Link>
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button component={Link} to="/" variant={isActive('/') ? 'contained' : 'text'}>Inicio</Button>
          <Button component={Link} to="/contacts" variant={isActive('/contacts') ? 'contained' : 'text'}>Contactos</Button>
          <Button component={Link} to="/add-contact" variant={isActive('/add-contact') ? 'contained' : 'outlined'}>Nuevo</Button>
          <Button component={Link} to="/favorites" variant={isActive('/favorites') ? 'contained' : 'text'}>Favoritos</Button>
          <Button component={Link} to="/categories" variant={isActive('/categories') ? 'contained' : 'text'}>Categorías</Button>
          <Button component={Link} to="/statistics" variant={isActive('/statistics') ? 'contained' : 'text'}>Estadísticas</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

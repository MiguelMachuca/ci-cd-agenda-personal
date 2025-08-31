import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import LabelIcon from '@mui/icons-material/Label';
import BarChartIcon from '@mui/icons-material/BarChart';

const drawerWidth = 220;

const items = [
  { to: '/', icon: <HomeIcon />, label: 'Inicio' },
  { to: '/contacts', icon: <PeopleIcon />, label: 'Contactos' },
  { to: '/add-contact', icon: <AddIcon />, label: 'Nuevo' },
  { to: '/favorites', icon: <StarIcon />, label: 'Favoritos' },
  { to: '/categories', icon: <LabelIcon />, label: 'Categorías' },
  { to: '/statistics', icon: <BarChartIcon />, label: 'Estadísticas' },
];

function SideNav({ mobileOpen, onClose, container }) {
  const location = useLocation();

  const drawerContent = (
    <>
      <Toolbar />
      <List>
        {items.map(item => (
          <ListItemButton key={item.to} component={Link} to={item.to} selected={location.pathname === item.to} onClick={onClose}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="sidebar">
      {/* Mobile temporary drawer */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
      >
        {drawerContent}
      </Drawer>
      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default SideNav;



import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-logo">
          <Link to="/">📱 Agenda Personal</Link>
        </div>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={isActive('/') ? 'nav-link active' : 'nav-link'}
          >
            🏠 Inicio
          </Link>
          
          <Link 
            to="/contacts" 
            className={isActive('/contacts') ? 'nav-link active' : 'nav-link'}
          >
            👥 Contactos
          </Link>
          
          <Link 
            to="/add-contact" 
            className={isActive('/add-contact') ? 'nav-link active' : 'nav-link'}
          >
            ➕ Nuevo
          </Link>
          
          <Link 
            to="/favorites" 
            className={isActive('/favorites') ? 'nav-link active' : 'nav-link'}
          >
            ⭐ Favoritos
          </Link>
          
          <Link 
            to="/categories" 
            className={isActive('/categories') ? 'nav-link active' : 'nav-link'}
          >
            🏷️ Categorías
          </Link>
          
          <Link 
            to="/statistics" 
            className={isActive('/statistics') ? 'nav-link active' : 'nav-link'}
          >
            📊 Estadísticas
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

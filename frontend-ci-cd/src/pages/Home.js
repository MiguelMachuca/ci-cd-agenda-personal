import React, { useEffect } from 'react';
import { useContacts } from '../context/ContactContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { state, actions } = useContacts();

  useEffect(() => {
    actions.loadStats();
    actions.loadContacts(0, 5); // Últimos 5 contactos
  }, []);

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Bienvenido a tu Agenda Personal</h1>
        <p>Gestiona tus contactos de manera fácil y eficiente</p>
      </div>

      {state.stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Contactos</h3>
            <p className="stat-number">{state.stats.totalContactos}</p>
          </div>
          <div className="stat-card">
            <h3>Favoritos</h3>
            <p className="stat-number">{state.stats.totalFavoritos}</p>
          </div>
          <div className="stat-card">
            <h3>Categorías</h3>
            <p className="stat-number">{Object.keys(state.stats.contactosPorCategoria || {}).length}</p>
          </div>
        </div>
      )}

      <div className="recent-contacts">
        <h2>Contactos Recientes</h2>
        {/* Usar ContactList aquí */}
        <Link to="/contacts" className="btn btn-primary">
          Ver todos los contactos
        </Link>
      </div>
    </div>
  );
};

export default Home;
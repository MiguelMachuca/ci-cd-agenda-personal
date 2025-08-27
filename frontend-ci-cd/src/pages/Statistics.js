import React, { useState, useEffect } from 'react';
import { useContacts } from '../context/ContactContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Contact.css';

function Statistics() {
  const { state, actions } = useContacts();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await actions.loadStats();
      setStats(response || {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    if (!state.contacts || state.contacts.length === 0) {
      return {
        total: 0,
        favorites: 0,
        withEmail: 0,
        withPhone: 0,
        byCategory: {},
        recentContacts: []
      };
    }

    const total = state.contacts.length;
    const favorites = state.contacts.filter(c => c.favorito).length;
    const withEmail = state.contacts.filter(c => c.email).length;
    const withPhone = state.contacts.filter(c => c.telefono).length;
    
    const byCategory = {};
    state.contacts.forEach(contact => {
      const category = contact.categoria || 'Sin categoría';
      byCategory[category] = (byCategory[category] || 0) + 1;
    });

    const recentContacts = [...state.contacts]
      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
      .slice(0, 5);

    return {
      total,
      favorites,
      withEmail,
      withPhone,
      byCategory,
      recentContacts
    };
  };

  const currentStats = calculateStats();

  if (loading) {
    return <LoadingSpinner text="Cargando estadísticas..." />;
  }

  if (error) {
    return (
      <div className="statistics-page">
        <ErrorMessage 
          error={error} 
          onRetry={loadStats}
          title="Error al cargar estadísticas"
        />
      </div>
    );
  }

  return (
    <div className="statistics-page">
      <div className="page-header">
        <h1>📊 Estadísticas de Contactos</h1>
        <p>Resumen completo de tu agenda personal</p>
      </div>

      <div className="stats-grid">
        {/* Tarjetas de estadísticas principales */}
        <div className="stat-card primary">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total de Contactos</h3>
            <div className="stat-number">{currentStats.total}</div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>Favoritos</h3>
            <div className="stat-number">{currentStats.favorites}</div>
            <div className="stat-percentage">
              {currentStats.total > 0 ? Math.round((currentStats.favorites / currentStats.total) * 100) : 0}%
            </div>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">📧</div>
          <div className="stat-content">
            <h3>Con Email</h3>
            <div className="stat-number">{currentStats.withEmail}</div>
            <div className="stat-percentage">
              {currentStats.total > 0 ? Math.round((currentStats.withEmail / currentStats.total) * 100) : 0}%
            </div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">📱</div>
          <div className="stat-content">
            <h3>Con Teléfono</h3>
            <div className="stat-number">{currentStats.withPhone}</div>
            <div className="stat-percentage">
              {currentStats.total > 0 ? Math.round((currentStats.withPhone / currentStats.total) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>

      <div className="stats-details">
        {/* Distribución por categorías */}
        <div className="stats-section">
          <h2>🏷️ Distribución por Categorías</h2>
          {Object.keys(currentStats.byCategory).length === 0 ? (
            <p className="no-data">No hay categorías asignadas</p>
          ) : (
            <div className="category-stats">
              {Object.entries(currentStats.byCategory).map(([category, count]) => (
                <div key={category} className="category-stat">
                  <div className="category-name">{category}</div>
                  <div className="category-bar">
                    <div 
                      className="category-fill" 
                      style={{ 
                        width: `${(count / currentStats.total) * 100}%`,
                        backgroundColor: getCategoryColor(category)
                      }}
                    ></div>
                  </div>
                  <div className="category-count">{count}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contactos recientes */}
        <div className="stats-section">
          <h2>🕒 Contactos Recientes</h2>
          {currentStats.recentContacts.length === 0 ? (
            <p className="no-data">No hay contactos recientes</p>
          ) : (
            <div className="recent-contacts">
              {currentStats.recentContacts.map(contact => (
                <div key={contact.id} className="recent-contact">
                  <div className="contact-avatar">
                    {contact.nombre.charAt(0).toUpperCase()}
                  </div>
                  <div className="contact-info">
                    <div className="contact-name">
                      {contact.nombre} {contact.apellido}
                    </div>
                    <div className="contact-date">
                      {new Date(contact.fechaCreacion).toLocaleDateString()}
                    </div>
                  </div>
                  {contact.favorito && <span className="favorite-badge">⭐</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Función auxiliar para asignar colores a categorías
function getCategoryColor(category) {
  const colors = [
    '#3498db', '#e74c3c', '#2ecc71', '#f39c12', 
    '#9b59b6', '#1abc9c', '#e67e22', '#34495e'
  ];
  
  const index = category.charCodeAt(0) % colors.length;
  return colors[index];
}

export default Statistics;

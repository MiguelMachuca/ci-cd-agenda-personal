import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContacts } from '../context/ContactContext';
import ContactList from '../components/ContactList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Contact.css';

function Favorites() {
  const navigate = useNavigate();
  const { state, actions } = useContacts();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await actions.loadFavorites();
      setFavorites(response || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (id, favorite) => {
    try {
      await actions.toggleFavorite(id, favorite);
      // Recargar favoritos después de cambiar el estado
      loadFavorites();
    } catch (error) {
      console.error('Error al actualizar favorito:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
      try {
        await actions.deleteContact(id);
        loadFavorites();
      } catch (error) {
        console.error('Error al eliminar contacto:', error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-contact/${id}`);
  };

  if (loading) {
    return <LoadingSpinner text="Cargando favoritos..." />;
  }

  if (error) {
    return (
      <div className="favorites-page">
        <ErrorMessage 
          error={error} 
          onRetry={loadFavorites}
          title="Error al cargar favoritos"
        />
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="page-header">
        <h1>⭐ Contactos Favoritos</h1>
        <p>Tu lista de contactos más importantes</p>
      </div>

      {favorites.length === 0 ? (
        <div className="no-favorites">
          <div className="no-favorites-icon">⭐</div>
          <h3>No tienes contactos favoritos</h3>
          <p>Marca algunos contactos como favoritos para verlos aquí</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/contacts')}
          >
            Ver todos los contactos
          </button>
        </div>
      ) : (
        <>
          <div className="favorites-stats">
            <span className="favorites-count">
              {favorites.length} contacto{favorites.length !== 1 ? 's' : ''} favorito{favorites.length !== 1 ? 's' : ''}
            </span>
          </div>

          <ContactList
            contacts={favorites}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
            showFavoriteToggle={true}
          />
        </>
      )}
    </div>
  );
}

export default Favorites;

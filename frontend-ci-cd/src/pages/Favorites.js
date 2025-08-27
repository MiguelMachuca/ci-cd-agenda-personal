import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContacts } from '../context/ContactContext';
import ContactList from '../components/ContactList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Contact.css';
import { Box, Typography, Paper, Stack, Button } from '@mui/material';

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
    <Box sx={{ px: 2, py: 2 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>⭐ Contactos Favoritos</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Tu lista de contactos más importantes</Typography>

      {favorites.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>No tienes contactos favoritos</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Marca algunos contactos como favoritos para verlos aquí</Typography>
          <Button variant="contained" onClick={() => navigate('/contacts')}>Ver todos los contactos</Button>
        </Paper>
      ) : (
        <>
          <Stack direction="row" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {favorites.length} contacto{favorites.length !== 1 ? 's' : ''} favorito{favorites.length !== 1 ? 's' : ''}
            </Typography>
          </Stack>
          <ContactList
            contacts={favorites}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
            showFavoriteToggle={true}
          />
        </>
      )}
    </Box>
  );
}

export default Favorites;

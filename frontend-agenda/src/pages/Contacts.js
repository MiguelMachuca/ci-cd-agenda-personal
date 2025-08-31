import React, { useState, useEffect } from 'react';
import { useContacts } from '../context/ContactContext';
import ContactList from '../components/ContactList';
import '../styles/Contact.css';
import { Box, Grid, Paper, TextField, Button, IconButton, MenuItem, Stack, Pagination, Typography, Switch, FormControlLabel } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

function Contacts() {
  const { state, actions } = useContacts();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    actions.loadContacts();
    actions.loadCategories();
  }, []);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [onlyFavs, setOnlyFavs] = useState(false);

  const handleSearch = () => {
    if (search.trim()) actions.searchContacts(search);
    else actions.loadContacts();
  };

  const handleCategoryFilter = (cat) => {
    setCategory(cat);
    if (cat) actions.loadContactsByCategory(cat);
    else actions.loadContacts();
  };

  const handleToggleFavorite = async (id, favorite) => {
    try {
      await actions.toggleFavorite(id, favorite);
      actions.loadContacts(state.pagination.page, state.pagination.size);
    } catch (error) {
      console.error('Error al actualizar favorito:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
      try {
        await actions.deleteContact(id);
      } catch (error) {
        console.error('Error al eliminar contacto:', error);
      }
    }
  };

  const handlePageChange = (_e, pageOneBased) => {
    actions.loadContacts(pageOneBased - 1, state.pagination.size);
  };

  const categories = Array.isArray(state.categories) ? state.categories : [];

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Typography variant="h5" fontWeight={700}>Mis Contactos</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => window.location.href = '/add-contact'}>Nuevo Contacto</Button>
        </Grid>
      </Grid>

      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems={{ md: 'center' }}>
          <TextField value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar contactos..." fullWidth />
          <IconButton color="primary" onClick={handleSearch}><FilterListIcon /></IconButton>
          <TextField select value={category} onChange={(e) => handleCategoryFilter(e.target.value)} label="Categoría" sx={{ minWidth: 200 }}>
            <MenuItem value="">Todas</MenuItem>
            {categories.map(cat => <MenuItem key={cat.id} value={cat.id}>{cat.nombre}</MenuItem>)}
          </TextField>
          <FormControlLabel control={<Switch checked={onlyFavs} onChange={(e) => setOnlyFavs(e.target.checked)} />} label="Favoritos" />
        </Stack>
      </Paper>

      {state.loading ? (
        <Typography>Cargando contactos...</Typography>
      ) : state.error ? (
        <Typography color="error">Error: {state.error}</Typography>
      ) : (
        <>
          <ContactList
            contacts={state.contacts}
            onEdit={(id) => window.location.href = `/edit-contact/${id}`}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
          />

          {state.pagination.totalPages > 1 && (
            <Stack alignItems="center" sx={{ mt: 2 }}>
              <Pagination count={state.pagination.totalPages} page={state.pagination.page + 1} onChange={handlePageChange} />
            </Stack>
          )}
        </>
      )}
    </Box>
  );
}

export default Contacts;
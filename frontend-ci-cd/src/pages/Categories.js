import React, { useState, useEffect } from 'react';
import { useContacts } from '../context/ContactContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Contact.css';
import { Box, Grid, Paper, TextField, Button, Typography, Stack, IconButton, Card, CardContent, CardActions, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Categories() {
  const { state, actions } = useContacts();
  const [newCategory, setNewCategory] = useState({ nombre: '', color: '#3498db', descripcion: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    actions.loadCategories();
  }, [actions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCategory.nombre.trim()) return;

    try {
      setIsSubmitting(true);
      if (editingCategory) {
        await actions.updateCategory(editingCategory.id, newCategory);
        setEditingCategory(null);
      } else {
        await actions.createCategory(newCategory);
      }
      setNewCategory({ nombre: '', color: '#3498db', descripcion: '' });
      actions.loadCategories();
    } catch (error) {
      console.error('Error al guardar categoría:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setNewCategory({
      nombre: category.nombre,
      color: category.color || '#3498db',
      descripcion: category.descripcion || ''
    });
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setNewCategory({ nombre: '', color: '#3498db', descripcion: '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      try {
        await actions.deleteCategory(id);
        actions.loadCategories();
      } catch (error) {
        console.error('Error al eliminar categoría:', error);
      }
    }
  };

  if (state.loading) {
    return <LoadingSpinner text="Cargando categorías..." />;
  }

  // Asegurar que categories sea un array
  const categories = Array.isArray(state.categories) ? state.categories : [];

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>🏷️ Gestión de Categorías</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Organiza tus contactos con categorías personalizadas</Typography>

      {state.error && (
        <ErrorMessage 
          error={state.error} 
          onRetry={() => actions.loadCategories()}
          onClose={() => actions.clearError()}
          title="Error al cargar categorías"
        />
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>{editingCategory ? '✏️ Editar Categoría' : '➕ Nueva Categoría'}</Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField label="Nombre *" value={newCategory.nombre} onChange={(e) => setNewCategory({ ...newCategory, nombre: e.target.value })} required />
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField label="Color" value={newCategory.color} onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })} sx={{ width: 120 }} />
                  <input type="color" value={newCategory.color} onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })} style={{ border: 'none', background: 'transparent', width: 40, height: 40 }} />
                </Stack>
                <TextField label="Descripción" value={newCategory.descripcion} onChange={(e) => setNewCategory({ ...newCategory, descripcion: e.target.value })} multiline rows={3} />
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  {editingCategory && <Button type="button" onClick={handleCancel}>Cancelar</Button>}
                  <Button type="submit" variant="contained" disabled={isSubmitting || !newCategory.nombre.trim()}>{isSubmitting ? 'Guardando...' : (editingCategory ? 'Actualizar' : 'Crear')}</Button>
                </Stack>
              </Stack>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="subtitle1" gutterBottom>📋 Categorías Existentes</Typography>
          {categories.length === 0 ? (
            <Typography color="text.secondary">No hay categorías creadas. ¡Crea la primera!</Typography>
          ) : (
            <Grid container spacing={2}>
              {categories.map(category => (
                <Grid item xs={12} sm={6} key={category.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Box sx={{ width: 16, height: 16, borderRadius: '4px', bgcolor: category.color || '#3498db' }} />
                        <Typography variant="h6">{category.nombre}</Typography>
                      </Stack>
                      {category.descripcion && <Typography variant="body2" color="text.secondary">{category.descripcion}</Typography>}
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <Button size="small" startIcon={<EditIcon />} onClick={() => handleEdit(category)}>Editar</Button>
                      <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(category.id)}>Eliminar</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Categories;

import React, { useState, useEffect } from 'react';
import { useContacts } from '../context/ContactContext';
import { TextField, Grid, Checkbox, FormControlLabel, Button, Paper, MenuItem, Stack } from '@mui/material';
import {
  validateName,
  validatePhone,
  validateEmail,
  validateAddress,
  validateNotes,
  validateBirthDate,
} from '../utils/validators';

function ContactForm({ contact, onSubmit, onCancel }) {
  const { state, actions } = useContacts();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    direccion: '',
    fechaNacimiento: '',
    notas: '',
    categoriaId: '',
    favorito: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contact) {
      setFormData({
        nombre: contact.nombre || '',
        apellido: contact.apellido || '',
        telefono: contact.telefono || '',
        email: contact.email || '',
        direccion: contact.direccion || '',
        fechaNacimiento: contact.fechaNacimiento || '',
        notas: contact.notas || '',
        categoriaId: contact.categoria?.id || '',
        favorito: contact.favorito || false,
      });
    }
  }, [contact]);

  useEffect(() => {
    actions.loadCategories();
  }, [actions]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Validación por campo
    let err = null;
    if (name === 'nombre') err = validateName(value);
    if (name === 'telefono') err = validatePhone(value);
    if (name === 'email') err = validateEmail(value);
    if (name === 'direccion') err = validateAddress(value);
    if (name === 'notas') err = validateNotes(value);
    if (name === 'fechaNacimiento') err = validateBirthDate(value);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación global mínima antes de enviar
    const newErrors = {
      nombre: validateName(formData.nombre),
      telefono: validatePhone(formData.telefono),
      email: validateEmail(formData.email),
      direccion: validateAddress(formData.direccion),
      notas: validateNotes(formData.notas),
      fechaNacimiento: validateBirthDate(formData.fechaNacimiento),
    };
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;
    onSubmit(formData);
  };

  // Asegurar que categories sea un array
  const categories = Array.isArray(state.categories) ? state.categories : [];

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12} md={6}>
          <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} fullWidth required error={!!errors.nombre} helperText={errors.nombre || ''} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} fullWidth />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} fullWidth required error={!!errors.telefono} helperText={errors.telefono || ''} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth error={!!errors.email} helperText={errors.email || ''} />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} fullWidth error={!!errors.direccion} helperText={errors.direccion || ''} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="Fecha de Nacimiento" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField select label="Categoría" name="categoriaId" value={formData.categoriaId} onChange={handleChange} fullWidth>
            <MenuItem value="">Seleccionar categoría</MenuItem>
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>{category.nombre}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField label="Notas" name="notas" value={formData.notas} onChange={handleChange} fullWidth multiline rows={3} error={!!errors.notas} helperText={errors.notas || ''} />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox name="favorito" checked={formData.favorito} onChange={handleChange} />} label="Contacto favorito" />
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button type="button" variant="text" onClick={onCancel}>Cancelar</Button>
            <Button type="submit" variant="contained" disabled={!!errors.nombre || !!errors.telefono}>{contact ? 'Actualizar' : 'Crear'} Contacto</Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ContactForm;
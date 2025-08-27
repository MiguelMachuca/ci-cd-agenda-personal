import React from 'react';
import ContactCard from './ContactCard';
import '../styles/Contact.css';
import { Grid, Typography } from '@mui/material';

function ContactList({ contacts, onEdit, onDelete, onToggleFavorite }) {
  if (!contacts || contacts.length === 0) {
    return <Typography color="text.secondary">No hay contactos para mostrar</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {contacts.map(contact => (
        <Grid item xs={12} sm={6} md={4} key={contact.id}>
          <ContactCard
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleFavorite={onToggleFavorite}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ContactList;
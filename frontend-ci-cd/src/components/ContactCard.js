import React from 'react';
import { formatPhoneNumber } from '../utils/formatters';
import { Card, CardContent, CardActions, Typography, IconButton, Stack, Button, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/StarBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ContactCard = ({ contact, onEdit, onDelete, onToggleFavorite }) => {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {contact.nombre} {contact.apellido}
          </Typography>
          <IconButton color={contact.favorito ? 'warning' : 'default'} onClick={() => onToggleFavorite(contact.id, !contact.favorito)}>
            {contact.favorito ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Stack>
        <Stack spacing={0.5} sx={{ mt: 1 }}>
          <Typography variant="body2">📞 {formatPhoneNumber(contact.telefono)}</Typography>
          {contact.email && <Typography variant="body2">✉️ {contact.email}</Typography>}
          {contact.categoria && <Chip size="small" label={contact.categoria.nombre} />}
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small" startIcon={<EditIcon />} onClick={() => onEdit(contact.id)}>Editar</Button>
        <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => onDelete(contact.id)}>Eliminar</Button>
      </CardActions>
    </Card>
  );
};

export default ContactCard;
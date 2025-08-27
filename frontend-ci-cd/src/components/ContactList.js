import React from 'react';
import ContactCard from './ContactCard';
import '../styles/Contact.css';

function ContactList({ contacts, onEdit, onDelete, onToggleFavorite }) {
  if (!contacts || contacts.length === 0) {
    return (
      <div className="no-contacts">
        <p>No hay contactos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="contact-list">
      {contacts.map(contact => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default ContactList;
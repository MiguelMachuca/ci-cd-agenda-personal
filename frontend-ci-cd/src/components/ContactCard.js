import React from 'react';
import { formatPhoneNumber, formatDate } from '../utils/formatters';

const ContactCard = ({ contact, onEdit, onDelete, onToggleFavorite }) => {
  return (
    <div className="contact-card">
      <div className="contact-header">
        <h3 className="contact-name">
          {contact.nombre} {contact.apellido}
          {contact.favorito && <span className="favorite-star">⭐</span>}
        </h3>
        <button 
          className={`favorite-btn ${contact.favorito ? 'active' : ''}`}
          onClick={() => onToggleFavorite(contact.id, !contact.favorito)}
        >
          {contact.favorito ? '★' : '☆'}
        </button>
      </div>
      
      <div className="contact-details">
        <p className="contact-detail">
          <span className="detail-icon">📞</span>
          {formatPhoneNumber(contact.telefono)}
        </p>
        {contact.email && (
          <p className="contact-detail">
            <span className="detail-icon">✉️</span>
            {contact.email}
          </p>
        )}
        {contact.categoria && (
          <p className="contact-detail">
            <span className="detail-icon">🏷️</span>
            {contact.categoria.nombre}
          </p>
        )}
      </div>
      
      <div className="contact-actions">
        <button className="btn btn-primary" onClick={() => onEdit(contact.id)}>
          Editar
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(contact.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
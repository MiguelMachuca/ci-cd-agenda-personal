import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContacts } from '../context/ContactContext';
import ContactForm from '../components/ContactForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Contact.css';

function EditContact() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state, actions } = useContacts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoizar la función loadContact para evitar recreaciones
  const loadContact = useCallback(async () => {
    if (id) {
      try {
        await actions.loadContact(id);
      } catch (error) {
        console.error('Error al cargar contacto:', error);
      }
    }
  }, [id, actions.loadContact]);

  useEffect(() => {
    loadContact();
  }, [loadContact]);

  const handleSubmit = async (contactData) => {
    try {
      setIsSubmitting(true);
      await actions.updateContact(id, contactData);
      navigate('/contacts');
    } catch (error) {
      console.error('Error al actualizar contacto:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/contacts');
  };

  const handleRetry = useCallback(() => {
    loadContact();
  }, [loadContact]);

  if (state.loading) {
    return <LoadingSpinner text="Cargando contacto..." />;
  }

  if (state.error) {
    return (
      <div className="edit-contact-page">
        <ErrorMessage 
          error={state.error} 
          onRetry={handleRetry}
          onClose={() => navigate('/contacts')}
          title="Error al cargar contacto"
        />
      </div>
    );
  }

  if (!state.currentContact) {
    return <LoadingSpinner text="Contacto no encontrado..." />;
  }

  return (
    <div className="edit-contact-page">
      <div className="page-header">
        <h1>✏️ Editar Contacto</h1>
        <p>Modifica la información de tu contacto</p>
      </div>

      <ContactForm
        contact={state.currentContact}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />

      {isSubmitting && (
        <div className="overlay">
          <LoadingSpinner text="Actualizando contacto..." />
        </div>
      )}
    </div>
  );
}

export default EditContact;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContacts } from '../context/ContactContext';
import ContactForm from '../components/ContactForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Contact.css';

function AddContact() {
  const navigate = useNavigate();
  const { state, actions } = useContacts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (contactData) => {
    try {
      setIsSubmitting(true);
      await actions.createContact(contactData);
      navigate('/contacts');
    } catch (error) {
      console.error('Error al crear contacto:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/contacts');
  };

  if (state.loading) {
    return <LoadingSpinner text="Cargando formulario..." />;
  }

  return (
    <div className="add-contact-page">
      <div className="page-header">
        <h1>➕ Nuevo Contacto</h1>
        <p>Agrega un nuevo contacto a tu agenda personal</p>
      </div>

      {state.error && (
        <ErrorMessage 
          error={state.error} 
          onRetry={() => actions.clearError()}
          onClose={() => actions.clearError()}
          title="Error al cargar categorías"
        />
      )}

      <ContactForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />

      {isSubmitting && (
        <div className="overlay">
          <LoadingSpinner text="Creando contacto..." />
        </div>
      )}
    </div>
  );
}

export default AddContact;

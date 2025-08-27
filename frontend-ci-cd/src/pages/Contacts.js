import React, { useState, useEffect } from 'react';
import { useContacts } from '../context/ContactContext';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import '../styles/Contact.css';

function Contacts() {
  const { state, actions } = useContacts();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    actions.loadContacts();
    actions.loadCategories();
  }, []);

  const handleSearch = (term) => {
    if (term.trim()) {
      actions.searchContacts(term);
    } else {
      actions.loadContacts();
    }
  };

  const handleCategoryFilter = (category) => {
    if (category) {
      actions.loadContactsByCategory(category);
    } else {
      actions.loadContacts();
    }
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

  const handlePageChange = (newPage) => {
    actions.loadContacts(newPage, state.pagination.size);
  };

  return (
    <div className="contacts-page">
      <div className="page-header">
        <h1>Mis Contactos</h1>
        <button 
          className="btn btn-primary"
          onClick={() => window.location.href = '/add-contact'}
        >
          Nuevo Contacto
        </button>
      </div>

      <div className="filters-section">
        <SearchBar onSearch={handleSearch} />
        <button 
          className="btn btn-secondary filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </button>
        
        {showFilters && (
          <div className="advanced-filters">
            <CategoryFilter 
              categories={state.categories} 
              onCategoryChange={handleCategoryFilter}
            />
          </div>
        )}
      </div>

      {state.loading ? (
        <div className="loading">Cargando contactos...</div>
      ) : state.error ? (
        <div className="error">Error: {state.error}</div>
      ) : (
        <>
          <ContactList
            contacts={state.contacts}
            onEdit={(id) => window.location.href = `/edit-contact/${id}`}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
          />
          
          {state.pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={state.pagination.page === 0}
                onClick={() => handlePageChange(state.pagination.page - 1)}
              >
                Anterior
              </button>
              
              <span>
                Página {state.pagination.page + 1} de {state.pagination.totalPages}
              </span>
              
              <button
                disabled={state.pagination.page >= state.pagination.totalPages - 1}
                onClick={() => handlePageChange(state.pagination.page + 1)}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Contacts;
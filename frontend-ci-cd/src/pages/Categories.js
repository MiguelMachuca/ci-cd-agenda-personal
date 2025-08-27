import React, { useState, useEffect } from 'react';
import { useContacts } from '../context/ContactContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Contact.css';

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
    <div className="categories-page">
      <div className="page-header">
        <h1>🏷️ Gestión de Categorías</h1>
        <p>Organiza tus contactos con categorías personalizadas</p>
      </div>

      {state.error && (
        <ErrorMessage 
          error={state.error} 
          onRetry={() => actions.loadCategories()}
          onClose={() => actions.clearError()}
          title="Error al cargar categorías"
        />
      )}

      <div className="categories-content">
        <div className="category-form-section">
          <h2>{editingCategory ? '✏️ Editar Categoría' : '➕ Nueva Categoría'}</h2>
          
          <form onSubmit={handleSubmit} className="category-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre *</label>
                <input
                  type="text"
                  id="nombre"
                  value={newCategory.nombre}
                  onChange={(e) => setNewCategory({ ...newCategory, nombre: e.target.value })}
                  placeholder="Ej: Trabajo, Familia, Amigos"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="color">Color</label>
                <input
                  type="color"
                  id="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                value={newCategory.descripcion}
                onChange={(e) => setNewCategory({ ...newCategory, descripcion: e.target.value })}
                placeholder="Descripción opcional de la categoría"
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting || !newCategory.nombre.trim()}
              >
                {isSubmitting ? 'Guardando...' : (editingCategory ? 'Actualizar' : 'Crear')}
              </button>
              
              {editingCategory && (
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="categories-list-section">
          <h2>📋 Categorías Existentes</h2>
          
          {categories.length === 0 ? (
            <div className="no-categories">
              <p>No hay categorías creadas. ¡Crea la primera!</p>
            </div>
          ) : (
            <div className="categories-grid">
              {categories.map(category => (
                <div key={category.id} className="category-card">
                  <div 
                    className="category-color" 
                    style={{ backgroundColor: category.color || '#3498db' }}
                  ></div>
                  
                  <div className="category-info">
                    <h3 className="category-name">{category.nombre}</h3>
                    {category.descripcion && (
                      <p className="category-description">{category.descripcion}</p>
                    )}
                  </div>
                  
                  <div className="category-actions">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleEdit(category)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(category.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;

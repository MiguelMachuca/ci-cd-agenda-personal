import React from 'react';
import '../styles/Form.css';

function CategoryFilter({ categories, onCategoryChange, selectedCategory = '' }) {
  // Asegurar que categories sea un array
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="category-filter">
      <label htmlFor="category-filter">Filtrar por Categoría:</label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="form-select"
      >
        <option value="">Todas las categorías</option>
        {safeCategories.map(category => (
          <option key={category.id} value={category.id}>
            {category.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;

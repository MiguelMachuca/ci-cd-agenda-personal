import React from 'react';
import '../styles/Form.css';

function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalElements, 
  pageSize 
}) {
  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`pagination-btn ${i === currentPage ? 'active' : ''}`}
        >
          {i + 1}
        </button>
      );
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Mostrando {startItem}-{endItem} de {totalElements} contactos
      </div>
      
      <div className="pagination-controls">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="pagination-btn"
        >
          ← Anterior
        </button>
        
        <div className="page-numbers">
          {renderPageNumbers()}
        </div>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className="pagination-btn"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

export default Pagination;

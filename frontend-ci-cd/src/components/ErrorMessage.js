import React from 'react';
import '../styles/Form.css';

function ErrorMessage({ 
  error, 
  onRetry, 
  onClose, 
  title = 'Error', 
  showRetry = true 
}) {
  if (!error) return null;

  return (
    <div className="error-message">
      <div className="error-header">
        <h3 className="error-title">⚠️ {title}</h3>
        {onClose && (
          <button 
            className="error-close-btn" 
            onClick={onClose}
            aria-label="Cerrar error"
          >
            ×
          </button>
        )}
      </div>
      
      <div className="error-content">
        <p className="error-text">{error}</p>
        
        {showRetry && onRetry && (
          <button 
            className="btn btn-primary error-retry-btn" 
            onClick={onRetry}
          >
            🔄 Reintentar
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;

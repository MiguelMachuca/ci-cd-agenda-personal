import React from 'react';
import '../styles/Form.css';

function LoadingSpinner({ size = 'medium', text = 'Cargando...' }) {
  const spinnerClass = `loading-spinner ${size}`;
  
  return (
    <div className="loading-container">
      <div className={spinnerClass}>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
}

export default LoadingSpinner;

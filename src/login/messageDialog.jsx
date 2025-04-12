
import React from 'react';

export default function MessageDialog({ message, onClose }) {
  return (
    <div className="login-container">
      <h2>Error</h2>
      <p>{message}</p>
      <button onClick={onClose} className="btn-main color1 color1b">
        Close
      </button>
    </div>
  );
}

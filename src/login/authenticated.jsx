
import React from 'react';

export default function Authenticated({ username, onLogout }) {
  return (
    <div className="login-container">
      <h2>Welcome, {username}!</h2>
      <button onClick={onLogout} className="btn-main color1 color1b">
        Sign Out
      </button>
    </div>
  );
}

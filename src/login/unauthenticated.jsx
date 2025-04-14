
import React, { useState } from 'react';

export default function Unauthenticated({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password })
    })
      .then(response => {
        if (!response.ok) throw new Error('Invalid login');
        return response.json();
      })
      .then(data => {
        localStorage.setItem('username', data.email);
        onLogin(data.email);
      })
      .catch(err => {
        alert(err.message);
      });
  };

  return (
    <div className="login-container">
      <h2>Welcome</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <div>
            <label htmlFor="username">Username</label>
            <input 
              type="text"
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="buttons">
          <button type="submit" className="btn-main color1 color1b">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

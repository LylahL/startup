import React, { useState } from 'react';

export default function Unauthenticated({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Log in an existing user by calling the login endpoint
  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Invalid login');
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('username', data.email);
        onLogin(data.email);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Register a new user by calling the registration endpoint
  const handleRegister = (e) => {
    e.preventDefault();
    fetch('/api/auth/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Registration failed');
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('username', data.email);
        onLogin(data.email);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="login-container">
      <h2>Welcome</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className="login-form">
        <div className="form-group">
          <div>
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="buttons">
          <button type="button" onClick={handleLogin} className="btn-main color1 color1b">
            Log In
          </button>
          <button type="button" onClick={handleRegister} className="btn-main color1 color1b">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

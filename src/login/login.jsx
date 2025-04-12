import React, { useState } from 'react';
import "../app.css";

// Child component for when the user is not yet authenticated
const Unauthenticated = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem('username', username);
      onLogin(username);
    } else {
      alert('Please enter both username and password.');
    }
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
};

// Child component for when the user is authenticated
const Authenticated = ({ username, onLogout }) => {
  return (
    <div className="login-container">
      <h2>Welcome, {username}!</h2>
      <button onClick={onLogout} className="btn-main color1 color1b">Sign Out</button>
    </div>
  );
};

// error messages
const MessageDialog = ({ message, onClose }) => (
  <div className="login-container">
    <h2>Error</h2>
    <p>{message}</p>
    <button onClick={onClose} className="btn-main color1 color1b">Close</button>
  </div>
);

export default function Login({ authState, setAuthState, username, setUsername }) {
  const [error, setError] = useState('');

  const handleLogin = (uname) => {
    setUsername(uname);
    setAuthState(true);
  };

  const handleLogout = () => {
    setUsername('');
    localStorage.removeItem('username');
    setAuthState(false);
  };

  const handleErrorClose = () => {
    setError('');
  };

  if (error) {
    return <MessageDialog message={error} onClose={handleErrorClose} />;
  }

  return (
    <main>
      {authState ? (
        <Authenticated username={username} onLogout={handleLogout} />
      ) : (
        <Unauthenticated onLogin={handleLogin} />
      )}
    </main>
  );
}

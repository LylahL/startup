
import React, { useState } from 'react';
import "../app.css";
import Authenticated from './authenticated';
import Unauthenticated from './unauthenticated';
import MessageDialog from './messageDialog';

export default function Login({ authState, setAuthState, username, setUsername }) {
  const [error, setError] = useState('');

  const handleLogin = (uname) => {
    setUsername(uname);
    setAuthState(true);
    localStorage.setItem('username', uname);
  };

  // Call the backend logout endpoint then clear the local state
  const handleLogout = () => {
    fetch('/api/auth/logout', { method: 'DELETE' })
      .then(res => {
        if (!res.ok) {
          throw new Error('Logout failed');
        }
        return res.text();
      })
      .then(() => {
        setUsername('');
        localStorage.removeItem('username');
        setAuthState(false);
      })
      .catch(err => setError(err.message));
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

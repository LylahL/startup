
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

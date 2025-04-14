import React from "react";

export default function Authenticated({ username, onLogout }) {
  const handleLogout = () => {
    fetch("/api/auth/logout", { method: "DELETE" })
      .then(() => {
        localStorage.removeItem("username");
        onLogout();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="login-container">
      <h2>Welcome, {username}!</h2>
      <button onClick={handleLogout} className="btn-main color1 color1b">
        Sign Out
      </button>
    </div>
  );
}

import React, { useState } from 'react';
import "../app.css";

export default function ExploreNails() {
  const users = ["User One", "User Two", "User Three"];
  const [likeCounts, setLikeCounts] = useState({
    "User One": 65,
    "User Two": 65,
    "User Three": 65,
  });

  const handleLike = (user) => {
    setLikeCounts(prev => ({ ...prev, [user]: prev[user] + 1 }));
  };

  return (
    <>
      {users.map(user => (
        <div key={user} className="container" style={{ marginBottom: '1rem' }}>
          <h2>{user}</h2>
          <div className="nail_container">
            <div className="nail"></div>
            <div className="nail"></div>
            <div className="nail"></div>
            <div className="nail"></div>
            <div className="nail"></div>
          </div>
          <h2>Current Color: A9F7FC</h2>
          <div className="like-container">
            <button 
              onClick={() => handleLike(user)} 
              className="btn-main color1 color1b"
            >
              Like
            </button>
            <h2>{likeCounts[user]}</h2>
          </div>
        </div>
      ))}
    </>
  );
}

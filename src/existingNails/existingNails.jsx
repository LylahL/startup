import React, { useState, useEffect } from 'react';
import '../app.css';

export default function ExistingNails() {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    // Load saved designs from localStorage (if any)
    const savedDesigns = JSON.parse(localStorage.getItem('nailDesigns')) || [];
    setDesigns(savedDesigns);
  }, []);

  return (
    <main>
      {designs.length === 0 ? (
        <div className="container">
          <h2>No saved designs yet!</h2>
        </div>
      ) : (
        designs.map((design, index) => (
          <div key={index} className="container" style={{ marginBottom: '1rem' }}>
            <h2>Saved Design {index + 1}</h2>
            <div className="nail_container">
              <div className="nail" style={{ backgroundColor: `#${design.color}` }}></div>
              <div className="nail" style={{ backgroundColor: `#${design.color}` }}></div>
              <div className="nail" style={{ backgroundColor: `#${design.color}` }}></div>
              <div className="nail" style={{ backgroundColor: `#${design.color}` }}></div>
              <div className="nail" style={{ backgroundColor: `#${design.color}` }}></div>
            </div>
            <h2>Current Color: {design.color}</h2>
          </div>
        ))
      )}
    </main>
  );
}

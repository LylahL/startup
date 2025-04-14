import React, { useState, useEffect } from 'react';
import '../app.css';

export default function ExistingNails() {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    fetch('/api/designs/saved')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch designs');
        return res.json();
      })
      .then(data => setDesigns(data))
      .catch(err => console.error(err));
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

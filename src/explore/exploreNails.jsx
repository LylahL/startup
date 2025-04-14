import React, { useState, useEffect } from 'react';
import "../app.css";

export default function ExploreNails() {
  const [postedDesigns, setPostedDesigns] = useState([]);

  useEffect(() => {
    fetch('/api/designs/posted')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch posted designs');
        return res.json();
      })
      .then(data => setPostedDesigns(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      {postedDesigns.length === 0 ? (
        <div className="container" style={{ marginBottom: '1rem' }}>
          <h2>No posted designs yet!</h2>
        </div>
      ) : (
        postedDesigns.map((design, index) => (
          <div key={index} className="container" style={{ marginBottom: '1rem' }}>
            <h2>Posted Design {index + 1}</h2>
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
    </>
  );
}

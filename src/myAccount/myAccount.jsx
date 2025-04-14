import React, { useState, useEffect } from 'react';
import '../app.css';

// Utility to generate a random 6-digit hex code
function generateRandomHex() {
  return Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')
    .toUpperCase();
}

export default function MyAccount() {
  const [currentColor, setCurrentColor] = useState('');

  // Simulate a fetch request to obtain a random hex color on component load
  useEffect(() => {
    setTimeout(() => {
      const color = generateRandomHex();
      setCurrentColor(color);
    }, 500);
  }, []);

  const handleRandomClick = () => {
    // Simulate another fetch call to update with a random hex code
    setTimeout(() => {
      const color = generateRandomHex();
      setCurrentColor(color);
    }, 300);
  };

  const handleCustomClick = () => {
    // Prompt user to input a hex code (without the # symbol)
    const userColor = prompt('Enter a hex code (without #):');
    if (userColor && /^[A-Fa-f0-9]{6}$/.test(userColor)) {
      setCurrentColor(userColor.toUpperCase());
    } else {
      alert('Invalid hex code. Please enter exactly 6 hex digits.');
    }
  };

  const handleSaveClick = () => {
    fetch('/api/designs/saved', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ color: currentColor })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to save design');
        return res.json();
      })
      .then(result => alert(result.msg))
      .catch(err => alert(err.message));
  };

  const handlePostClick = () => {
    fetch('/api/designs/posted', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ color: currentColor })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to post design');
        return res.json();
      })
      .then(result => alert(result.msg))
      .catch(err => alert(err.message));
  };

  return (
    <main>
      <div className="container">
        <div className="nail_container">
          {/* Display nails with the currentColor from state */}
          <div className="nail" style={{ backgroundColor: `#${currentColor}` }}></div>
          <div className="nail" style={{ backgroundColor: `#${currentColor}` }}></div>
          <div className="nail" style={{ backgroundColor: `#${currentColor}` }}></div>
          <div className="nail" style={{ backgroundColor: `#${currentColor}` }}></div>
          <div className="nail" style={{ backgroundColor: `#${currentColor}` }}></div>
        </div>
        <h2>Current Color: {currentColor || 'loading...'}</h2>
        <div>
          <button onClick={handleRandomClick} className="btn-main color1 color1b">Random</button>
          <button onClick={handleCustomClick} className="btn-main color1 color1b">Custom</button>
        </div>
        <div>
          <button onClick={handleSaveClick} className="btn-main color1 color1b">Save</button>
          <button onClick={handlePostClick} className="btn-main color1 color1b">Post</button>
        </div>
      </div>
    </main>
  );
}

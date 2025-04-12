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
  return (
    <main>
    <div className="container">
      <div className="nail_container">
        <div className="nail"></div>
        <div className="nail"></div>
        <div className="nail"></div>
        <div className="nail"></div>
        <div className="nail"></div>
      </div>
      <h2>Current Color: A9F7FC</h2>
      <div>
        <button className="btn-main color1 color1b">Random</button>  
        <button className="btn-main color1 color1b">Custom</button>
      </div>
      <div>
        <button className="btn-main color1 color1b">Save</button>
      </div> 
    </div>
    </main>
  );
}

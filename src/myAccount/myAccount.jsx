import React from 'react';
import '../app.css';

export default function ColorControl() {
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

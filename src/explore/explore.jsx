import React from 'react';
import "../app.css";
export default function Explore() {
  return (
    <main>
      <div className="container">
        <h2>User One</h2>
        <div className="nail_container">
          <div className="nail"></div>
          <div className="nail"></div>
          <div className="nail"></div>
          <div className="nail"></div>
          <div className="nail"></div>
        </div>
        <h2>Current Color: A9F7FC</h2>
        <div className="like-container">
          <button className="btn-main color1 color1b">Like</button>
          <h2> 65</h2>
        </div>
      </div>
      <div className="container">
        <h2>User Two</h2>
        <div className="nail_container">
          <div className="nail"></div>
          <div className="nail"></div>
          <div className="nail"></div>
          <div className="nail"></div>
          <div className="nail"></div>
        </div>
        <h2>Current Color: A9F7FC</h2>
        <div className="like-container">
          <button className="btn-main color1 color1b">Like</button>
          <h2> 65</h2>
        </div>
      </div>
      <div className="container">
        <h2>User Three</h2>
        <div className="nail_container">
          <div className="nail"></div>
          <div className="nail"></div>
          <div className="nail"></div>
          <div className="nail"></div>
          <div className="nail"></div>
        </div>
        <h2>Current Color: A9F7FC</h2>
        <div className="like-container">
          <button className="btn-main color1 color1b">Like</button>
          <h2> 65</h2>
        </div>
      </div>
    </main>
  );
}

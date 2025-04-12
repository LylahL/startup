import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <>
      <header>
        <div className="nav-bar">
          <a href="myAccount.html">
            <button className="btn-main color1 color1a">My Account</button>
          </a>
          <a href="explore.html">
            <button className="btn-main color1 color1a">Explore</button>
          </a>
          <a href="index.html">
            <button className="btn-main color1 color1a">Sign Out</button>
          </a>
          <a href="existingNails.html">
            <button className="btn-main color2">Check Existing Nails</button>
          </a>
        </div>
      </header>

      <div className="body bg-dark text-light">App will display here</div>

      <footer>
        <span className="text-reset">Lylah</span>
        <a href="https://github.com/LylahL/startup">GitHub</a>
      </footer>
    </>
  );
}

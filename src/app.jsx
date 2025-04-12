import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { existingNails } from './existingNails/existingNails';
import { myAccount } from './myAccount/myAccount';
import { explore } from './explore/explore';
import { index } from '../index';

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <div className="nav-bar">
          <NavLink to="myAccount" className="btn-main color1 color1a">
            My Account
          </NavLink>
          <NavLink to="explore" className="btn-main color1 color1a">
            Explore
          </NavLink>
          <NavLink to="index" className="btn-main color1 color1a">
            Sign Out
          </NavLink>
          <NavLink to="existingNails" className="btn-main color2">
            Check Existing Nails
          </NavLink>
        </div>
      </header>

      <div className="body bg-dark text-light">App will display here</div>

      <footer>
        <span className="text-reset">Lylah</span>
        <a href="https://github.com/LylahL/startup">GitHub</a>
      </footer>
    </BrowserRouter>
  );
}

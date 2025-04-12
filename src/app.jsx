import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import ExistingNails from "./existingNails/existingNails";
import MyAccount from "./myAccount/myAccount";
import Explore from "./explore/explore";
import Login from "./login/login";

export default function App() {
  const [authState, setAuthState] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setAuthState(true);
    }
  }, []);
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
          {authState ? (
            <NavLink to="login" className="btn-main color1 color1a">
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="login" className="btn-main color1 color1a">
              Log In
            </NavLink>
          )}
          <NavLink to="existingNails" className="btn-main color2">
            Check Existing Nails
          </NavLink>
        </div>
      </header>

      <Routes>
      <Route
          path="/"
          element={
            <Login
              authState={authState}
              setAuthState={setAuthState}
              username={username}
              setUsername={setUsername}
            />
          }
          exact
        />
        <Route
          path="/login"
          element={
            <Login
              authState={authState}
              setAuthState={setAuthState}
              username={username}
              setUsername={setUsername}
            />
          }
          exact
        />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/existingNails" element={<ExistingNails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer>
        <span className="text-reset">Lylah</span>
        <a href="https://github.com/LylahL/startup">GitHub</a>
      </footer>
    </BrowserRouter>
  );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { existingNails } from "./existingNails/existingNails";
import { myAccount } from "./myAccount/myAccount";
import { explore } from "./explore/explore";
import { login } from "./login/login";

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
          <NavLink to="login" className="btn-main color1 color1a">
            Sign Out
          </NavLink>
          <NavLink to="existingNails" className="btn-main color2">
            Check Existing Nails
          </NavLink>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/existingNails" element={<ExisitingNails />} />
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

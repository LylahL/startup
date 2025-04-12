import React from 'react';
import "../app.css";

export default function Login() {
  return (
    <main>
      <div className="login-container">
        <h2>Welcome</h2>
        <form method="get" action="myAccount.html" className="login-form">
          <div className="form-group">
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="username" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="text" id="password" placeholder="password" />
            </div>
          </div>
          <div className="buttons">
            <button type="submit" className="btn-main color1 color1b">
              Log In
            </button>
            <button type="submit" className="btn-main color1 color1b">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

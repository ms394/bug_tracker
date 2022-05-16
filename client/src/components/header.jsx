import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header grid">
      <h1 className="logo">Bug Tracker</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;

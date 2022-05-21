import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user.context";

function Header() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="header grid">
      <h1 className="logo">Bug Tracker</h1>
      <nav>
        {!currentUser ? (
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
        ) : (
          <ul>
            <li>
              <Link to="#">Welcome {currentUser.user_name}</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="#">Logout</Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default Header;

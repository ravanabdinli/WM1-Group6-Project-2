import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "#333",
        color: "#fff",
        padding: "20px",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3>Recipe Manager</h3>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "15px 0" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              Home
            </Link>
          </li>
          <li style={{ margin: "15px 0" }}>
            <Link to="/create" style={{ textDecoration: "none", color: "#fff" }}>
              Create Recipe
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

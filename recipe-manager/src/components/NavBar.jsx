import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "200px",
        height: "100vh",
        background: "#333",
        color: "#fff",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2>Recipe Manager</h2>
      <nav>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "15px" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              Home
            </Link>
          </li>
          <li>
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
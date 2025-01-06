import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (


    <div className="navbar-container">
      <div className="navbar">
        {/* Left Links */}
        <div className="navbar-left">
          <Link to="/recipes" className="nav-link"
            onClick={() => {
              // Scroll user to top
              window.location.href = "/recipes";
            }}>
            All Recipes
          </Link>
          <Link to="/create" className="nav-link"
            onClick={() => {
              // Scroll user to top
              window.location.href = "/create";
            }}
          >
            Create Recipe
          </Link>
        </div>

        {/* Logo */}
        <div className="navbar-center">
          <Link to="/" onClick={() => {
            // Scroll user to top
            window.location.href = "/";
          }}>
            <img
              src="/assets/logo.png"
              alt="RaSel Cooks Logo"
              className="navbar-logo"
            />
          </Link>
        </div>

        {/* Right Links */}
        <div className="navbar-right" >
          <Link to="/contact" className="nav-link" onClick={() => {
            // Scroll user to top
            window.location.href = "/contact";
          }}>
            Contact Us
          </Link>
          <Link
            to="/"
            state={{ scrollTo: "projects" }}
            className="nav-link"
          >
            Previous Project
          </Link>




        </div>
      </div>
    </div>
  );
};

export default NavBar;

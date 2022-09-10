import React, { Component } from "react";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="navbar-container">
      <img className="logo" src="" alt="" />
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            Active Appointments
          </Link>
        </li>
        <li>
          <Link to="/add-appointments" className="nav-link">
            Add Appointments
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;

import React, { Component } from "react";
import { useState } from "react";
import { act } from "react-dom/test-utils";
import { Link } from "react-router-dom";
function NavBar(props) {
  // const { active } = props;

  return (
    <div className="navbar-container">
      <img className="logo" src={require("../imgs/logobarb.png")} alt="" />
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            <i class="fa fa-home navLogo"></i>
          </Link>
        </li>
        <li>
          <Link to="/staff" className="nav-link">
            <i className="fa-solid fa-users navLogo"></i>
          </Link>
        </li>
        <li>
          <Link to="/form" className="nav-link">
            {/* <i className="fa fa-wpforms"></i>
             */}
            <i class="fa-brands fa-wpforms navLogo"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;

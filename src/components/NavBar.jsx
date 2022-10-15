import React, { Component } from "react";
import { useState } from "react";
import { act } from "react-dom/test-utils";
import { Link } from "react-router-dom";
function NavBar(props) {
  return (
    <div className="navbar-container">
      <img className="logo" src={require("../imgs/logobarb.png")} alt="" />
      <ul className="nav-links">
        <li>
          <Link to="/main" className="nav-link">
            <i className="fa-solid fa-shop navLogo"></i>
          </Link>
        </li>
        <li>
          <Link to="/agenda" className="nav-link">
            <i
              class="fa-solid fa-calendar-days"
              style={{ fontSize: "1.5rem" }}
            ></i>
          </Link>
        </li>
        <li>
          <Link to="/staff" className="nav-link">
            <img
              className="staffLogo"
              src={require("../imgs/service.png")}
              alt=""
            />
          </Link>
        </li>
        <li>
          <Link to="/users" className="nav-link">
            <i className="fa-solid fa-users navLogo"></i>
          </Link>
        </li>

        <li>
          <Link to="/summery" className="nav-link">
            <img
              class="chartLogo"
              src={require("../imgs/line-chart.png")}
              alt=""
            />
          </Link>
        </li>

        <li onClick={props.handleLogOut} className="logoutLogo">
          <Link to="/" className="nav-link">
            <img
              className="staffLogo"
              src={require("../imgs/logout.png")}
              alt=""
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;

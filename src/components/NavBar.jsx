import React, { Component } from "react";
import { useState } from "react";
import { act } from "react-dom/test-utils";
import { Link } from "react-router-dom";
function NavBar(props) {
  const { active } = props;

  return (
    <div className="navbar-container">
      <ul className="nav-links">
        <img className="logo" src={require("../imgs/logobarb.png")} alt="" />
        <li>
          <Link
            to="/"
            className={active == "1" ? "nav-link activeWorker" : "nav-link"}
            id="1"
            onClick={() => props.handleWorker("1")}
          >
            <i class="fa fa-home"></i>
          </Link>
        </li>
        <li>
          <Link
            to="/staff-hours"
            className={active == "1" ? "nav-link activeWorker" : "nav-link"}
            id="1"
            onClick={() => props.handleWorker("1")}
          >
            <i className="fa-solid fa-users"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;

import React, { Component, useContext, useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import APIContext from "./Context/apiContext";
function NavBar(props) {
  // let adminimage = props.admin.image;
  return (
    <div
      className="navbar-container"
      style={
        props.showNav ? { height: "100%", opacity: "1", zIndex: "9999" } : {}
      }
    >
      <i
        className="fa fa-times closeBtn"
        aria-hidden="true"
        onClick={() => {
          props.setShowNav(false);
        }}
      ></i>

      <img className="logo" src={require("../imgs/logobarb.png")} alt="" />
      <ul className="nav-links">
        <li>
          <Link
            to="/main"
            className="nav-link"
            onClick={() => {
              props.setShowNav(false);
            }}
          >
            <i className="fa-solid fa-shop navLogo"></i>
          </Link>
        </li>
        <li>
          <Link
            to="/agenda"
            className="nav-link"
            onClick={() => {
              props.setShowNav(false);
            }}
          >
            <i
              class="fa-solid fa-calendar-days"
              style={{ fontSize: "1.5rem" }}
            ></i>
          </Link>
        </li>
        <li>
          <Link
            to="/staff"
            className="nav-link"
            onClick={() => {
              props.setShowNav(false);
            }}
          >
            <img
              className="staffLogo"
              src={require("../imgs/service.png")}
              alt=""
            />
          </Link>
        </li>
        <li>
          <Link
            to="/users"
            className="nav-link"
            onClick={() => {
              props.setShowNav(false);
            }}
          >
            <i className="fa-solid fa-users navLogo"></i>
          </Link>
        </li>

        <li>
          <Link
            to="/summery"
            className="nav-link"
            onClick={() => {
              props.setShowNav(false);
            }}
          >
            <img
              class="chartLogo"
              src={require("../imgs/line-chart.png")}
              alt=""
            />
          </Link>
        </li>

        {/* <li className="adminLogo">
          <img
            src={
              props.admin.image != null
                ? `https://saloon-ibra-api.herokuapp.com/imgs/${props.admin.image}`
                : require("./../imgs/unknown.png")
            }
            alt=""
          />
        </li> */}

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

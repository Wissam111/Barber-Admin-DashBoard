import React, { Component, useContext, useState } from "react";
import { Link } from "react-router-dom";
import APIContext from "./Context/apiContext";
function NavBar(props) {
  const { authData } = useContext(APIContext);
  const [admin, setAdmin] = useState({});

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
        {/* <li onClick={props.handleLogOut} className="logoutLogo">
          <img
            src={
              admin.image != null
                ? `https://saloon-ibra-api.herokuapp.com/imgs/${authData.user.image}`
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

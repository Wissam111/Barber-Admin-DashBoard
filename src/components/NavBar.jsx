import React, { Component } from "react";
import { useState } from "react";
import { act } from "react-dom/test-utils";
import { Link } from "react-router-dom";
function NavBar(props) {
  const { active } = props;

  return (
    <div className="navbar-container">
      <img className="logo" src="" alt="" />
      <ul className="nav-links">
        <li>
          <Link
            to="/"
            className={active == "1" ? "nav-link activeWorker" : "nav-link"}
            id="1"
            onClick={() => props.handleWorker("1")}
          >
            Active Appointments
          </Link>
        </li>
        <label className="chooseWorker">Choose a Worker:</label>
        {props.workers.map((_worker) => {
          return (
            <li>
              <Link
                key={_worker._id}
                id={_worker._id}
                onClick={() => props.handleWorker(_worker)}
                to="/add-appointments"
                className={
                  _worker._id == active._id
                    ? "nav-link activeWorker"
                    : "nav-link"
                }
              >
                {_worker.firstName + " " + _worker.lastName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NavBar;

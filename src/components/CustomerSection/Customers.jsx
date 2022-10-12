import Customer from "./Customer";
import Settings from "../SettingsSection/Settings";
import React, { Component, useState } from "react";

function Customers(props) {
  // const [showSettings, setShowSettings] = useState(false);
  // const [currUser, setCurrUser] = useState({});

  // const handleSettings = (customer) => {
  //   console.log("hhh");
  //   setShowSettings(true);
  //   setCurrUser(customer);
  // };

  // const handleExitSettings = () => {
  //   setShowSettings(false);
  // };
  return (
    <div className="customers-container">
      {props.users.map((customer) => {
        return (
          <Customer
            customer={customer}
            // showUserInfo={props.showUserInfo}
            // handleMoreInfo={props.handleMoreInfo}
            handleDeleteUser={props.handleDeleteUser}
            handleSettings={props.handleSettings}
          />
        );
      })}
    </div>
  );
}

export default Customers;

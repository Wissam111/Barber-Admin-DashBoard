import Customer from "./Customer";
import Settings from "../SettingsSection/Settings";
import React, { Component, useState } from "react";

function Customers(props) {
  return (
    <div className="customers-container">
      {props.users.map((customer) => {
        return (
          <Customer
            customer={customer}
            handleSettings={props.handleSettings}
            isHome={props.isHome}
          />
        );
      })}
    </div>
  );
}

export default Customers;

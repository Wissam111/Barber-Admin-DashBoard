import Customer from "./Customer";
// import Settings from "../SettingsSection/Settings";
import React, { Component, useState } from "react";

function Customers(props) {
  const { users, handleSettings, isHome } = props;
  return (
    <div className="customers-container">
      {users.map((customer) => {
        return (
          <Customer
            customer={customer}
            handleSettings={handleSettings}
            isHome={isHome}
          />
        );
      })}
    </div>
  );
}

export default Customers;

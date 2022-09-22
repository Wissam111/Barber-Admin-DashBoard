import React, { Component } from "react";

function Customer(props) {
  const { customer } = props;
  return (
    <div className="customer-container">
      <img
        src={
          customer.image != null
            ? `https://saloon-ibra-api.herokuapp.com/imgs/${customer.image}`
            : require("./../../imgs/unknown.png")
        }
        alt=""
      />
      <h3>{customer.firstName + " " + customer.lastName}</h3>
      <i className="fa-solid fa-phone"></i>
    </div>
  );
}

export default Customer;

import React, { Component } from "react";

function Customer(props) {
  const { customer, handleSettings, isHome } = props;

  return (
    <div className="customer-container">
      <img
        src={
          customer.image != null
            ? `http://ec2-13-231-177-94.ap-northeast-1.compute.amazonaws.com:8080/imgs/${customer.image}`
            : require("./../../imgs/unknown.png")
        }
        alt=""
      />
      <h3>{customer.firstName + " " + customer.lastName}</h3>

      {!isHome && (
        <div className="customer-action">
          <i
            className="fa fa-cog workerSettings"
            aria-hidden="true"
            onClick={() => handleSettings(customer)}
          ></i>
        </div>
      )}
    </div>
  );
}

export default Customer;

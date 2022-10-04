import React, { Component } from "react";

function Customer(props) {
  const { customer, showUserInfo, handleMoreInfo } = props;
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
      {showUserInfo ? (
        <button
          className="moreInfoBtn"
          onClick={() => handleMoreInfo(customer)}
        >
          <i className="fa fa-info-circle"></i>
        </button>
      ) : (
        <i className="fa fa-phone">
          <a href={"tel:" + customer.phone}></a>
        </i>
      )}
    </div>
  );
}

export default Customer;

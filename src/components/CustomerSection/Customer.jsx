import React, { Component } from "react";

function Customer(props) {
  const { customer, showUserInfo, handleMoreInfo, handleDeleteUser } = props;

  // const handleDelete = () => {
  //   // console.log(customer);
  //   if (window.confirm("Are you sure you wish to delete this item?")) {
  //     console.log("hhhhhh");
  //     DeleteUser(customer._id);
  //   } else {
  //     console.log("hh");
  //   }
  // };

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

      <div className="customer-action">
        <i className="fa fa-phone">
          <a href={"tel:" + customer.phone}></a>
        </i>
        <button
          className="moreInfoBtn"
          onClick={() => handleDeleteUser(customer._id)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>

      {/* {showUserInfo ? (
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
      )} */}
    </div>
  );
}

export default Customer;

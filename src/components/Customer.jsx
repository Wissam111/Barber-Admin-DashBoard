import React, { Component } from "react";

function CustomerCard(props) {
  const { appointment, timeFormat, dateFormat } = props;

  return (
    <div className="customer-container">
      <button className="closeBtn">
        <i class="fa fa-times"></i>
      </button>
      <ul>
        <li className="cusName">
          {appointment.customer.lastName + " " + appointment.customer.firstName}
        </li>
        <li>Service: {appointment.service}</li>
        <li className="dateDisplay">
          <i className="fa fa-calendar">
            <span>{dateFormat(appointment.start_time)}</span>
          </i>
          <i className="fa fa-clock-o">
            <span>{`${timeFormat(appointment.start_time)} - ${timeFormat(
              appointment.end_time
            )}`}</span>
          </i>
        </li>
        <li>
          <i class="fa fa-phone">
            <a href={"tel:" + appointment.customer.phone}>
              {appointment.customer.phone}
            </a>
          </i>
        </li>
        <li>Status: {appointment.isActive ? "Started" : "not Started"}</li>
      </ul>
    </div>
  );
}

export default CustomerCard;

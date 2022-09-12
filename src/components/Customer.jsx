import React, { Component, useContext } from "react";
function CustomerCard(props) {
  const { appointment, timeFormat, dateFormat } = props;
  function isInThePast() {
    const today = new Date();
    const currentD = new Date(appointment.start_time);
    today.setHours(0, 0, 0, 0);
    return currentD < today;
  }
  return (
    <div className="customer-container">
      <button className="closeBtn">
        <i className="fa fa-times"></i>
      </button>
      <ul>
        <li className="cusName">
          {appointment.customer.lastName + " " + appointment.customer.firstName}
        </li>
        <li>Service: {appointment.service}</li>
        <li className="dateDisplay">
          <i className="fa fa-calendar">
            <span>{dateFormat(appointment.start_time, "MM/DD/YYYY")}</span>
          </i>
          <i className="fa fa-clock-o">
            <span>{`${timeFormat(appointment.start_time)} - ${timeFormat(
              appointment.end_time
            )}`}</span>
          </i>
        </li>
        <li>
          <i className="fa fa-phone">
            <a href={"tel:" + appointment.customer.phone}>
              {appointment.customer.phone}
            </a>
          </i>
        </li>
        <li>Status: {appointment.isActive ? "Started" : "not Started"}</li>
        <li className="isPast-cta">
          {isInThePast() ? "Appointment Over" : ""}
        </li>
      </ul>
    </div>
  );
}

export default CustomerCard;

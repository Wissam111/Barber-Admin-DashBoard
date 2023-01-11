import React, { Component } from "react";
import { useState } from "react";
import moment from "moment/moment";
function AppointmentCard(props) {
  const {
    appointment,
    handleCloseAppoint,

    handleBook,
    handleUnBook,
    isBooked,
    worker,
  } = props;

  const [position, setPosition] = useState({});
  const [selectedServ, setSelectedServ] = useState("");
  React.useEffect(() => {
    const appoElement = document.getElementById(`app-${appointment._id}`);
    let _position = appoElement.getBoundingClientRect();
    setPosition(_position);
  }, [appointment]);
  return (
    <div className="appointCard-wrapper">
      <div className="appointCard-container">
        <i className="fa fa-times closeBtn" onClick={handleCloseAppoint}></i>
        <ul>
          <li className="cusName">
            {appointment?.customer
              ? ` ${appointment.customer.lastName} 
                
                ${appointment.customer.firstName}`
              : "Shop Hold"}
          </li>

          <li className="dateDisplay">
            <i className="fa fa-calendar">
              <span>{moment(appointment.start_time).format("MM/DD/YYYY")}</span>
            </i>
            <i className="fa fa-clock-o">
              <span>{`${moment(appointment.start_time).format(
                "HH:mm"
              )} - ${moment(appointment.end_time).format("HH:mm")}`}</span>
            </i>
          </li>
          <li>
            <i className="fa fa-phone">
              <a>
                {appointment.customer
                  ? appointment.customer.phone
                  : "Shop Phone"}
              </a>
            </i>
          </li>
          <li>
            Service: {appointment.service ? appointment.service.title : ""}
          </li>
          <li>Status: {appointment.status}</li>
        </ul>
        {!isBooked && (
          <select onChange={(e) => setSelectedServ(e.target.value)}>
            <option value={""}>Select Service</option>
            {worker.services.map((serv) => {
              return <option value={serv.title}>{serv.title}</option>;
            })}
          </select>
        )}
        <button
          onClick={
            isBooked
              ? () => handleUnBook(appointment._id)
              : () => handleBook(appointment._id, selectedServ)
          }
        >
          {isBooked ? "UnBook Appointment" : "Book Appointment"}
        </button>
      </div>
    </div>
  );
}

export default AppointmentCard;

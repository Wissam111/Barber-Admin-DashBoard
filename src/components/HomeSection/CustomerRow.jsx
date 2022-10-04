import React, { Component, useRef, useState, useContext } from "react";
import APIContext from "../Context/apiContext";
function CustomerRow(props) {
  const { appoint, dateFormat, timeFormat, handleMoreInfo } = props;
  const ref = useRef();
  const { UpdateStatus } = useContext(APIContext);
  const updateCurrState = () => {
    const today = new Date();
    const startDate = new Date(appoint.start_time);
    const endDate = new Date(appoint.end_time);

    if (appoint.state == "canceled") {
      return "canceled";
    }
    //17:30 18:00  18:01
    if (today >= startDate && today <= endDate) {
      return "Pending";
    } else if (today < startDate) {
      return "Not Started";
    } else if (today >= endDate) {
      // if (appoint.status != "done") {
      //   let objAppo = {
      //     appointmentId: appoint._id,
      //     status: "done",
      //   };
      //   UpdateStatus(objAppo);
      // }
      return "Done";
    }
  };
  return (
    <tr className="customerow-container">
      <td>
        {appoint.customer
          ? appoint.customer.firstName + " " + appoint.customer.lastName
          : "Barber-Hold"}
      </td>
      <td>{dateFormat(appoint.start_time, "MM/DD/YYYY")}</td>

      <td>
        {timeFormat(appoint.start_time) + " - " + timeFormat(appoint.end_time)}
      </td>
      <td>{appoint.service != null ? appoint.service.title : "HairCut"}</td>

      <td
        className={
          updateCurrState() == "Done"
            ? "DoneState"
            : updateCurrState() == "canceled"
            ? "CanceledState"
            : updateCurrState() == "Not Started"
            ? "notStartedState"
            : "PendingState"
        }
      >
        {updateCurrState()}
      </td>
      <td className="workerName">
        {appoint.worker.firstName + " " + appoint.worker.lastName}
      </td>
      <td>
        <button
          ref={ref}
          className="infoBtn"
          onClick={() => handleMoreInfo(ref, appoint)}
        >
          <i className="fa fa-info-circle"></i>
        </button>
      </td>
    </tr>
  );
}

export default CustomerRow;

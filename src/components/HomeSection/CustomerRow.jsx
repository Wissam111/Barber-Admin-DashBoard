import React, { Component } from "react";
function CustomerRow(props) {
  const { appoint, dateFormat, timeFormat, handleDelete, handleDone } = props;

  const updateCurrState = () => {
    const today = new Date();
    const startDate = new Date(appoint.start_time);
    const endDate = new Date(appoint.end_time);

    if (appoint.status == "canceled") {
      return "canceled";
    } else if (appoint.status == "done") {
      return "Done";
    }
    // 17:30 18:00  18:01
    if (today >= startDate && today <= endDate) {
      return "In Progress";
    } else if (appoint.status != "done") {
      return "Pending";
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
          appoint.status == "done"
            ? "DoneState"
            : updateCurrState() == "canceled"
            ? "CanceledState"
            : updateCurrState() == "Pending"
            ? "notStartedState"
            : "ProgresState"
        }
      >
        {updateCurrState()}
      </td>
      <td className="workerName">
        {appoint.worker
          ? appoint.worker.firstName + " " + appoint.worker.lastName
          : "non"}
      </td>
      <td className="actionTd">
        <button className="moreInfoBtn" onClick={() => handleDelete(appoint)}>
          <i className="fa-solid fa-trash-can"></i>
        </button>

        <input
          type="checkbox"
          checked={appoint.status == "done"}
          onChange={(event) => handleDone(event, appoint)}
        ></input>
      </td>
    </tr>
  );
}

export default CustomerRow;

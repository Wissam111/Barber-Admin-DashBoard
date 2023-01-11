import React, { Component } from "react";
import moment from "moment";
import { BsFillTrashFill } from "react-icons/bs";

function CustomerRow(props) {
  const { appoint, handleDelete, handleDone } = props;

  // const updateCurrState = () => {
  //   const today = new Date();
  //   const startDate = new Date(appoint.start_time);
  //   const endDate = new Date(appoint.end_time);

  //   if (appoint.status == "canceled") {
  //     return "canceled";
  //   } else if (appoint.status == "done") {
  //     return "Done";
  //   }
  //   // 17:30 18:00  18:01
  //   if (today >= startDate && today <= endDate) {
  //     return "In Progress";
  //   } else if (appoint.status != "done") {
  //     return "Pending";
  //   }
  // };

  return (
    <tr className="customerow-container">
      <td>
        {appoint.customer
          ? appoint.customer.firstName + " " + appoint.customer.lastName
          : "Barber-Hold"}
      </td>
      <td>{moment.utc(appoint.start_time).format("MM/DD/YYYY")}</td>

      <td>
        {moment(appoint.start_time).format("LT") +
          " - " +
          moment(appoint.end_time).format("LT")}
      </td>
      <td>{appoint.service != null ? appoint.service.title : "HairCut"}</td>

      <td
        className={
          appoint.status == "done"
            ? "DoneState"
            : appoint.status == "canceled"
            ? "CanceledState"
            : appoint.status == "pending"
            ? "notStartedState"
            : "ProgresState"
        }
      >
        {appoint.status == "hold" ? "pending" : appoint.status}
      </td>
      <td className="workerName">
        {appoint.worker
          ? appoint.worker.firstName + " " + appoint.worker.lastName
          : "no-one"}
      </td>
      <td className="actionTd">
        <button className="moreInfoBtn" onClick={() => handleDelete(appoint)}>
          <BsFillTrashFill size={16} />
        </button>
        <input
          type="checkbox"
          checked={appoint.status == "done"}
          onChange={(event) => handleDone(event, appoint)}
        />
      </td>
    </tr>
  );
}

export default CustomerRow;

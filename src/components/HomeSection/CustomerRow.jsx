import React, { Component, useRef } from "react";

function CustomerRow(props) {
  const { appoint, dateFormat, timeFormat, handleMoreInfo } = props;
  const ref = useRef();

  return (
    <tr className="customerow-container">
      <td>{dateFormat(appoint.start_time, "MM/DD/YYYY")}</td>
      <td>{appoint.customer.firstName + " " + appoint.customer.lastName}</td>
      <td>
        {timeFormat(appoint.start_time) + " - " + timeFormat(appoint.end_time)}
      </td>
      <td className="workerName">
        {appoint.worker.firstName + " " + appoint.worker.lastName}
      </td>

      <td>{"Canceled"}</td>
      {/* <td>
        <button
          ref={ref}
          className="infoBtn"
          onClick={() => handleMoreInfo(ref, appoint)}
        >
          <i className="fa fa-info-circle"></i>
        </button>
      </td> */}
    </tr>
  );
}

export default CustomerRow;

import React, { Component } from "react";
import { useState } from "react";
import CustomerRow from "./CustomerRow";
import UpdateStatus from "./UpdateStatus";
function AppointmentsTable(props) {
  // const { appointements, dateFormat, timeFormat, handleMoreInfo } = props;
  const { appointements, dateFormat, timeFormat } = props;
  const [position, setPosition] = useState({});
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [currStatus, setCurrStatus] = useState("");
  const handleMoreInfo = (ref, appoint) => {
    setPosition(ref);
    setShowUpdateStatus(true);
    setCurrStatus(appoint.status);
  };
  const handleCloseInfo = () => {
    setShowUpdateStatus(false);
  };

  return (
    <div className="table-wrapper">
      <table className="appointsview">
        {/* {showUpdateStatus && (
        <UpdateStatus position={position} handleCloseInfo={handleCloseInfo} />
      )} */}
        <tbody>
          <tr className="mainRow">
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Service</th>
            <th>status</th>
            <th>Barber</th>
            <th>Action</th>
          </tr>
          {appointements.map((appoint) => {
            return (
              <CustomerRow
                key={appoint.id}
                appoint={appoint}
                dateFormat={dateFormat}
                timeFormat={timeFormat}
                handleMoreInfo={handleMoreInfo}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsTable;

import React, { Component } from "react";
import CustomerRow from "./CustomerRow";
function AppointmentsTable(props) {
  const { appointements, dateFormat, timeFormat, handleDelete, handleDone } =
    props;

  return (
    <div className="table-wrapper">
      <table className="appointsview">
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
                handleDelete={handleDelete}
                handleDone={handleDone}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsTable;

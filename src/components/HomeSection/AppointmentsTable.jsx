import React, { Component } from "react";
import CustomerRow from "./CustomerRow";

function AppointmentsTable(props) {
  const { appointements, dateFormat, timeFormat, handleMoreInfo } = props;
  return (
    <table className="appointsview">
      <tbody>
        <tr className="mainRow">
          <th>Date</th>
          <th>Customer</th>
          <th>Time</th>
          <th>Worker</th>

          <th className="moreinfoBtn">status</th>
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
  );
}

export default AppointmentsTable;

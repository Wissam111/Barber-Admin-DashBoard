import React, { Component } from "react";
import CustomerRow from "./CustomerRow";
function AppointmentsView(props) {
  const { appointements, dateFormat, timeFormat } = props;
  return (
    <table className="appointsview">
      <tr>
        <th>Date</th>
        <th>Worker</th>
        <th>Time</th>

        <th>Customer</th>
        <th>More Info</th>
      </tr>
    
      {appointements.map((appoint) => {
        return (
          <CustomerRow
            appoint={appoint}
            dateFormat={dateFormat}
            timeFormat={timeFormat}
          />
        );
      })}
    </table>
  );
}

export default AppointmentsView;

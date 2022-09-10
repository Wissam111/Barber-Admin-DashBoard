import React, { Component } from "react";
import CustomerCard from "./Customer";

function DayView(props) {
  const { current_appointments, timeFormat, dateFormat } = props;
  return (
    <div className="day-container">
      {current_appointments.map((appont) => {
        return (
          <CustomerCard
            key={appont.id}
            appointment={appont}
            timeFormat={timeFormat}
            dateFormat={dateFormat}
          />
        );
      })}
    </div>
  );
}

export default DayView;

import React, { Component } from "react";
import DayView from "../DayView";

function ActiveAppointments(props) {
  const { current_appointments, timeFormat, dateFormat } = props;
  return (
    <DayView
      current_appointments={current_appointments}
      timeFormat={timeFormat}
      dateFormat={dateFormat}
    />
  );
}

export default ActiveAppointments;

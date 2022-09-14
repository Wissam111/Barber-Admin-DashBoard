import React, { Component } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarView(props) {
  return (
    <div className="calendar-container">
      <Calendar
        calendarType={"Hebrew"}
        onChange={props.setDate}
        value={props.date}
        minDate={new Date(2022, 6, 1)}
      />
    </div>
  );
}

export default CalendarView;

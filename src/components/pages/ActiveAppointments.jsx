import React, { Component, useContext, useState } from "react";
import DayView from "../DayView";
import moment from "moment/moment";
function ActiveAppointments(props) {
  const { date, data, timeFormat, dateFormat, workers } = props;

  return (
    <div className="days-container">
      {workers.map((worker) => {
        return (
          <DayView
            key={worker._id}
            timeFormat={timeFormat}
            dateFormat={dateFormat}
            worker={worker}
            data={data}
            date={date}
          />
        );
      })}
    </div>
  );
}

export default ActiveAppointments;

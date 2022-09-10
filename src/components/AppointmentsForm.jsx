import React, { Component, useState } from "react";
import Appoint from "./Appoint";
function AppointmentsForm(props) {
  const { date, appointsList, handleSubmit, timeFormat } = props;

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <div className="dateshow">{date}</div>
      <div className="start">
        <label htmlFor="startTime">start time:</label>
        <input type="time" id="startTime" name="startTime" />
      </div>
      <div className="end">
        <label htmlFor="endTime">end time:</label>
        <input type="time" id="endTime" name="endTime" />
      </div>
      <button className="submitBtn" type="submit">
        Submit
      </button>
      <div className="appointsAdded">
        {appointsList.map((appoint) => {
          return (
            <Appoint
              key={appoint._id}
              start_time={timeFormat(appoint.start_time)}
              end_time={timeFormat(appoint.end_time)}
            />
          );
        })}
      </div>
    </form>
  );
}

export default AppointmentsForm;

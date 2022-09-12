import moment from "moment/moment";
import React, { Component, useState } from "react";
import { Fragment } from "react";
import Appoint from "./Appoint";
function AppointmentsForm(props) {
  const { date, timeFormat, dateFormat, PostTime, workerDates } = props;
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [appointsList, setAppointsList] = useState([]);

  const handleTime = () => {
    const appList = [...appointsList];
    if (appointsList.find((e) => e.start === start || e.end == end)) {
      return;
    }
    appList.push({ start: start, end: end });
    setAppointsList(appList);
  };

  const handleDelete = (start_time) => {
    let appoints = appointsList.filter((time) => {
      return time.start != start_time;
    });
    setAppointsList(appoints);
  };

  function handleSubmit() {
    if (workerDates.length == 0) {
      return;
    }
    appointsList.forEach((appoint) => {
      addTime(appoint.start, appoint.end);
    });
  }

  function addTime(startTime, endTime) {
    let format = "yyyy-MM-DDTHH:mm:ssZ";
    let currDate = dateFormat(date, "yyyy-MM-DD");
    let startDate = dateFormat(moment(currDate + " " + startTime), format);
    let endDate = dateFormat(moment(currDate + " " + endTime), format);
    let appoint = {
      worker: "631b85b67fb916263fd33c34",
      workingDate: `${workerDates[0]._id}`,
      start_time: `${startDate}`,
      end_time: `${endDate}`,
    };

    PostTime(appoint);
  }

  return (
    <div className="form-wrapper">
      {/* <div className="dateshow">{dateFormat(date, "MM/DD/YYYY")}</div> */}
      <div className="addDate">
        <label>{start + " - " + end}</label>
        <button onClick={handleTime} className="submitBtn">
          Add Time
        </button>
      </div>
      <div className="start">
        <label htmlFor="startTime">start time:</label>
        <input
          onChange={(event) => setStart(event.target.value)}
          type="time"
          id="startTime"
          name="startTime"
        />
      </div>
      <div className="end">
        <label htmlFor="endTime">end time:</label>
        <input
          onChange={(event) => setEnd(event.target.value)}
          type="time"
          id="endTime"
          name="endTime"
        />
      </div>

      <div className="appointsAdded">
        {workerDates.length == 0
          ? "This Date not Selected"
          : appointsList.length > 0
          ? appointsList.map((appoint, id) => {
              return (
                <Appoint
                  key={id}
                  start_time={appoint.start}
                  end_time={appoint.end}
                  isDate={false}
                  handleDelete={handleDelete}
                />
              );
            })
          : "No Selected Times"}
      </div>
      <button className="submitBtn subBtn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default AppointmentsForm;

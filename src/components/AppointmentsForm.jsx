import React, { Component, useState } from "react";
import { Fragment } from "react";
import Appoint from "./Appoint";
function AppointmentsForm(props) {
  const { date, timeFormat, dateFormat, PostData } = props;
  // const [time, setTime] = useState("start - end");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [appointsList, setAppointsList] = useState([]);
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   let start = event.target[0].value;
  //   let end = event.target[1].value;
  //   // if (appointsList.find((e) => e.start === start || e.end == end)) {
  //   //   return;
  //   // }
  //   // let momentDate = dateFormat(date, "yyyy-MM-ddTHH:mm:ssZ");
  //   // let appoint = {
  //   //   worker: `${appointsList[0].worker._id}`,
  //   //   workingDate: `${momentDate}`,
  //   //   start_time: `${start}`,
  //   //   end_time: `${end}`,
  //   // };
  //   // PostData(appoint);
  // };

  const handleTime = (event) => {
    event.preventDefault();
    const appList = [...appointsList];
    if (appointsList.find((e) => e.start === start || e.end == end)) {
      return;
    }
    console.log(start);
    console.log(end);
    appList.push({ start: start, end: end });
    setAppointsList(appList);
  };

  // const handleStart = (event) => {
  //   setStart(event.target.value);
  // };

  return (
    <form className="form-wrapper">
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
        {appointsList.length > 0
          ? appointsList.map((appoint, id) => {
              return (
                <Appoint
                  key={id}
                  start_time={appoint.start}
                  end_time={appoint.end}
                  isDate={false}
                />
              );
            })
          : "No Selected Times"}
      </div>
      <button className="submitBtn subBtn">Submit</button>
    </form>
  );
}

export default AppointmentsForm;

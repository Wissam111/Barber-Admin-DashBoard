import moment from "moment/moment";
import React, { Component, useState } from "react";
import Appoint from "./Appoint";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

function AppointmentsForm(props) {
  const { date, worker, timeFormat, dateFormat, PostTime, workerDates } = props;
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [appointsList, setAppointsList] = useState([]);

  const handleTime = () => {
    const appList = [...appointsList];
    let _s = timeFormat(start);
    let _e = timeFormat(end);
    if (appointsList.find((e) => e.start === _s || e.end == _e)) {
      return;
    }

    appList.push({ start: _s, end: _e });
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
      worker: worker._id,
      workingDate: `${workerDates[0]._id}`,
      start_time: `${startDate}`,
      end_time: `${endDate}`,
    };

    PostTime(appoint);
  }

  return (
    <div className="form-wrapper">
      {/* <div className="dateshow">{dateFormat(date, "MM/DD/YYYY")}</div> */}

      <div className="start">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            value={start}
            onChange={(newValue) => {
              setStart(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className="end">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            id="timepicker"
            cssClass="e-custom-style"
            placeholder="Select a Time"
            label="End Time"
            value={end}
            onChange={setEnd}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className="addDate">
        <label>{timeFormat(start) + " - " + timeFormat(end)}</label>
        <button onClick={handleTime} className="submitBtn">
          Add Time
        </button>
      </div>

      <div className="appointsAdded">
        {workerDates.length == 0
          ? "This Date not Selected"
          : appointsList.length > 0
          ? appointsList.map((appoint) => {
              return (
                <Appoint
                  key={appoint.id}
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

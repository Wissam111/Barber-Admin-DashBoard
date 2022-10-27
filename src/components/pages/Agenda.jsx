import ActiveAppointments from "../HomeSection/ActiveAppointments";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { Component, useState } from "react";
import { useLocation } from "react-router-dom";
function Agenda(props) {
  const location = useLocation();
  const { state } = location != null ? location : null;
  const [date, setDate] = useState(state ? state.fromDate : new Date());
  const { appointmentsData, timeFormat, dateFormat, DeleteAppoint, loading } =
    props;
  return (
    <div className="agenda-container">
      <div className="date-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Pick a date"
            value={date}
            onChange={(newValue) => {
              setDate(newValue["$d"]);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <ActiveAppointments
        date={date}
        appointmentsData={appointmentsData}
        timeFormat={timeFormat}
        dateFormat={dateFormat}
        DeleteAppoint={DeleteAppoint}
      />
    </div>
  );
}

export default Agenda;

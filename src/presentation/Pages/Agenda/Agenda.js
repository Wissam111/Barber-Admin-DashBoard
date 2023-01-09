import ActiveAppointments from "../../components/ActiveAppointments";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { Component, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeViewModel from "../Home/HomeViewModel";
function Agenda(props) {
  const location = useLocation();
  const { state } = location != null ? location : null;
  const [date, setDate] = useState(state ? state.fromDate : new Date());
  const { appointmentsData, DeleteAppoint, updateStatus } = HomeViewModel();

  return (
    <div className="page-container">
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
          DeleteAppoint={DeleteAppoint}
          updateStatus={updateStatus}
        />
      </div>
    </div>
  );
}

export default Agenda;

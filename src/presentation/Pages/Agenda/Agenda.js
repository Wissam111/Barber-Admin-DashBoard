import ActiveAppointments from "../../components/ActiveAppointments";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { Component, useState } from "react";
import { useLocation } from "react-router-dom";
import AgendaViewModel from "./AgendaViewModel";
import RefreshButton from "../../components/RefreshButton";

function Agenda(props) {
  const location = useLocation();
  const { state } = location != null ? location : null;
  const [date, setDate] = useState(state ? state.fromDate : new Date());
  const { appointementsData, updateStatus, deleteAppoint, refresh } =
    AgendaViewModel();

  return (
    <div className="page-container">
      <RefreshButton refresh={refresh} />
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
          appointmentsData={appointementsData}
          DeleteAppoint={deleteAppoint}
          updateStatus={updateStatus}
        />
      </div>
    </div>
  );
}

export default Agenda;

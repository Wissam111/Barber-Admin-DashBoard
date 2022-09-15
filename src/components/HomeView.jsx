import React, { Component, useState } from "react";
import ActiveAppointments from "./pages/ActiveAppointments";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import StatusCard from "./StatusCard";
function HomeView(props) {
  const [date, setDate] = useState(new Date());
  const { appointmentsData, timeFormat, dateFormat, DeleteAppoint } = props;

  return (
    <div className="home-containerBack">
      <div className="homeView-container">
        <div className="date-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Pick a date"
              value={date}
              // minDate={dayjs("2022-01-01")}
              onChange={(newValue) => {
                setDate(newValue["$d"]);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="homeSection-primary">
          <div className="active-appoints">
            <div className="statusCards-container">
              <StatusCard
                imgUrl={require("../imgs/done.png")}
                status={"Done"}
              />
              <StatusCard
                imgUrl={require("../imgs/clock.png")}
                status={"Pending"}
                cs={"done"}
              />
              <StatusCard
                imgUrl={require("../imgs/cancelled.png")}
                status={"Canceled"}
              />
            </div>
            <ActiveAppointments
              date={date}
              appointmentsData={appointmentsData}
              timeFormat={timeFormat}
              dateFormat={dateFormat}
              DeleteAppoint={DeleteAppoint}
            />
          </div>

          <div className="statusPrect-container">
            <StatusCard
              imgUrl={require("../imgs/percentage.png")}
              status={"Number of deals: 1200"} //need number here
            />
            <StatusCard
              imgUrl={require("../imgs/cd-scetch.png")}
              status={"Total number of users : 100"} //need number here
            />
            <div className="topStyles">
              <img src={require("../imgs/barberStyle.png")} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeView;

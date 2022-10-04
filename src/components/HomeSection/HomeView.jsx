import React, { Component, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import StatusCard from "./StatusCard";
import ActiveAppointments from "./ActiveAppointments";
import Customers from "../CustomerSection/Customers";
import CircularProgress from "@mui/material/CircularProgress";
import AppointChart from "../AppointsChart/AppointChart";
import { Link } from "react-router-dom";
function HomeView(props) {
  const [date, setDate] = useState(new Date());
  const {
    appointmentsData,
    timeFormat,
    dateFormat,
    DeleteAppoint,
    users,
    refetch,
    loading,
  } = props;
  // console.log(date);
  // console.log(appointmentsData);
  // if (loading) return <CircularProgress />;
  return (
    <div className="homeView-container">
      <div className="date-container">
        <button onClick={() => refetch()} className="refreshBtn">
          <i class="fa fa-refresh" aria-hidden="true"></i>
        </button>

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
      <div className="homeSection-primary">
        <div className="active-appoints">
          <div className="statusCards-container">
            <StatusCard
              imgUrl={require("./../../imgs/done.png")}
              status={"Done"}
            />
            <StatusCard
              imgUrl={require("./../../imgs/clock.png")}
              status={"Pending"}
              cs={"done"}
            />
            <StatusCard
              imgUrl={require("./../../imgs/cancelled.png")}
              status={"Canceled"}
            />
          </div>
          <ActiveAppointments
            date={date}
            appointmentsData={appointmentsData}
            timeFormat={timeFormat}
            dateFormat={dateFormat}
            DeleteAppoint={DeleteAppoint}
            sliceNumb={5}
          />
          <AppointChart appointmentsData={appointmentsData} date={date} />
        </div>

        <div className="statusPrect-container">
          <StatusCard
            imgUrl={require("./../../imgs/percentage.png")}
            status={"Number of deals: 1200"} //need number here
          />
          <StatusCard
            imgUrl={require("./../../imgs/cd-scetch.png")}
            status={"Total number of users : 100"} //need number here
          />
          <div className="recent-customers">
            <div className="recent-cta">
              <h3 className="recentLogo">Recent Customers</h3>
              <Link className="viewAll" to="/users">
                View all
              </Link>
            </div>

            <Customers
              users={users
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5)}
            />
          </div>
          {/* <div className="topStyles">
            <img src={require("./../../imgs/barberStyle.png")} alt="" />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default HomeView;

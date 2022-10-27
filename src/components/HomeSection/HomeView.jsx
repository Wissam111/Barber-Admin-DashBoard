import React, { Component, useState, useContext } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import StatusCard from "./StatusCard";
import ActiveAppointments from "./ActiveAppointments";
import Customers from "../CustomerSection/Customers";
import APIContext from "../Context/apiContext";
import { Link } from "react-router-dom";
import PercentageCard from "../SummerySection/PercentageCard";
function HomeView(props) {
  const [date, setDate] = useState(new Date());
  const [done, setDone] = useState(0);
  const [pending, setPending] = useState(0);
  const [canceled, setCanceled] = useState(0);
  const {
    appointmentsData,
    timeFormat,
    dateFormat,
    DeleteAppoint,
    refetch,
    loading,
    stats,
  } = props;

  const { users, doneDealsData, profitData } = useContext(APIContext);

  function UpdateStats(appointments) {
    let done = 0;
    let pending = 0;
    let canceled = 0;
    appointments.forEach((appoint) => {
      let d = dateFormat(new Date(appoint.start_time), "MM/DD/YYYY");
      let appD = dateFormat(new Date(date), "MM/DD/YYYY");
      if (d == appD) {
        if (appoint.status == "done") {
          done++;
        } else if (appoint.status == "canceled") {
          canceled++;
        } else if (
          appoint.status == "in-progress" ||
          appoint.status == "hold"
        ) {
          pending++;
        }
      }
    });
    setPending(pending);
    setCanceled(canceled);
    setDone(done);
  }
  React.useEffect(() => {
    UpdateStats(appointmentsData);
  }, [date, appointmentsData, doneDealsData, profitData]);

  return (
    <div className={"homeView-container"}>
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
      <div className="homeSection-primary">
        <div className="active-appoints">
          <div className="statusCards-container">
            <StatusCard
              imgUrl={require("./../../imgs/delivery-box.png")}
              status={"Done"}
              statsNumber={done}
            />
            <StatusCard
              imgUrl={require("./../../imgs/pending.png")}
              status={"Pending"}
              statsNumber={pending}
            />
            <StatusCard
              imgUrl={require("./../../imgs/delivery-cancelled.png")}
              status={"Canceled"}
              statsNumber={canceled}
            />
          </div>
          <ActiveAppointments
            date={date}
            appointmentsData={appointmentsData}
            timeFormat={timeFormat}
            dateFormat={dateFormat}
            DeleteAppoint={DeleteAppoint}
            UpdateStats={UpdateStats}
            sliceNumb={5}
          />
          <div className="charts-container">
            <PercentageCard revenueData={doneDealsData} />
            <PercentageCard revenueData={profitData} isProfit={true} />
          </div>
        </div>

        <div className="statusPrect-container">
          <StatusCard
            imgUrl={require("./../../imgs/percentage.png")}
            status={"Number of deals "}
            statsNumber={stats.appointmentsCount}
          />
          <StatusCard
            imgUrl={require("./../../imgs/cd-scetch.png")}
            status={"Total number of users "}
            statsNumber={stats.customersCount}
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
              isHome={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeView;

import React, { Component, useState, useContext } from "react";
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
import APIContext from "../Context/apiContext";
import { Link } from "react-router-dom";
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
  const { users, setUsers, revenue } = useContext(APIContext);
  const [doneDealsData, setDoneDealsData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  // console.log(revenue);
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
    updateRevenueData();
  }, [date]);

  const handleDeleteUser = (customerId) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      let tempUsers = users.filter((user) => {
        return user._id != customerId;
      });
      setUsers(tempUsers);
      props.DeleteUser(customerId);
    }
  };

  function updateRevenueData() {
    if (!revenue.data) {
      return;
    }
    let pData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let doneData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    revenue.data.forEach((rev) => {
      pData.splice(rev.month - 1, 0, rev.revenue);
      doneData.splice(rev.month - 1, 0, rev.count);
    });

    setDoneDealsData(doneData);
    setProfitData(pData);
  }

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
            <AppointChart
              revenueData={doneDealsData}
              date={date}
              isDoneDeal={true}
            />
            <AppointChart revenueData={profitData} date={date} />
          </div>
        </div>

        <div className="statusPrect-container">
          <StatusCard
            imgUrl={require("./../../imgs/percentage.png")}
            status={"Number of deals: "}
            statsNumber={stats.appointmentsCount}
          />
          <StatusCard
            imgUrl={require("./../../imgs/cd-scetch.png")}
            status={"Total number of users:"}
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
              handleDeleteUser={handleDeleteUser}
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

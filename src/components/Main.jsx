import React, { Component, useState, useContext } from "react";
import APIContext from "./Context/apiContext";
import FORMATContext from "./Context/formatContext";
import "react-calendar/dist/Calendar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
// import AddAppointments from "./pages/AddAppointments";
import CircularProgress from "@mui/material/CircularProgress";
import HomeView from "./HomeView";
import StaffWorkingHours from "./StaffWorkingHours";
function Main() {
  const {
    appointmentsData,
    workers,
    PostTime,
    DeleteAppoint,
    loading,
    UnBookAppoint,
    BookAppoint,
  } = useContext(APIContext);

  const { timeFormat, dateFormat } = useContext(FORMATContext);
  const [worker, setWorker] = useState({});
  const handleWorker = (worker) => {
    // setWorker(worker);
    // if (worker == "1") {
    //   updateWorkerDates(workers[0]._id);
    // } else {
    //   updateWorkerDates(worker._id);
    // }
  };
  // React.useEffect(() => {
  if (loading) return <CircularProgress />;
  // }, []);

  return (
    <div className="outerAdmin-container">
      <div className="admindashb-container">
        <Router>
          <NavBar
            workers={workers}
            handleWorker={handleWorker}
            active={worker}
          />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <HomeView
                  appointmentsData={appointmentsData}
                  timeFormat={timeFormat}
                  dateFormat={dateFormat}
                  DeleteAppoint={DeleteAppoint}
                />
              }
            />
            <Route
              path="/staff-hours"
              exact
              element={
                <StaffWorkingHours
                  workers={workers}
                  appointmentsData={appointmentsData}
                  timeFormat={timeFormat}
                  dateFormat={dateFormat}
                  PostTime={PostTime}
                  DeleteAppoint={DeleteAppoint}
                  UnBookAppoint={UnBookAppoint}
                  BookAppoint={BookAppoint}
                />
                // <AddAppointments
                //   date={date}
                //   worker={worker}
                //   appointmentsData={appointmentsData}
                //   workerDates={workerDates}
                //   PostTime={PostTime}
                //   PostDates={PostDates}
                //   timeFormat={timeFormat}
                //   dateFormat={dateFormat}
                // />
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default Main;

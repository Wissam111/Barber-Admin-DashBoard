import React, { Component, useState, useContext } from "react";
import APIContext from "./Context/apiContext";
import FORMATContext from "./Context/formatContext";
import "react-calendar/dist/Calendar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import ActiveAppointments from "./pages/ActiveAppointments";
import AddAppointments from "./pages/AddAppointments";
import CalendarView from "./CalendarView";
import CircularProgress from "@mui/material/CircularProgress";
function Main() {
  const [date, setDate] = useState(new Date());
  const {
    appointmentsData,
    workerDates,
    updateWorkerDates,
    workers,
    PostTime,
    PostDates,
    DeleteAppoint,
    loading,
  } = useContext(APIContext);
  const { timeFormat, dateFormat } = useContext(FORMATContext);
  const [worker, setWorker] = useState({});
  const handleWorker = (worker) => {
    setWorker(worker);
    if (worker == "1") {
      updateWorkerDates(workers[0]._id);
    } else {
      updateWorkerDates(worker._id);
    }
  };
  if (loading) return <CircularProgress />;

  return (
    <div className="appointements-container">
      <Router>
        <NavBar workers={workers} handleWorker={handleWorker} active={worker} />
        <div className="page-container">
          <CalendarView setDate={setDate} date={date} />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <ActiveAppointments
                  date={date}
                  appointmentsData={appointmentsData}
                  workerDates={workerDates}
                  PostTime={PostTime}
                  PostDates={PostDates}
                  timeFormat={timeFormat}
                  dateFormat={dateFormat}
                  workers={workers}
                  DeleteAppoint={DeleteAppoint}
                />
              }
            />
            <Route
              path="/add-appointments"
              exact
              element={
                <AddAppointments
                  date={date}
                  worker={worker}
                  appointmentsData={appointmentsData}
                  workerDates={workerDates}
                  PostTime={PostTime}
                  PostDates={PostDates}
                  timeFormat={timeFormat}
                  dateFormat={dateFormat}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default Main;

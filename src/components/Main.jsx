import React, { Component, useState, useContext } from "react";
import APIContext from "./Context/apiContext";
import FORMATContext from "./Context/formatContext";
import "react-calendar/dist/Calendar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import ActiveAppointments from "./pages/ActiveAppointments";
import AddAppointments from "./pages/AddAppointments";
import CalendarView from "./CalendarView";

function Main() {
  const [date, setDate] = useState(new Date());
  const { data, workerDates, updateWorkerDates, workers, PostTime, PostDates } =
    useContext(APIContext);
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
                  data={data}
                  workerDates={workerDates}
                  PostTime={PostTime}
                  PostDates={PostDates}
                  timeFormat={timeFormat}
                  dateFormat={dateFormat}
                  workers={workers}
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
                  data={data}
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

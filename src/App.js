import { Week } from "@syncfusion/ej2-react-schedule";
import { Fragment, useEffect, useState } from "react";
import React, { Component } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DayView from "./components/DayView";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ActiveAppointments from "./components/pages/ActiveAppointments";
import AddAppointments from "./components/pages/AddAppointments";
function App() {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [currDayData, setCurrDayData] = useState([]);
  const [appointsList, setAppointsList] = useState([]);
  async function fetchData() {
    const config = {
      headers: {
        Accept: "application/json",
        phone: "0547973441",
        password: "12345",
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFiODViNjdmYjkxNjI2M2ZkMzNjMzQiLCJpYXQiOjE2NjI4MDE0MTAsImV4cCI6MTY2MzA2MDYxMH0.wNMRzUIeYoFoSyiUiYyQzlj5shtQ-k0cGIIw-smnn9g",
      },
    };
    const res = await fetch(
      "https://saloon-ibra-api.herokuapp.com/api/appointments",
      config
    );
    const _data = await res.json();
    setData(_data.appointments);
  }
  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  });

  function timeFormat(time) {
    const m1 = moment(new Date(time));
    var hour = pad(m1.hours());
    var minutes = pad(m1.minutes());
    return `${hour}:${minutes}`;
  }

  function dateFormat(time) {
    // let momentDate = moment.utc(time).format("MM/DD/YYYY");
    let momentDate = moment(time).format("MM/DD/YYYY");
    return momentDate;
  }
  function pad(unit) {
    return ("0" + unit).length > 2 ? unit : "0" + unit;
  }

  const handleChange = (date) => {
    let d = moment.utc(date.toDateString()).format("MM/DD/YYYY");
    let _currDayData = data.filter((appoint) => {
      let appDate = dateFormat(appoint.start_time);
      return appDate == d && appoint.customer != null;
    });

    let _currAppointsList = data.filter((appoint) => {
      let appDate = dateFormat(appoint.start_time);
      return appDate == d && appoint.customer == null;
    });

    setCurrDayData(_currDayData);
    setAppointsList(_currAppointsList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let start = event.target[0].value;
    let end = event.target[1].value;
    if (appointsList.find((e) => e.start === start || e.end == end)) {
      return;
    }

    let appoint = {
      worker: `${data[0].worker._id}`,
      workingDate: `${dateFormat(date)}`,
      start_time: `${start}`,
      end_time: `${end}`,
    };
    // console.log(appoint);
    PostData(appoint);
  };
  async function PostData(appoint) {
    const config = {
      headers: {
        method: "POST",
        mode: "cors",
        phone: "0547973441",
        password: "12345",
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFiODViNjdmYjkxNjI2M2ZkMzNjMzQiLCJpYXQiOjE2NjI4MDE0MTAsImV4cCI6MTY2MzA2MDYxMH0.wNMRzUIeYoFoSyiUiYyQzlj5shtQ-k0cGIIw-smnn9g",
        body: JSON.stringify(appoint),
      },
    };
    fetch("https://saloon-ibra-api.herokuapp.com/api/appointments", config);
  }
  return (
    <div className="appointements-container">
      <Router>
        <NavBar />
        {/* <div className="calendar-container"> */}

        <div className="page-container">
          <div className="calendar-container">
            <Calendar
              calendarType={"Hebrew"}
              onChange={setDate}
              onClickDay={handleChange}
              value={date}
              minDate={new Date(2022, 6, 1)}
            />
          </div>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <ActiveAppointments
                  current_appointments={currDayData}
                  timeFormat={timeFormat}
                  dateFormat={dateFormat}
                />
              }
            />
            <Route
              path="/add-appointments"
              exact
              element={
                <AddAppointments
                  date={dateFormat(date)}
                  appointsList={appointsList}
                  handleSubmit={handleSubmit}
                  timeFormat={timeFormat}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

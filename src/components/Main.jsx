import React, { Component, useState, useContext } from "react";
import APIContext from "./Context/apiContext";
import FORMATContext from "./Context/formatContext";
import "react-calendar/dist/Calendar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import CircularProgress from "@mui/material/CircularProgress";
import Home from "./pages/Home";
import Staff from "./pages/Staff";
import Form from "./pages/Form";
import Users from "./pages/Users";
import Agenda from "./pages/Agenda";
import Login from "./LoginSection/Login";
function Main() {
  const {
    appointmentsData,
    workers,
    stats,
    PostTime,
    DeleteAppoint,
    loading,
    UnBookAppoint,
    BookAppoint,
    users,
    UpdateStatus,
    refetch,
    DeleteUser,
    CreateUser,
  } = useContext(APIContext);

  const { timeFormat, dateFormat } = useContext(FORMATContext);
  // React.useEffect(() => {
  // if (loading) return <CircularProgress />;
  // }, []);

  return (
    <div className="outerAdmin-container">
      <div className="admindashb-container">
        <Router>
          <NavBar workers={workers} />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <Home
                  appointmentsData={appointmentsData}
                  timeFormat={timeFormat}
                  dateFormat={dateFormat}
                  DeleteAppoint={DeleteAppoint}
                  // users={users}
                  refetch={refetch}
                  loading={loading}
                  stats={stats}
                />
              }
            />
            <Route
              path="/agenda"
              exact
              element={
                <Agenda
                  appointmentsData={appointmentsData}
                  timeFormat={timeFormat}
                  dateFormat={dateFormat}
                  DeleteAppoint={DeleteAppoint}
                  users={users}
                  loading={loading}
                />
              }
            />
            <Route
              path="/staff"
              exact
              element={
                <Staff
                  workers={workers}
                  appointmentsData={appointmentsData}
                  timeFormat={timeFormat}
                  dateFormat={dateFormat}
                  PostTime={PostTime}
                  DeleteAppoint={DeleteAppoint}
                  UnBookAppoint={UnBookAppoint}
                  BookAppoint={BookAppoint}
                  UpdateStatus={UpdateStatus}
                />
              }
            />
            <Route path="/form" exact element={<Form />} />
            <Route
              path="/users"
              exact
              element={
                <Users
                  users={users}
                  dateFormat={dateFormat}
                  DeleteUser={DeleteUser}
                  CreateUser={CreateUser}
                  loading={loading}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default Main;

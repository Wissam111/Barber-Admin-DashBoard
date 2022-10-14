import React, { Component, useState, useContext } from "react";
import APIContext from "./Context/apiContext";
import FORMATContext from "./Context/formatContext";
import "react-calendar/dist/Calendar.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./NavBar";
import CircularProgress from "@mui/material/CircularProgress";
import Home from "./pages/Home";
import Staff from "./pages/Staff";
import Users from "./pages/Users";
import Agenda from "./pages/Agenda";
import Login from "./pages/Login";
import Summery from "./pages/Summery";
import { Fragment } from "react";

function DashBoard() {
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
  const [isLogin, setIsLogin] = useState(true);
  // React.useEffect(() => {
  // if (loading) return <CircularProgress />;
  // }, []);

  return (
    <Fragment>
      <div className="outerAdmin-container">
        <div className="admindashb-container">
          <Router>
            {isLogin && (
              <NavBar
                workers={workers}
                handleLogOut={() => setIsLogin(!isLogin)}
              />
            )}
            <Routes>
              <Route
                path="/"
                exact
                element={<Login handleLogin={() => setIsLogin(!isLogin)} />}
              />
              <Route
                path="/main"
                exact
                element={
                  isLogin ? (
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
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/agenda"
                exact
                element={
                  isLogin ? (
                    <Agenda
                      appointmentsData={appointmentsData}
                      timeFormat={timeFormat}
                      dateFormat={dateFormat}
                      DeleteAppoint={DeleteAppoint}
                      users={users}
                      loading={loading}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/staff"
                exact
                element={
                  isLogin ? (
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
                      DeleteUser={DeleteUser}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/users"
                exact
                element={
                  isLogin ? (
                    <Users
                      users={users}
                      dateFormat={dateFormat}
                      DeleteUser={DeleteUser}
                      CreateUser={CreateUser}
                      loading={loading}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/summery"
                exact
                element={isLogin ? <Summery /> : <Navigate to="/" />}
              />
            </Routes>
          </Router>
        </div>
      </div>
    </Fragment>
  );
}

export default DashBoard;

import React, {  useState, useContext } from "react";
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
import useAuth from "../hooks/useAuth";
import Cookies from 'universal-cookie';
function DashBoard() {
  const {
    appointmentsData,
    workers,
    stats,
    PostTime,
    DeleteAppoint,
    loading,
    users,
    UpdateStatus,
    refetch,
    DeleteUser,
    CreateUser,
    isLogin,
    setIsLogin
    // authData,
    // setAuthData,
  } = useContext(APIContext);
  const cookies = new Cookies();
  const { timeFormat, dateFormat } = useContext(FORMATContext);
  // const [isLogin, setIsLogin] = useState(false);
  const {auth,setAuth} = useAuth();
  // React.useEffect(() => {
  // if (loading) return <CircularProgress />;
  // }, []);
  const [showNav, setShowNav] = useState(false);

  const handleLogin = (authData) => {
    console.log(authData);
    setAuth(authData);
    cookies.set('refreshToken', authData.refresh_token);
    cookies.set('refTokDate', authData.expireDateRefreshToken);
    setIsLogin(!isLogin);
  };

  return (
    <Fragment>
      <div className="outerAdmin-container">
        {isLogin&&<button onClick={() => refetch()} className="refreshBtn">
          <i class="fa fa-refresh" aria-hidden="true"></i>
        </button>}
        {loading && (
          <div className="loadingHome">
             <div className="circle-wrapper">
              <CircularProgress />
             </div>
          </div>
       
      )}
        <div className={"admindashb-container"}>
      
          {isLogin && (
            <i
              className="fa-solid fa-bars menuBar"
              onClick={() => setShowNav(true)}
            ></i>
          )}
          {/* <Router> */}
            {isLogin && (
              <NavBar
                workers={workers}
                handleLogOut={() => setIsLogin(!isLogin)}
                setShowNav={setShowNav}
                showNav={showNav}
                admin={auth.user}
              />
            )}
            <Routes>
              <Route
                path="/"
                exact
                element={<Login handleLogin={handleLogin} />}
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
          {/* </Router> */}
        </div>
      </div>
    </Fragment>
  );
}

export default DashBoard;

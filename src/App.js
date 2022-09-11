import { Week } from "@syncfusion/ej2-react-schedule";
import { useState } from "react";
import React, { Component } from "react";
import "react-calendar/dist/Calendar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ActiveAppointments from "./components/pages/ActiveAppointments";
import AddAppointments from "./components/pages/AddAppointments";
import { APIContextProvider } from "./components/Context/apiContext";
import CalendarView from "./components/CalendarView";
import { FormatContextProvider } from "./components/Context/formatContext";
function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="appointements-container">
      <FormatContextProvider>
        <APIContextProvider>
          <Router>
            <NavBar />
            <div className="page-container">
              <CalendarView setDate={setDate} date={date} />
              <Routes>
                <Route
                  path="/"
                  exact
                  element={<ActiveAppointments date={date} />}
                />
                <Route
                  path="/add-appointments"
                  exact
                  element={<AddAppointments date={date} />}
                />
              </Routes>
            </div>
          </Router>
        </APIContextProvider>
      </FormatContextProvider>
    </div>
  );
}

export default App;

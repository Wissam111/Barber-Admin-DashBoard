import React, { Component, useState, useContext, useRef } from "react";
import Paper from "@mui/material/Paper";
import moment from "moment/moment";
import AppointmentCard from "../../components/AppointmentCard";
import StaffView from "../../components/StaffView";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import StaffViewModel from "./StaffViewModel";
import Settings from "../../components/Settings";

import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
  DateNavigator,
  TodayButton,
  Toolbar,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";

function Staff(props) {
  const {
    workers,
    schedulerData,
    appointmentsData,
    handleStaffScheduler,
    currWorker,
    showSettings,
    workerSetting,
    showAppointCard,
    currAppoint,
    isBooked,
    setShowAppointCard,
    setIsBooked,
    setShowSettings,
    setCurrAppoint,
    handleBook,
    handleUnBook,
    handleDeleteUser,
    commitChanges,
    handleSettings,
  } = StaffViewModel();

  function Appointment({ children, style, data, ...restProps }) {
    return (
      <div className={`AppointmentComp-container`} id={`app-${data.id}`}>
        <Appointments.Appointment
          {...restProps}
          style={{
            ...style,
            backgroundColor: data.color,
          }}
        >
          {
            <Button
              color={data.color}
              id={data.id}
              setShowAppointCard={setShowAppointCard}
            />
          }
          {children}
        </Appointments.Appointment>
      </div>
    );
  }

  function Button(props) {
    let isBooked = props.color == "orange" ? false : true;

    const handleClick = () => {
      let appd = appointmentsData.find((app) => {
        return app._id == props.id;
      });

      setShowAppointCard(true);
      setCurrAppoint(appd);
      setIsBooked(isBooked);
    };
    return (
      <button className={"appointInfoBtn"} onClick={handleClick}>
        {<img src={require("../../../assets/icons/calendar2.png")}></img>}
      </button>
    );
  }

  return (
    <div className="page-container">
      <div className="workinghours-container">
        <StaffView
          workers={workers}
          handleStaffScheduler={handleStaffScheduler}
          handleSettings={handleSettings}
        />
        <div className="seheduler-container">
          {Object.keys(currWorker).length != 0 ? (
            <h2>{currWorker.firstName + " " + currWorker.lastName}</h2>
          ) : (
            <h2>Select Worker</h2>
          )}

          <Paper>
            <Scheduler height={680} data={schedulerData}>
              <ViewState defaultCurrentDate={new Date()} />
              <Toolbar />
              <DateNavigator />
              <WeekView startDayHour={8} endDayHour={24} height="30em" />
              <Appointments appointmentComponent={Appointment} />

              <CurrentTimeIndicator
                shadePreviousCells={true}
                shadePreviousAppointments={true}
              />
              <TodayButton />
              <EditingState onCommitChanges={commitChanges} />
              <IntegratedEditing />
              <AppointmentForm />
            </Scheduler>
          </Paper>
        </div>
        {showSettings && (
          <div className="settingsWrapper">
            <Settings
              handleExitSettings={() => setShowSettings(false)}
              user={workerSetting}
              isWorker={true}
              handleDeleteUser={handleDeleteUser}
            />
          </div>
        )}
        {showAppointCard && (
          <AppointmentCard
            appointment={currAppoint}
            handleCloseAppoint={() => setShowAppointCard(false)}
            handleBook={handleBook}
            handleUnBook={handleUnBook}
            isBooked={isBooked}
            worker={currWorker}
          />
        )}
      </div>
    </div>
  );
}

export default Staff;

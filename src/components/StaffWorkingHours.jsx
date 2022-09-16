import React, { Component, useState } from "react";
import StaffView from "./StaffView";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";

function StaffWorkingHours(props) {
  const [schedulerData, setSchedulerData] = useState([]);
  const { workers, appointmentsData } = props;
  const [currWorker, setCurrWorker] = useState({});

  const handleStaffScheduler = (worker) => {
    const currWorkerAppoints = appointmentsData.filter((appoint) => {
      return appoint.worker._id == worker._id;
    });

    const schData = currWorkerAppoints.map((appoint) => {
      let isBooked = appoint.customer;
      return {
        startDate: appoint.start_time,
        endDate: appoint.end_time,
        title: isBooked ? "Booked" : "Not Booked",
        color: isBooked ? "green" : "red",
      };
    });
    setCurrWorker(worker);
    setSchedulerData(schData);
  };
  const Appointment = ({ children, style, data, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: data.color,
      }}
    >
      {children}
    </Appointments.Appointment>
  );

  return (
    <div className="workinghours-container">
      <StaffView
        workers={workers}
        handleStaffScheduler={handleStaffScheduler}
      />
      <div className="seheduler-container">
        {Object.keys(currWorker).length != 0 ? (
          <h2>{currWorker.firstName + " " + currWorker.lastName}</h2>
        ) : (
          <h2>Select Worker </h2>
        )}
        <Paper>
          <Scheduler height={680} data={schedulerData}>
            <ViewState />
            <EditingState />
            <IntegratedEditing />
            <WeekView startDayHour={8} endDayHour={22} />
            <Appointments appointmentComponent={Appointment} />
            <AppointmentForm />
          </Scheduler>
        </Paper>
      </div>
    </div>
  );
}

export default StaffWorkingHours;

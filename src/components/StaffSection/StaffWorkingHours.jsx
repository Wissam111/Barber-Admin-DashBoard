import React, { Component, useState, useContext } from "react";
import StaffView from "./StaffView";
import Paper from "@mui/material/Paper";
import moment from "moment/moment";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
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

function StaffWorkingHours(props) {
  const [schedulerData, setSchedulerData] = useState([]);
  const {
    workers,
    appointmentsData,
    timeFormat,
    dateFormat,
    PostTime,
    DeleteAppoint,
    UnBookAppoint,
    BookAppoint,
    UpdateStatus,
  } = props;
  const [currWorker, setCurrWorker] = useState({});
  const handleStaffScheduler = (worker) => {
    const currWorkerAppoints = appointmentsData.filter((appoint) => {
      return appoint.worker._id == worker._id;
    });
    const schData = currWorkerAppoints.map((appoint) => {
      let schAppoint = createSchAppoint(appoint);
      return schAppoint;
    });
    setCurrWorker(worker);
    setSchedulerData(schData);
  };

  function createSchAppoint(appoint) {
    let isBooked = appoint.customer || appoint.status == "hold";
    let _appoint = {
      id: appoint._id,
      startDate: appoint.start_time,
      endDate: appoint.end_time,
      title: isBooked ? "Booked" : "Not Booked",
      color: isBooked ? "green" : "orange",
    };
    return _appoint;
  }

  function Appointment({ children, style, data, ...restProps }) {
    return (
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          backgroundColor: data.color,
        }}
      >
        {<Button color={data.color} id={data.id} />}
        {children}
      </Appointments.Appointment>
    );
  }

  function Button(props) {
    let isBooked = props.color == "orange" ? false : true;
    function handleUnBook() {
      let objAppo = {
        appointmentId: props.id,
        status: "free",
      };
      let newschData = schedulerData.map((appoint) => {
        if (appoint.id == props.id) {
          appoint.title = "Not Booked";
          appoint.color = "orange";
        }
        return appoint;
      });
      UpdateStatus(objAppo);
      setSchedulerData(newschData);
    }
    function handleBook() {
      let objAppo = {
        appointmentId: props.id,
        status: "hold",
      };
      let newschData = schedulerData.map((appoint) => {
        if (appoint.id == props.id) {
          appoint.title = "Booked";
          appoint.color = "green";
        }
        return appoint;
      });
      UpdateStatus(objAppo);
      setSchedulerData(newschData);
    }

    return (
      <button
        className={isBooked ? "unbookBtn" : "bookBtn"}
        onClick={isBooked ? handleUnBook : handleBook}
      >
        {isBooked ? (
          <img src={require("./../../imgs/unBook.png")}></img>
        ) : (
          <img src={require("./../../imgs/book.png")}></img>
        )}
      </button>
    );
  }

  async function commitChanges({ added, changed, deleted }) {
    let _tempSchData = [...schedulerData];
    if (added) {
      // yyyy-MM-DDTHH:mm:ssZZ
      let format = "yyyy-MM-DDTHH:mm:ssZZ";
      let currDate = dateFormat(added.startDate, "yyyy-MM-DD");
      let startDate = dateFormat(
        moment(currDate + " " + timeFormat(added.startDate)),
        format
      );
      let endDate = dateFormat(
        moment(currDate + " " + timeFormat(added.endDate)),
        format
      );
      let appoint = {
        worker: currWorker._id,
        start_time: `${startDate}`,
        end_time: `${endDate}`,
      };

      let appObj = await PostTime(appoint);
      let appointSch = createSchAppoint(appObj.appointment);
      _tempSchData.push(appointSch);
      setSchedulerData(_tempSchData);
    }
    if (deleted != null) {
      DeleteAppoint(deleted);
      let newSc = _tempSchData.filter((appoint) => {
        return appoint.id != deleted;
      });
      setSchedulerData(newSc);
    }
  }

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
          <h2>Select Worker</h2>
        )}

        <Paper>
          <Scheduler height={680} data={schedulerData}>
            <ViewState defaultCurrentDate={new Date()} />
            <Toolbar />
            <DateNavigator />
            <WeekView startDayHour={8} endDayHour={24} />
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
    </div>
  );
}

export default StaffWorkingHours;

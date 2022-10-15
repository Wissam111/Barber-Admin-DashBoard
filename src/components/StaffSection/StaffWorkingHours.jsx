import React, { Component, useState, useContext, useRef } from "react";
import StaffView from "./StaffView";
import Paper from "@mui/material/Paper";
import moment from "moment/moment";
import AppointmentCard from "./AppointmentCard";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import Settings from "../SettingsSection/Settings";
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
    UpdateStatus,
    DeleteUser,
  } = props;

  const [currWorker, setCurrWorker] = useState({});
  const [showSettings, setShowSettings] = useState(false);
  const [workerSetting, setWorkerSettings] = useState({});
  const [showAppointCard, setShowAppointCard] = useState(false);
  const [currAppoint, setCurrAppoint] = useState({});
  const [isBooked, setIsBooked] = useState(false);
  const handleStaffScheduler = (worker) => {
    const currWorkerAppoints = appointmentsData.filter((appoint) => {
      if (!appoint.worker) {
        return false;
      }
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
    let isBooked = !(appoint.status == "free" || appoint.status == "canceled");
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
  async function handleBook(id, selectedServ) {
    if (selectedServ == "") {
      window.alert("No Service Selected!");
      return;
    }

    let objAppo = {
      appointmentId: id,
      status: "hold",
      service: selectedServ,
    };
    let newschData = schedulerData.map((appoint) => {
      if (appoint.id == id) {
        appoint.title = "Booked";
        appoint.color = "green";
      }

      return appoint;
    });

    let res = await UpdateStatus(objAppo);
    if (res.message == "appointment status updated") {
      setShowAppointCard(false);
      setSchedulerData(newschData);
      window.alert("Appointment Booked Successfully");
    } else {
      window.alert(res.message);
    }
  }
  async function handleUnBook(id, selectedServ) {
    let objAppo = {
      appointmentId: id,
      status: "free",
    };
    let newschData = schedulerData.map((appoint) => {
      if (appoint.id == id) {
        appoint.title = "Not Booked";
        appoint.color = "orange";
      }
      return appoint;
    });

    let res = await UpdateStatus(objAppo);
    if (res.message == "appointment status updated") {
      setShowAppointCard(false);
      setSchedulerData(newschData);
      window.alert("Appointment UnBooked Successfully");
    } else {
      window.alert(res.message);
    }
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
        {<img src={require("./../../imgs/calendar2.png")}></img>}
        {/* {isBooked ? (
          <img src={require("./../../imgs/unBook.png")}></img>
        ) : (
          <img src={require("./../../imgs/book.png")}></img>
        )} */}
      </button>
    );
  }

  async function commitChanges({ added, changed, deleted }) {
    let _tempSchData = [...schedulerData];
    if (added) {
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
      if (appObj.message == "appointment created") {
        window.alert("appointment created Successfully");
        let appointSch = createSchAppoint(appObj.appointment);
        _tempSchData.push(appointSch);
        setSchedulerData(_tempSchData);
      } else {
        window.alert(appObj.message);
      }
    }
    if (deleted != null) {
      handleDeleteAppoint(deleted);
    }
  }
  const handleSettings = async (worker) => {
    setShowSettings(!showSettings);
    setWorkerSettings(worker);
  };
  const handleDeleteAppoint = async (appointId) => {
    let _tempSchData = [...schedulerData];
    let g = await DeleteAppoint(appointId);
    if (g.message == "appointment deleted") {
      let newSc = _tempSchData.filter((appoint) => {
        return appoint.id != appointId;
      });
      setSchedulerData(newSc);
      window.alert("appointment deleted successfully");
    } else {
      window.alert(g.message);
    }
  };
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      let res = await DeleteUser(userId);
      window.alert(res.message);
      setShowSettings(false);
    }
  };

  return (
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
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          handleBook={handleBook}
          handleUnBook={handleUnBook}
          isBooked={isBooked}
          worker={currWorker}
        />
      )}
    </div>
  );
}

export default StaffWorkingHours;

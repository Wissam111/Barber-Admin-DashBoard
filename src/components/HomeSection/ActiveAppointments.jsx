import React, { Component, useContext, useState } from "react";
import moment from "moment/moment";
import AppointmentsTable from "./AppointmentsTable";
import { Link } from "react-router-dom";
import APIContext from "../Context/apiContext";
function ActiveAppointments(props) {
  const {
    date,
    appointmentsData,
    timeFormat,
    dateFormat,
    DeleteAppoint,
    UpdateStats,
    sliceNumb,
  } = props;
  const { UpdateStatus } = useContext(APIContext);
  const [appointments, setAppointments] = useState([]);
  React.useEffect(() => {
    function filterCurrentDayData() {
      let format = "MM/DD/YYYY";
      let d = moment.utc(date).format("MM/DD/YYYY");
      let _currDayData = appointmentsData
        .filter((appoint) => {
          let appDate = dateFormat(appoint.start_time, format);
          return (
            appDate == d &&
            (!(appoint.status == "free") || appoint.customer != null)
          );
        })
        .sort(function (appoint1, appoint2) {
          return new Date(appoint1.start_time) - new Date(appoint2.start_time);
        });
      setAppointments(_currDayData);
    }
    filterCurrentDayData();
  }, [date, appointmentsData]);

  const handleDelete = (appoint) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      let temp = appointments.filter((_appoint) => {
        return appoint._id != _appoint._id;
      });
      setAppointments(temp);
      DeleteAppoint(appoint._id);
    }
  };

  const handleDone = (event, appoint) => {
    let tempAppoints = [...appointments];
    let tempAppoint = tempAppoints.find((_appoint) => {
      return appoint._id == _appoint._id;
    });

    if (event.target.checked) {
      if (!tempAppoint.service) {
        event.target.checked = false;
        window.alert("you cant change the status to done  without a service");
        return;
      }

      tempAppoint.status = "done";
      UpdateStatus({ appointmentId: appoint._id, status: "done" });
    } else {
      tempAppoint.status = "in-progress";
      UpdateStatus({ appointmentId: appoint._id, status: "in-progress" });
    }
    setAppointments(tempAppoints);
    UpdateStats(tempAppoints);
  };
  return (
    <div className="table-container">
      <div className="table-info">
        <h2>Reservation</h2>
        {sliceNumb == 5 && (
          <Link className="viewAll" to="/agenda" state={{ fromDate: date }}>
            {" "}
            View all
          </Link>
        )}
      </div>
      <AppointmentsTable
        appointements={appointments.slice(0, sliceNumb)}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        handleDelete={handleDelete}
        handleDone={handleDone}
        date={date}
      />

      {appointments.length == 0 && (
        <h2 className="noAppointsDay">No Appointements on this day</h2>
      )}
    </div>
  );
}

export default ActiveAppointments;

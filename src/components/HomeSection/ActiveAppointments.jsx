import React, { Component, useContext, useState } from "react";
import moment from "moment/moment";
import AppointmentsTable from "./AppointmentsTable";
import { Link } from "react-router-dom";
function ActiveAppointments(props) {
  const {
    date,
    appointmentsData,
    timeFormat,
    dateFormat,
    DeleteAppoint,
    sliceNumb,
  } = props;
  const [appointements, setAppointements] = useState([]);
  React.useEffect(() => {
    function filterCurrentDayData() {
      let format = "MM/DD/YYYY";
      let d = moment.utc(date).format("MM/DD/YYYY");
      let _currDayData = appointmentsData
        .filter((appoint) => {
          let appDate = dateFormat(appoint.start_time, format);
          return (
            appDate == d &&
            (appoint.customer != null || appoint.status == "hold")
          );
        })
        .sort(function (appoint1, appoint2) {
          return new Date(appoint1.start_time) - new Date(appoint2.start_time);
        });
      setAppointements(_currDayData);
    }
    filterCurrentDayData();
  }, [date]);

  // const handleMoreInfo = (ref, appoint) => {
  //   setCurrAppoint(appoint);
  //   setPositionRef(ref);
  //   console.log(ref);
  // };

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
        appointements={appointements.slice(0, sliceNumb)}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        // handleMoreInfo={handleMoreInfo}
      />

      {appointements.length == 0 && (
        <h2 className="noAppointsDay">No Appointements on this day</h2>
      )}

      {/* {Object.keys(currAppoint).length != 0 && (
        <CustomerCard
          appointment={currAppoint}
          timeFormat={timeFormat}
          dateFormat={dateFormat}
          handleCloseInfo={handleCloseInfo}
          position={positionRef}
          handleDeleteAppoint={handleDeleteAppoint}
        />
      )} */}
    </div>
  );
}

export default ActiveAppointments;

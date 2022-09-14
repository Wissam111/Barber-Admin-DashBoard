import React, { Component, useContext, useState } from "react";
import moment from "moment/moment";
import AppointmentsTable from "../LiveAppointmentsTable/AppointmentsTable";
import CustomerCard from "../LiveAppointmentsTable/CustomerCard";
function ActiveAppointments(props) {
  const { date, data, timeFormat, dateFormat, workers } = props;
  const [appointements, setAppointements] = useState([]);
  const [showAppoint, setShowApoint] = useState({});
  const [positionRef, setPositionRef] = useState({});
  React.useEffect(() => {
    function filterCurrentDayData() {
      let format = "MM/DD/YYYY";
      let d = moment.utc(date.toDateString()).format("MM/DD/YYYY");
      let _currDayData = data.filter((appoint) => {
        let appDate = dateFormat(appoint.start_time, format);
        return appDate == d && appoint.customer != null;
      });
      setAppointements(_currDayData);
    }
    filterCurrentDayData();
  }, [date]);

  const handleMoreInfo = (ref, appoint) => {
    setShowApoint(appoint);
    setPositionRef(ref);
  };
  function handleCloseInfo() {
    setShowApoint({});
  }

  function handleDeleteAppoint() {
    console.log("lol");
  }

  return (
    <div className="days-container">
      <AppointmentsTable
        appointements={appointements}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        handleMoreInfo={handleMoreInfo}
      />
      {appointements.length == 0 && (
        <h1 className="noAppointsDay">No Appointements on this day</h1>
      )}

      {Object.keys(showAppoint).length != 0 && (
        <CustomerCard
          appointment={showAppoint}
          timeFormat={timeFormat}
          dateFormat={dateFormat}
          handleCloseInfo={handleCloseInfo}
          position={positionRef}
          handleDeleteAppoint={handleDeleteAppoint}
        />
      )}
    </div>
  );
}

export default ActiveAppointments;

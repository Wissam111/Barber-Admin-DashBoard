import React, { Component, useContext, useState } from "react";
import moment from "moment/moment";
import AppointmentsTable from "../LiveAppointmentsTable/AppointmentsTable";
import CustomerCard from "../LiveAppointmentsTable/CustomerCard";
function ActiveAppointments(props) {
  const { date, appointmentsData, timeFormat, dateFormat, DeleteAppoint } =
    props;
  const [appointements, setAppointements] = useState([]);
  const [currAppoint, setCurrAppoint] = useState({});
  const [positionRef, setPositionRef] = useState({});

  React.useEffect(() => {
    function filterCurrentDayData() {
      let format = "MM/DD/YYYY";
      let d = moment.utc(date).format("MM/DD/YYYY");
      console.log(date);
      console.log(d);
      let _currDayData = appointmentsData.filter((appoint) => {
        let appDate = dateFormat(appoint.start_time, format);
        return appDate == d && appoint.customer != null;
      });
      setAppointements(_currDayData);
    }
    filterCurrentDayData();
  }, [date]);

  const handleMoreInfo = (ref, appoint) => {
    setCurrAppoint(appoint);
    setPositionRef(ref);
  };
  function handleCloseInfo() {
    setCurrAppoint({});
  }

  function handleDeleteAppoint() {
    console.log(currAppoint);
    DeleteAppoint(currAppoint._id);
  }

  return (
    <div className="table-container">
      <AppointmentsTable
        appointements={appointements}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        handleMoreInfo={handleMoreInfo}
      />
      {appointements.length == 0 && (
        <h1 className="noAppointsDay">No Appointements on this day</h1>
      )}

      {Object.keys(currAppoint).length != 0 && (
        <CustomerCard
          appointment={currAppoint}
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

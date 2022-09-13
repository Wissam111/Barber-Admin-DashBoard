import React, { Component, useContext, useState } from "react";
import DayView from "../DayView";
import moment from "moment/moment";
import AppointmentsView from "../AppointmentsView";

function ActiveAppointments(props) {
  const { date, data, timeFormat, dateFormat, workers } = props;
  const [appointements, setAppointements] = useState([]);

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
  return (
    <div className="days-container">
  
      <AppointmentsView
        appointements={appointements}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
      />
        {appointements.length==0&&<h1 className="noAppointsDay">No Appointements on this day</h1>}
    </div>
  );
}

export default ActiveAppointments;

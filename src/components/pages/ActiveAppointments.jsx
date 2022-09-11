import React, { Component, useContext, useState } from "react";
import DayView from "../DayView";
import APIContext from "../Context/apiContext";
import moment from "moment/moment";
import FORMATContext from "../Context/formatContext";
function ActiveAppointments(props) {
  const { data } = useContext(APIContext);
  const { timeFormat, dateFormat } = useContext(FORMATContext);
  let [currentDayData, setCurrentDayData] = useState([]);
  const { date } = props;
  React.useEffect(() => {
    function filterCurrentDayData() {
      let format = "MM/DD/YYYY";
      let d = moment.utc(date.toDateString()).format("MM/DD/YYYY");
      let _currDayData = data.filter((appoint) => {
        let appDate = dateFormat(appoint.start_time, format);
        return appDate == d && appoint.customer != null;
      });
      setCurrentDayData(_currDayData);
    }
    filterCurrentDayData();
  }, [date]);

  return (
    <DayView
      current_appointments={currentDayData}
      timeFormat={timeFormat}
      dateFormat={dateFormat}
    />
  );
}

export default ActiveAppointments;

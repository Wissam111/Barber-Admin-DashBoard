import React, { Component, useContext, useState } from "react";
import AppointmentsForm from "../AppointmentsForm";
import APIContext from "../Context/apiContext";
import FORMATContext from "../Context/formatContext";
import moment from "moment/moment";
import WorkingDates from "../WorkingDates";
function AddAppointments(props) {
  const { data, workerDates, PostTime, PostDates } = useContext(APIContext);
  const { timeFormat, dateFormat } = useContext(FORMATContext);
  const [currentAppoints, setCurrentAppoints] = useState([]);
  const [datesList, setDatesList] = useState([]);
  const { date } = props;

  React.useEffect(() => {
    function filterCurrentDayData() {
      let format = "MM/DD/YYYY";
      let d = moment.utc(date.toDateString()).format(format);
      let _currAppointsList = data.filter((appoint) => {
        let appDate = dateFormat(appoint.start_time, format);
        return appDate == d && appoint.customer == null;
      });
      let datesList = workerDates.filter((objDate) => {
        let appDate = dateFormat(objDate.date, format);
        return appDate == d;
      });
      setCurrentAppoints(_currAppointsList);
      setDatesList(datesList);
    }
    filterCurrentDayData();
  }, [date]);
  return (
    <div className="update-apponits">
      <WorkingDates date={date} dateFormat={dateFormat} PostDates={PostDates} />
      <AppointmentsForm
        date={date}
        appointsList={currentAppoints}
        timeFormat={timeFormat}
        dateFormat={dateFormat}
        PostTime={PostTime}
        workerDates={datesList}
      />
    </div>
  );
}

export default AddAppointments;

import React, { Component, useContext, useState } from "react";
import AppointmentsForm from "../AppointmentsForm";
import moment from "moment/moment";
import WorkerView from "../WorkerView";
import WorkingDates from "../WorkingDates.jsx";

function AddAppointments(props) {
  const [currentAppoints, setCurrentAppoints] = useState([]);
  const [datesList, setDatesList] = useState([]);
  const {
    date,
    worker,
    data,
    workerDates,
    PostTime,
    PostDates,
    timeFormat,
    dateFormat,
  } = props;
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
      <WorkingDates
        date={date}
        worker={worker}
        dateFormat={dateFormat}
        PostDates={PostDates}
      />
      <AppointmentsForm
        date={date}
        worker={worker}
        timeFormat={timeFormat}
        dateFormat={dateFormat}
        PostTime={PostTime}
        workerDates={datesList}
      />
      <WorkerView worker={worker} />
    </div>
  );
}

export default AddAppointments;

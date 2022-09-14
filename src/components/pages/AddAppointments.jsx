import React, { Component, useContext, useState } from "react";
import AppointmentsForm from "../WorkerForm/AppointmentsForm";
import moment from "moment/moment";
import WorkerView from "../WorkerForm/WorkerView";
import WorkingDates from "../WorkerForm/WorkingDates.jsx";

function AddAppointments(props) {
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

      let datesList = workerDates.filter((objDate) => {
        let appDate = dateFormat(objDate.date, format);
        return appDate == d;
      });
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

import React, { Component, useContext, useState } from "react";
import AppointmentsForm from "../AppointmentsForm";
import APIContext from "../Context/apiContext";
import FORMATContext from "../Context/formatContext";
import moment from "moment/moment";
import WorkingDates from "../WorkingDates";
function AddAppointments(props) {
  const { data, PostData, PostDates } = useContext(APIContext);
  const { timeFormat, dateFormat } = useContext(FORMATContext);
  const [currentAppoints, setCurrentAppoints] = useState([]);
  const { date } = props;

  React.useEffect(() => {
    function filterCurrentDayData() {
      let format = "MM/DD/YYYY";
      let d = moment.utc(date.toDateString()).format(format);
      let _currAppointsList = data.filter((appoint) => {
        let appDate = dateFormat(appoint.start_time, format);
        return appDate == d && appoint.customer == null;
      });
      setCurrentAppoints(_currAppointsList);
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
        PostData={PostData}
      />
    </div>
  );
}

export default AddAppointments;

import React, { Component, useContext, useState } from "react";
import CustomerCard from "./Customer";
import moment from "moment/moment";

function DayView(props) {
  const { timeFormat, dateFormat, data, worker, date } = props;
  let [currentDayData, setCurrentDayData] = useState([]);
  React.useEffect(() => {
    function filterCurrentDayData() {
      let format = "MM/DD/YYYY";
      let d = moment.utc(date.toDateString()).format("MM/DD/YYYY");
      let _currDayData = data.filter((appoint) => {
        let appDate = dateFormat(appoint.start_time, format);
        return (
          appoint.worker._id == worker._id &&
          appDate == d &&
          appoint.customer != null
        );
      });
      setCurrentDayData(_currDayData);
    }
    filterCurrentDayData();
  }, [date]);

  return (
    <div className="day-container">
      <h2>{`${worker.firstName} ${worker.lastName}`}</h2>
      {currentDayData.map((appont) => {
        return (
          <CustomerCard
            key={appont.id}
            appointment={appont}
            timeFormat={timeFormat}
            dateFormat={dateFormat}
          />
        );
      })}
    </div>
  );
}

export default DayView;

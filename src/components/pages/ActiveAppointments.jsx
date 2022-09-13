import React, { Component, useContext, useState } from "react";
import DayView from "../DayView";
import moment from "moment/moment";
import AppointmentsView from "../AppointmentsView";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
function ActiveAppointments(props) {
  const { date, data, timeFormat, dateFormat, workers } = props;
  const [appointements, setAppointements] = useState([]);
  // React.useEffect(() => {
  //   let _appoints = data.filter((appoint) => {
  //     return appoint.customer != null;
  //   });
  //   let newAppoints = [];
  //   _appoints.forEach((appoint) => {
  //     let obj = {
  //       startData: appoint.start_time,
  //       endDate: appoint.end_time,
  //       //       title: `Barber: ${appoint.worker.firstName} - ${appoint.worker.lastName}
  //       //         Customer: ${appoint.customer.firstName} - ${appoint.customer.lastName}
  //       //         Customer Phone: ${appoint.customer.phone}
  //       //         Time:${timeFormat(appoint.start_time)} - ${timeFormat(
  //       //         appoint.end_time
  //       //       )}
  //       //  `,
  //       title: "hoxfox",
  //     };
  //     newAppoints.push(obj);
  //   });
  //   setAppointements(newAppoints);
  //   console.log(newAppoints);
  // }, [date]);
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
      {/* <Scheduler data={appointements}>
        <ViewState />
        <EditingState />
        <IntegratedEditing />
        <WeekView startDayHour={8} endDayHour={21} />
        <Appointments />
        <AppointmentForm />
      </Scheduler> */}

      {/* {workers.map((worker) => {
        return (
          <DayView
            key={worker._id}
            timeFormat={timeFormat}
            dateFormat={dateFormat}
            worker={worker}
            data={data}
            date={date}
          />
        );
      })} */}
      <AppointmentsView
        appointements={appointements}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
      />
    </div>
  );
}

export default ActiveAppointments;

import React, { Component } from "react";
import AppointmentsForm from "../AppointmentsForm";

function AddAppointments(props) {
  return (
    <AppointmentsForm
      date={props.date}
      appointsList={props.appointsList}
      handleSubmit={props.handleSubmit}
      timeFormat={props.timeFormat}
    />
  );
}

export default AddAppointments;

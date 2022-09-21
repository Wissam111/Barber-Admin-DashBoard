import React, { Component } from "react";
import HomeView from "../HomeSection/HomeView";

function Home(props) {
  const { appointmentsData, timeFormat, dateFormat, DeleteAppoint } = props;
  return (
    <HomeView
      appointmentsData={appointmentsData}
      timeFormat={timeFormat}
      dateFormat={dateFormat}
      DeleteAppoint={DeleteAppoint}
    />
  );
}

export default Home;

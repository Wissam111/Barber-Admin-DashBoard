import React, { Component } from "react";
import HomeView from "../HomeSection/HomeView";

function Home(props) {
  const {
    appointmentsData,
    timeFormat,
    dateFormat,
    DeleteAppoint,
    refetch,
    loading,
    stats,
  } = props;
  return (
    <HomeView
      appointmentsData={appointmentsData}
      timeFormat={timeFormat}
      dateFormat={dateFormat}
      DeleteAppoint={DeleteAppoint}
      refetch={refetch}
      loading={loading}
      stats={stats}
    />
  );
}

export default Home;

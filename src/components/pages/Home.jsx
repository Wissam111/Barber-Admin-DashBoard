import React, { Component } from "react";
import HomeView from "../HomeSection/HomeView";

function Home(props) {
  const {
    appointmentsData,
    timeFormat,
    dateFormat,
    DeleteAppoint,
    users,
    refetch,
    loading,
  } = props;
  return (
    <HomeView
      appointmentsData={appointmentsData}
      timeFormat={timeFormat}
      dateFormat={dateFormat}
      DeleteAppoint={DeleteAppoint}
      users={users}
      refetch={refetch}
      loading={loading}
    />
  );
}

export default Home;
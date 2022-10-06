import React, { Component } from "react";
import WorkerView from "./WorkerView";

function StaffView(props) {
  const { workers, handleStaffScheduler } = props;
  // console.log(workers);
  return (
    <div className="staff-container">
      <div className="staff-logo">
        <h2>Staff</h2>
        <img src={require("./../../imgs/employee.png")} alt="" />
      </div>
      <div className="staff-wrapper">
        {workers.map((worker) => {
          return (
            <WorkerView
              key={worker._id}
              worker={worker}
              handleStaffScheduler={handleStaffScheduler}
            />
          );
        })}
      </div>
    </div>
  );
}

export default StaffView;

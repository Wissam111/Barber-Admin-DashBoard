import React, { Component } from "react";

function WorkerView(props) {
  const { worker, handleStaffScheduler } = props;

  return (
    <div className="workerView-container">
      <img
        className="workerImg"
        src={
          worker.image != null
            ? `https://saloon-ibra-api.herokuapp.com/imgs/${worker.image}`
            : ""
        }
        alt=""
      />
      <ul className="worker-info">
        <li>{worker.firstName + " " + worker.lastName}</li>
        <i className="fa fa-phone">
          <a href={"tel:" + worker.phone}>{worker.phone}</a>
        </i>
        <li>{"role: " + worker.role}</li>
      </ul>
      <div className="workerhours-cta">
        <button onClick={() => handleStaffScheduler(worker)}>
          <i className="fa-solid fa-calendar"></i>
        </button>
      </div>
    </div>
  );
}
export default WorkerView;
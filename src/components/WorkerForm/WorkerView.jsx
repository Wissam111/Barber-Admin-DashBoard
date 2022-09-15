import React, { Component } from "react";

function WorkerView(props) {
  const { worker } = props;

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
        <li>{"Phone: " + worker.phone}</li>
        <li>{"role: " + worker.role}</li>
      </ul>
    </div>
  );
}
export default WorkerView;

import React, { Component, useState } from "react";

function UpdateStatus(props) {
  const { position, handleCloseInfo } = props;
  // const [currStatus, setCurrStatus] = useState("hold");
  // const handleStatus = (status) => {
  //   setCurrStatus(status);
  // };
  const handleStatus = () => {};

  return (
    <div
      className="updateStatus-container"
      style={{
        left: `${position.current.offsetLeft - 250}px`,
        top: `${position.current.offsetTop - 25}px`,
      }}
    >
      <div className="updateStatus-list">
        <button className="closeBtn" onClick={handleCloseInfo}>
          <i className="fa fa-times"></i>
        </button>
        <button onClick={() => handleStatus("done")} className="statBtn">
          <img src={require("./../../imgs/done.png")} alt="" />
        </button>
        <button onClick={() => handleStatus("canceled")} className="statBtn">
          <img src={require("./../../imgs/cancelled.png")} alt="" />
        </button>
        <button onClick={() => handleStatus("in-progress")} className="statBtn">
          <img src={require("./../../imgs/clock.png")} alt="" />
        </button>
      </div>
    </div>
  );
}

export default UpdateStatus;

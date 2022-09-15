import React, { Component } from "react";

function StatusCard(props) {
  return (
    <div className="status-container">
      <h2>{props.status}</h2>
      <img src={props.imgUrl} alt="" />
    </div>
  );
}

export default StatusCard;

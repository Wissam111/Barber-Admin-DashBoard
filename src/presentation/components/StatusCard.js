import React, { Component } from "react";

function StatusCard(props) {
  const { status, statsNumber, imgUrl, className } = props;

  return (
    <div className={"status-container "}>
      <h2>{status + " " + statsNumber}</h2>
      <img src={imgUrl} alt="" />
    </div>
  );
}

export default StatusCard;

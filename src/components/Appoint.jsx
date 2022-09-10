import React, { Component } from "react";

function Appoint(props) {
  return (
    <div className="appoint-wrapper">
      <p className="timeDisplay">{props.start_time + " - " + props.end_time}</p>
      <button className="cbtn">
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
}

export default Appoint;

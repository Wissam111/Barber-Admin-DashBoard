import React, { Component } from "react";

function Appoint(props) {
  return (
    <div className="appoint-wrapper">
      <p className="timeDisplay">
        {props.isDate ? props.date : props.start_time + " - " + props.end_time}
      </p>
      <button onClick={() => props.handleDelete(props.date)} className="cbtn">
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
}

export default Appoint;

import { isDate } from "moment";
import React, { Component } from "react";

function Appoint(props) {
  return (
    <div className="appoint-wrapper">
      <p className="timeDisplay">
        {props.isDate ? props.date : props.start_time + " - " + props.end_time}
      </p>
      <button
        onClick={() =>
          props.isDate
            ? props.handleDelete(props.date)
            : props.handleDelete(props.start_time)
        }
        className="cbtn"
      >
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
}

export default Appoint;

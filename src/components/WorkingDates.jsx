import React, { Component, useState } from "react";
import Appoint from "./Appoint";

function WorkingDates(props) {
  const { date, worker, dateFormat, PostDates } = props;
  const [datesList, setDatesList] = useState([]);
  function handleDate() {
    let datesL = [...datesList];
    let d = dateFormat(date, "MM/DD/YYYY");
    if (datesL.includes(d)) {
      return;
    }
    datesL.push(d);
    setDatesList(datesL);
  }
  function handleDelete(d) {
    let _dates = datesList.filter((date) => {
      return date != d;
    });

    setDatesList(_dates);
  }
  function handleSubmit() {
    console.log(worker);
    datesList.forEach((date) => {
      let d = dateFormat(date, "yyyy-MM-DDTHH:mm:ssZ");
      PostDates({ workerId: worker._id, date: d });
    });

    setDatesList([]);
  }
  return (
    <div className="workingdates-container">
      <div className="addDate">
        <label> {dateFormat(date, "MM/DD/YYYY")}</label>
        <button className="submitBtn" onClick={handleDate}>
          Add date
        </button>
      </div>
      <div className="dates-ad">
        {datesList.length > 0
          ? datesList.map((d, id) => {
              return (
                <Appoint
                  key={id}
                  date={d}
                  handleDelete={handleDelete}
                  isDate={true}
                />
              );
            })
          : "No Selected Dates"}
      </div>
      <button onClick={handleSubmit} className="submitBtn subBtn">
        Submit Dates
      </button>
    </div>
  );
}

export default WorkingDates;

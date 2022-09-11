import React, { Component, useContext, createContext } from "react";
import moment from "moment/moment";
const FORMATContext = createContext();
export function FormatContextProvider({ children }) {
  return (
    <FORMATContext.Provider value={{ timeFormat, dateFormat }}>
      {children}
    </FORMATContext.Provider>
  );
}
function timeFormat(time) {
  const m1 = moment(new Date(time));
  var hour = pad(m1.hours());
  var minutes = pad(m1.minutes());

  function pad(unit) {
    return ("0" + unit).length > 2 ? unit : "0" + unit;
  }
  return `${hour}:${minutes}`;
}

function dateFormat(time, format) {
  let momentDate = moment(time).format(format);
  return momentDate;
}
export default FORMATContext;

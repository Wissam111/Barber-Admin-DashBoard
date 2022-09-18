import React, { useContext, useState, useEffect, createContext } from "react";
import useFetch from "./useFetch";
const APIContext = createContext();
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFiODViNjdmYjkxNjI2M2ZkMzNjMzQiLCJpYXQiOjE2NjMwNjk1NDYsImV4cCI6MTY2NDc5NzU0Nn0.tHV03EvkHq95V_x3lDDLjZAo4xWf6g-qp5vG5zn_kEM";
export function APIContextProvider({ children }) {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [workers, setWorkers] = useState([]);
  const { setCurrId } = useFetch(
    "https://saloon-ibra-api.herokuapp.com/api/appointments",
    setAppointmentsData,
    token
  );

  const { loading, error } = useFetch(
    "https://saloon-ibra-api.herokuapp.com/api/workers",
    setWorkers,
    token
  );

  async function PostTime(appoint) {
    try {
      let res = await fetch(
        "https://saloon-ibra-api.herokuapp.com/api/appointments",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(appoint),
          method: "POST",
        }
      );
      const g = await res.json();
      console.log(g);
      setCurrId(g.appointment._id);
      return g;
    } catch (e) {
      console.log(e);
    }
  }
  async function DeleteAppoint(appointId) {
    try {
      let res = await fetch(
        `https://saloon-ibra-api.herokuapp.com/api/appointments/${appointId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          method: "DELETE",
        }
      );
      const g = await res.json();
      setCurrId(appointId);
      // console.log(g);
    } catch (e) {
      console.log(e);
    }
  }

  async function UnBookAppoint(appointId) {
    try {
      let res = await fetch(
        "https://saloon-ibra-api.herokuapp.com/api/appointments/unbook",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(appointId),
          method: "POST",
        }
      );
      const g = await res.json();
      console.log(g);
      setCurrId(appointId);
    } catch (e) {
      console.log(e);
    }
  }
  async function BookAppoint(appoint) {
    try {
      let res = await fetch(
        "https://saloon-ibra-api.herokuapp.com/api/appointments/book",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(appoint),
          method: "POST",
        }
      );
      const g = await res.json();
      console.log(g);
      setCurrId(appoint.appointmentId);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <APIContext.Provider
      value={{
        appointmentsData,
        workers,
        PostTime,
        DeleteAppoint,
        loading,
        UnBookAppoint,
        BookAppoint,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export default APIContext;

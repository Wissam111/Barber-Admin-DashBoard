import React, { useContext, useState, useEffect, createContext } from "react";
import useFetch from "./useFetch";
const APIContext = createContext();
const ApiUrl = "https://saloon-ibra-api.herokuapp.com/api/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFiODViNjdmYjkxNjI2M2ZkMzNjMzQiLCJpYXQiOjE2NjQ4MDA5MzQsImV4cCI6MTY2NTA2MDEzNH0.3hDxDEpa1mXkCaB4NqjUXbM4JbzavInMDaHBQNsgnG4";
export function APIContextProvider({ children }) {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [users, setUsers] = useState([]);

  const { loading, error, setCurrId, data, refetch } = useFetch();

  useEffect(() => {
    if (data.length == 0) {
      return;
    }
    setAppointmentsData(data[0].appointments);
    setUsers(data[1].users);
    setWorkers(data[2].workers);
  }, [data]);

  async function PostTime(appoint) {
    try {
      let res = await fetch(ApiUrl + "appointments", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(appoint),
        method: "POST",
      });
      const g = await res.json();
      console.log(g);
      // setCurrId(g.appointment._id);
      refetch();
      return g;
    } catch (e) {
      console.log(e);
    }
  }
  async function DeleteAppoint(appointId) {
    try {
      let res = await fetch(
        // `https://saloon-ibra-api.herokuapp.com/api/appointments/${appointId}`
        ApiUrl + `appointments/${appointId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          method: "DELETE",
        }
      );
      const g = await res.json();
      // setCurrId(appointId);
      refetch();
      console.log(g);
    } catch (e) {
      console.log(e);
    }
  }

  async function UnBookAppoint(appointId) {
    try {
      let res = await fetch(
        // "https://saloon-ibra-api.herokuapp.com/api/appointments/unbook",
        ApiUrl + "appointments/unbook",
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
      // setCurrId(appointId);
      refetch();
    } catch (e) {
      console.log(e);
    }
  }
  async function BookAppoint(appoint) {
    try {
      let res = await fetch(
        // "https://saloon-ibra-api.herokuapp.com/api/appointments/book",
        ApiUrl + "appointments/book",
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
      // console.log(g);
      // setCurrId(appoint.appointmentId);
      refetch();
    } catch (e) {
      console.log(e);
    }
  }

  async function UpdateStatus(appoint) {
    try {
      let res = await fetch(
        // "https://saloon-ibra-api.herokuapp.com/api/appointments/book",
        ApiUrl + "appointments/update-status",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(appoint),
          method: "PATCH",
        }
      );
      const g = await res.json();
      console.log(g);
      console.log("lool");
      // setCurrId(appoint.appointmentId);
      refetch();
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
        users,
        UpdateStatus,
        refetch,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export default APIContext;

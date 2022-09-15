import React, { useContext, useState, useEffect, createContext } from "react";
import useFetch from "./useFetch";
const APIContext = createContext();
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFiODViNjdmYjkxNjI2M2ZkMzNjMzQiLCJpYXQiOjE2NjMwNjk1NDYsImV4cCI6MTY2NDc5NzU0Nn0.tHV03EvkHq95V_x3lDDLjZAo4xWf6g-qp5vG5zn_kEM";
export function APIContextProvider({ children }) {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [workerDates, setWorkerDates] = useState([]);
  const [workers, setWorkers] = useState([]);

  useFetch(
    "https://saloon-ibra-api.herokuapp.com/api/appointments",
    setAppointmentsData,
    token
  );

  const { loading, error } = useFetch(
    "https://saloon-ibra-api.herokuapp.com/api/workers",
    setWorkers,
    token
  );

  async function updateWorkerDates(workerId) {
    const config = {
      headers: {
        Accept: "application/json",
        phone: "0547973441",
        password: "12345",
        Authorization: "Bearer " + token,
      },
    };

    const workerRes = await fetch(
      "https://saloon-ibra-api.herokuapp.com/api/workers/working-dates?workerId=" +
        workerId,
      config
    );
    const workerDates = await workerRes.json();
    setWorkerDates(workerDates.workingDates);
  }

  return (
    <APIContext.Provider
      value={{
        appointmentsData,
        workerDates,
        workers,
        PostTime,
        PostDates,
        updateWorkerDates,
        DeleteAppoint,
        loading,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

async function PostTime(appoint) {
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
}

async function PostDates(appoint) {
  let res = await fetch(
    "https://saloon-ibra-api.herokuapp.com/api/workers/working-date",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(appoint),
      method: "POST",
    }
  );
  console.log(appoint);
  const g = await res.json();
  console.log(g);
}
async function DeleteAppoint(workerId) {
  let res = await fetch(
    `https://saloon-ibra-api.herokuapp.com/api/appointments/${workerId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "DELETE",
    }
  );
  const g = await res.json();
  console.log(g);
}

export default APIContext;

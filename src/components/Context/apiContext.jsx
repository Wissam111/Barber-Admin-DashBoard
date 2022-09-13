import React, { useContext, useState, useEffect, createContext } from "react";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [workerDates, setWorkerDates] = useState([]);
  const [workers, setWorkers] = useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const config = {
        headers: {
          Accept: "application/json",
          phone: "0547973441",
          password: "12345",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFiODViNjdmYjkxNjI2M2ZkMzNjMzQiLCJpYXQiOjE2NjMwNjk1NDYsImV4cCI6MTY2NDc5NzU0Nn0.tHV03EvkHq95V_x3lDDLjZAo4xWf6g-qp5vG5zn_kEM",
        },
      };
      const res = await fetch(
        "https://saloon-ibra-api.herokuapp.com/api/appointments",
        config
      );
      const workers = await fetch(
        "https://saloon-ibra-api.herokuapp.com/api/workers",

        config
      );
      const _data = await res.json();
      const workersD = await workers.json();
      setData(_data.appointments);
      setWorkers(workersD.workers);
    }
    fetchData();
  }, []);

  async function updateWorkerDates(workerId) {
    const config = {
      headers: {
        Accept: "application/json",
        phone: "0547973441",
        password: "12345",
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFiODViNjdmYjkxNjI2M2ZkMzNjMzQiLCJpYXQiOjE2NjI4MDE0MTAsImV4cCI6MTY2MzA2MDYxMH0.wNMRzUIeYoFoSyiUiYyQzlj5shtQ-k0cGIIw-smnn9g",
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
        data,
        workerDates,
        workers,
        PostTime,
        PostDates,
        updateWorkerDates,
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
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFiODViNjdmYjkxNjI2M2ZkMzNjMzQiLCJpYXQiOjE2NjI4MDE0MTAsImV4cCI6MTY2MzA2MDYxMH0.wNMRzUIeYoFoSyiUiYyQzlj5shtQ-k0cGIIw-smnn9g",
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
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFiODViNjdmYjkxNjI2M2ZkMzNjMzQiLCJpYXQiOjE2NjI4MDE0MTAsImV4cCI6MTY2MzA2MDYxMH0.wNMRzUIeYoFoSyiUiYyQzlj5shtQ-k0cGIIw-smnn9g",
      },
      body: JSON.stringify(appoint),
      method: "POST",
    }
  );
  console.log(appoint);
  const g = await res.json();
  console.log(g);
}

export default APIContext;

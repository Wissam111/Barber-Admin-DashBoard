import React, { useContext, useState, useEffect, createContext } from "react";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [data, setData] = useState([]);

  React.useEffect(() => {
    async function fetchData() {
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
      const res = await fetch(
        "https://saloon-ibra-api.herokuapp.com/api/appointments?workerId=" +
          "631b85b67fb916263fd33c34",
        config
      );
      const _data = await res.json();
      setData(_data.appointments);
    }
    fetchData();
  }, []);

  return (
    <APIContext.Provider value={{ data, PostData, PostDates }}>
      {children}
    </APIContext.Provider>
  );
}

async function PostData(appoint) {
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

import React, { useContext, useState, useEffect, createContext } from "react";
import useFetch from "./useFetch";
const APIContext = createContext();
const ApiUrl = "https://saloon-ibra-api.herokuapp.com/api/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFiODViNjdmYjkxNjI2M2ZkMzNjMzQiLCJpYXQiOjE2NjUwNjI0MjksImV4cCI6MTY2NzY1NDQyOX0.ipmRmjL3PLcmu75-WgPFyGAvz2xsVwS-Wk7dEVsSsdA";
export function APIContextProvider({ children }) {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState([]);

  const { loading, error, setCurrId, data, refetch } = useFetch();

  useEffect(() => {
    if (data.length == 0) {
      return;
    }
    setAppointmentsData(data[0].appointments);
    setUsers(data[1].users);
    setWorkers(data[2].workers);
    setStats(data[3]);
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
      refetch();
      return g;
    } catch (e) {
      console.log(e);
    }
  }
  async function DeleteAppoint(appointId) {
    try {
      let res = await fetch(ApiUrl + `appointments/${appointId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        method: "DELETE",
      });
      const g = await res.json();
      console.log(g);
      // refetch();
    } catch (e) {
      console.log(e);
    }
  }

  async function UnBookAppoint(appointId) {
    try {
      let res = await fetch(ApiUrl + "appointments/unbook", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(appointId),
        method: "POST",
      });
      const g = await res.json();
      console.log(g);
      refetch();
    } catch (e) {
      console.log(e);
    }
  }
  async function BookAppoint(appoint) {
    try {
      let res = await fetch(ApiUrl + "appointments/book", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(appoint),
        method: "POST",
      });
      const g = await res.json();
      console.log(g);
      refetch();
    } catch (e) {
      console.log(e);
    }
  }
  async function CreateUser(user) {
    try {
      let res = await fetch(ApiUrl + "signup", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(user),
        method: "POST",
      });
      const g = await res.json();
      console.log(g);
      if (g.message == "signup sucess") {
        refetch();
      }
      return g.message;
    } catch (e) {
      console.log(e);
    }
  }

  async function UpdateStatus(appoint) {
    try {
      let res = await fetch(ApiUrl + "appointments/update-status", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(appoint),
        method: "PATCH",
      });
      const g = await res.json();
      console.log(g);
      refetch();
    } catch (e) {
      console.log(e);
    }
  }
  async function DeleteUser(userId) {
    try {
      let res = await fetch(ApiUrl + `users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        method: "DELETE",
      });
      const g = await res.json();
      console.log(g);
      // refetch();
    } catch (e) {
      console.log(e);
    }
  }
  async function SendAuth(appoint) {
    try {
      let res = await fetch(ApiUrl + "send-auth-verification", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(appoint),
        method: "POST",
      });
      const g = await res.json();
      // console.log(g);
      // refetch();
      return g;
    } catch (e) {
      console.log(e);
    }
  }
  async function VerifyAuth(appoint) {
    try {
      let res = await fetch(ApiUrl + "login-verify-phone", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(appoint),
        method: "POST",
      });
      const g = await res.json();
      // console.log(g);
      // refetch();
      return g;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <APIContext.Provider
      value={{
        appointmentsData,
        workers,
        stats,
        PostTime,
        DeleteAppoint,
        loading,
        UnBookAppoint,
        BookAppoint,
        users,
        setUsers,
        UpdateStatus,
        refetch,
        DeleteUser,
        CreateUser,
        SendAuth,
        VerifyAuth,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export default APIContext;

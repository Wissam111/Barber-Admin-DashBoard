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
  const [authData, setAuthData] = useState({});
  const [doneDealsData, setDoneDealsData] = useState([]);
  const [profitData, setProfitData] = useState([]);

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFiODViNjdmYjkxNjI2M2ZkMzNjMzQiLCJpYXQiOjE2NjUwNjI0MjksImV4cCI6MTY2NzY1NDQyOX0.ipmRmjL3PLcmu75-WgPFyGAvz2xsVwS-Wk7dEVsSsdA";
  const token = authData.token;

  const { loading, error, setCurrId, data, refetch } = useFetch(token);

  useEffect(() => {
    if (data.length == 0) {
      return;
    }
    setAppointmentsData(data[0].appointments);
    setUsers(data[1].users);
    setWorkers(data[2].workers);
    setStats(data[3]);
    updateRevenueData(data[4]);
  }, [data, authData]);
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
      refetch();
      return g;
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
      return g;
    } catch (e) {
      console.log(e);
    }
  }
  async function UpdateUser(userId, userObj) {
    try {
      let res = await fetch(ApiUrl + `users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(userObj),
        method: "PATCH",
      });
      const g = await res.json();
      console.log(g);
      refetch();
    } catch (e) {
      console.log(e);
    }
  }
  async function AddService(servObj) {
    try {
      let res = await fetch(ApiUrl + `workers/services`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(servObj),
        method: "POST",
      });
      const g = await res.json();
      console.log(g);
    } catch (e) {
      console.log(e);
    }
  }

  async function DeleteService(servId) {
    try {
      let res = await fetch(ApiUrl + `workers/services/${servId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        method: "DELETE",
      });
      const g = await res.json();
      console.log(g);
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
      refetch();
      return g;
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
      refetch();
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
      refetch();
      return g;
    } catch (e) {
      console.log(e);
    }
  }
  function updateRevenueData(revenue) {
    if (!revenue.data) {
      return;
    }
    let pData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let doneData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    revenue.data.forEach((rev) => {
      pData.splice(rev.month - 1, 0, rev.revenue);
      doneData.splice(rev.month - 1, 0, rev.count);
    });

    setDoneDealsData(doneData);
    setProfitData(pData);
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
        users,
        setUsers,
        UpdateStatus,
        refetch,
        DeleteUser,
        CreateUser,
        SendAuth,
        VerifyAuth,
        UpdateUser,
        AddService,
        DeleteService,
        doneDealsData,
        profitData,
        setAuthData,
        authData,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export default APIContext;

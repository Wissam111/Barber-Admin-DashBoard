import axios from "axios";
import React, { useContext, useState, useEffect, createContext } from "react";
import useFetch from "./useFetch";
import useAuth from "../../hooks/useAuth";
import Cookies from 'universal-cookie';
// refTokDate
const APIContext = createContext();
const ApiUrl = "https://saloon-ibra-api.herokuapp.com/api/";

export function APIContextProvider({ children }) {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState([]);
  const{auth} = useAuth();


  const [doneDealsData, setDoneDealsData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const cookies = new Cookies();
  let ifRef = new Date(cookies.get("refTokDate"))>new Date();
  const [isLogin, setIsLogin] = useState(ifRef?true:false);
  const token = auth.token;
  const { loading, error, setCurrId, data, refetch } = useFetch(token,isLogin,setIsLogin);

  useEffect(() => {
    if (data.length == 0) {
      return;
    }
   
    setAppointmentsData(data[0].appointments);
    setUsers(data[1].users);
    setWorkers(data[2].workers);
    setStats(data[3]);
    updateRevenueData(data[4]);
  }, [data, auth]);
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
  async function SendAuth(authObj) {
    try {
      let res = await fetch(ApiUrl + "send-auth-verification", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(authObj),
        method: "POST",
      });
      const g = await res.json();
      refetch();
      return g;
    } catch (e) {
      console.log(e);
    }
  }
  async function VerifyAuth(vefObj) {

   const response = await axios.post(ApiUrl+"login-verify-phone",vefObj);
   console.log(response.data);
   return response;
    
    // try {
    //   let res = await fetch(ApiUrl + "login-verify-phone", {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + token,
    //     },
    //     body: JSON.stringify(appoint),
    //     method: "POST",
    //   });
    //   const g = await res.json();
    //   refetch();
    //   return g;
    // } catch (e) {
    //   console.log(e);
    // }
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
        isLogin,
        setIsLogin
        // RefreshToken,
        // setAuthData,
        // authData,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export default APIContext;

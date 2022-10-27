import React, { Component, useEffect, useState } from "react";
// import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
//working on it
import { useNavigate,useLocation } from "react-router-dom";

function useFetch(token,isLogin,setIsLogin) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const ApiUrl = "https://saloon-ibra-api.herokuapp.com/api/";
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFiODViNjdmYjkxNjI2M2ZkMzNjMzQiLCJpYXQiOjE2NjUwNjI0MjksImV4cCI6MTY2NzY1NDQyOX0.ipmRmjL3PLcmu75-WgPFyGAvz2xsVwS-Wk7dEVsSsdA";
  const dataUrls = [
    {
      url: ApiUrl + "appointments",
    },
    {
      url: ApiUrl + "users",
    },
    {
      url: ApiUrl + "workers",
    },
    {
      url: ApiUrl + "dashboard/stats",
    },
    {
      url: ApiUrl + "dashboard/worker-revenue",
    },
  ];
  async function fetchData() {
    const config = {
      headers: {
        Accept: "application/json",
        phone: "0547973441",
        password: "12345",
        Authorization: "Bearer " + token,
      },
    };
    Promise.all(
      dataUrls.map((durl) => {
        return axiosPrivate.get(durl.url, config);
      })
    )
      .then((response) => {
        let tempData = response.map((res) => {
          return res.data;
        });
        setData(tempData);
      })
      .catch((err) => {      
        setError(err);
        // refetch();
        navigate('/', { state: { from: location }, replace: true });
        setIsLogin(false);
      
      })
      .finally(() => {
        setLoading(false);
      });
  }

  try {
    useEffect(() => {
      if (!isLogin) {
        return;
      }
      setLoading(true);
      fetchData();
     
   

    }, [token]);
  } catch (e) {
    console.log(e);
  }

  const refetch = () => {
    if(!isLogin){
      return;
    }
    setLoading(true);
    fetchData();

    // if (loading) return <CircularProgress />;
  };

  return { loading, error, data, refetch };
}

export default useFetch;

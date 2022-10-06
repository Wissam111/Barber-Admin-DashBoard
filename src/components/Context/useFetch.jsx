import React, { Component, useEffect, useState } from "react";
import axios from "axios";
//working on it

function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currId, setCurrId] = useState(false);
  const [data, setData] = useState([]);
  const ApiUrl = "https://saloon-ibra-api.herokuapp.com/api/";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFiODViNjdmYjkxNjI2M2ZkMzNjMzQiLCJpYXQiOjE2NjUwNjI0MjksImV4cCI6MTY2NzY1NDQyOX0.ipmRmjL3PLcmu75-WgPFyGAvz2xsVwS-Wk7dEVsSsdA";
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
        return axios.get(durl.url, config);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }

  try {
    useEffect(() => {
      setLoading(true);
      // async function fetchData() {
      //   const config = {
      //     headers: {
      //       Accept: "application/json",
      //       phone: "0547973441",
      //       password: "12345",
      //       Authorization: "Bearer " + token,
      //     },
      //   };
      //   Promise.all(
      //     dataUrls.map((durl) => {
      //       return axios.get(durl.url, config);
      //     })
      //   )
      //     .then((response) => {
      //       let tempData = response.map((res) => {
      //         return res.data;
      //       });
      //       setData(tempData);
      //     })
      //     .catch((err) => {
      //       setError(err);
      //     })
      //     .finally(() => {
      //       setLoading(false);
      //     });
      // }
      fetchData();
    }, [currId]);
  } catch (e) {
    console.log(e);
  }

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { loading, error, setCurrId, data, refetch };
}

export default useFetch;

import React, { Component, useEffect, useState } from "react";
import axios from "axios";
//working on it

function useFetch(url, setFunction, token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  try {
    useEffect(() => {
      setLoading(true);
      async function fetchData() {
        const config = {
          headers: {
            Accept: "application/json",
            phone: "0547973441",
            password: "12345",
            Authorization: "Bearer " + token,
          },
        };

        await axios
          .get(url, config)
          .then((response) => {
            let _data =
              response.data.appointments != null
                ? response.data.appointments
                : response.data.workers;

            setFunction(_data);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      fetchData();
    }, [url]);
  } catch (e) {
    console.log(e);
  }

  return { loading, error };
}

export default useFetch;

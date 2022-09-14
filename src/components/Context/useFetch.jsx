import React, { Component, useEffect } from "react";
import axios from "axios";
//working on it

function useFetch(url, setFunction, method) {
  return useEffect(() => {
    const config = {
      headers: {
        Accept: "application/json",
        phone: "0547973441",
        password: "12345",
        Authorization: "Bearer " + token,
      },
    };
  });
}

export default useFetch;

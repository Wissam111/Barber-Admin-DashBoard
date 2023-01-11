import { createContext, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
export const ApiContext = createContext();
const BASE_URL =
  "http://ec2-13-231-177-94.ap-northeast-1.compute.amazonaws.com/api/";

export const ApiContextProvider = ({ children }) => {
  const { authData } = useAuthContext();
  const navigate = useNavigate();
  const apiCall = async (
    url,
    method = "GET",
    body,
    contentType = "application/json"
  ) => {
    const customURL = BASE_URL + url;
    const result = await fetch(customURL, {
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${authData?.token}`,
      },
      method: method,
      body: JSON.stringify(body),
    });
    const json = await result.json();
    if (!result.ok) {
      if (result.status === 401) {
        navigate("/", { replace: true });
        throw "you_are_not_authorized";
      }
      throw {
        status: result.status,
        ...json,
      };
    }
    return { status: result.status, data: json };
  };

  return (
    <ApiContext.Provider value={{ apiCall }}>{children}</ApiContext.Provider>
  );
};

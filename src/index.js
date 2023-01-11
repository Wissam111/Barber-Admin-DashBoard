import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApiContextProvider } from "./context/ApiContext";
import { AuthContextProvider } from "./context/AuthContext";
import { LoadingContextProvider } from "./context/LoadingContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ApiContextProvider>
          <LoadingContextProvider>
            <App />
          </LoadingContextProvider>
        </ApiContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

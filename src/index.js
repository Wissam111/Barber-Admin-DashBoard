import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApiContextProvider } from "./context/ApiContext";
import { AuthContextProvider } from "./context/AuthContext";
import { LoadingContextProvider } from "./context/LoadingContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ApiContextProvider>
        <LoadingContextProvider>
          <App />
        </LoadingContextProvider>
      </ApiContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

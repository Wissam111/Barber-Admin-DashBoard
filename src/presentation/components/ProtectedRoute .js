import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const { authData } = useAuthContext();
  return authData ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;

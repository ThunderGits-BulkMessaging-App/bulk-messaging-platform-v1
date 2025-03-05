import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./auth";

const PrivateRoute = () => {
  let auth = isAuthenticated();
  return auth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const token = localStorage.getItem("auth") !== null ? true : false;
  if (!token) return <Navigate to="/auth/login" />;
  return props.children;
};

export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteReset = (props) => {
  const token = localStorage.getItem("token_reset") ? true : false;
  if (!token) return <Navigate to="/auth/login" />;
  return props.children;
};

export default PrivateRouteReset;

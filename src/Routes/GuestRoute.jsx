import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = (props) => {
  const token = localStorage.getItem("auth") ? true : false;
  if (token) return <Navigate to="/" />;
  return props.children;
};

export default GuestRoute;

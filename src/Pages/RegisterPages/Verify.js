import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import LoadingComponent from "../../Component/LoadingComponent/LoadingComponent";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const values = queryString.parse(location.search);
  const verifyEmail = async () => {
    const response = await fetch(values.url + "&hash=" + values.hash + "&signature=" + values.signature);
    const result = await response.json();
    if (result.status) {
      localStorage.setItem("emailVerified", JSON.stringify(result));
      navigate("/auth/login");
    }
  };
  useEffect(() => {
    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoadingComponent align="center" />;
};

export default Verify;

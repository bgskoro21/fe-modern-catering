import React, { useState } from "react";
import "./LoginGoogle.css";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const LoginGoogleButtonComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const handleOnClick = async () => {
    setLoading(true);
    const response = await fetch("http://127.0.0.1:8000/api/login-google", {
      method: "POST",
    });
    const result = await response.json();
    if (result.hasOwnProperty("redirectUrl")) {
      window.location.href = result.redirectUrl;
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingComponent align="center" />;
  }
  return (
    <div className="login-google-button border rounded mb-4 p-2 text-center" style={{ cursor: "pointer" }} onClick={handleOnClick}>
      <div className="d-flex justify-content-center align-items-center">
        <img src="https://cdn.pixabay.com/photo/2015/10/31/12/56/google-1015752_960_720.png" alt="Phooto Google" className="img-fluid" style={{ width: "20px", height: "20px" }} />
        &nbsp;&nbsp;
        <span className="fw-bold" style={{ fontSize: "16px" }}>
          {props.text}
        </span>
      </div>
    </div>
  );
};

export default LoginGoogleButtonComponent;

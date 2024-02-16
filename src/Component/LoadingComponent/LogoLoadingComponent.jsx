import React from "react";
import "./Loading.css";
import Logo from "../../assets/img/Logo-red.jpeg";

const LogoLoadingComponent = () => {
  return (
    <div style={{ height: "80vh" }} className="d-flex justify-content-center align-items-center">
      <img src={Logo} alt="Loading Logo" className="img-fluid rounded-circle loading-logo" width={80} />
    </div>
  );
};

export default LogoLoadingComponent;

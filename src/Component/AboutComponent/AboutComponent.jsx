import React from "react";
import "./AboutComponent.css";

const AboutComponent = ({ icon, title, desc }) => {
  return (
    <div className="col-md-4 d-flex flex-column align-items-center mb-3 mb-md-0">
      <i className={`${icon} mb-3 icon-about text-danger`} />
      <span className="fw-bold mb-2">{title}</span>
      <span className="text-center">{desc}</span>
    </div>
  );
};

export default AboutComponent;

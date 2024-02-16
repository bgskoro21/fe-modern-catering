import React from "react";
import "./ScrollTop.css";

const ScrollTopButtonComponent = ({ status }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={`button-wrapper ${status ? "active" : "inActive"}`} onClick={scrollToTop}>
      <i className="fa-solid fa-arrow-up fs-3"></i>
    </div>
  );
};

export default ScrollTopButtonComponent;

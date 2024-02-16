import React from "react";
import "./ModalComponent.css";

const ModalComponent = (props) => {
  return (
    <div className={`modal-overlay ${props.isOpen ? "animating" : "close"}`}>
      <div className={`modal-content ${props.isOpen ? "animating" : "close"}`}>{props.children}</div>
    </div>
  );
};

export default ModalComponent;

import React from "react";

const AlertComponent = (props) => {
  return (
    <div className={`alert alert-${props.color} alert-dismissible fade show`} role="alert">
      {props.alert}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={props.onClick}></button>
    </div>
  );
};

export default AlertComponent;

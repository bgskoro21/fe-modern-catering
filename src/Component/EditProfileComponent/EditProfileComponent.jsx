import React from "react";

const EditProfileComponent = (props) => {
  return (
    <div className="row d-flex align-items-center mb-3">
      <div className="col-md-4">{props.label}</div>
      <div className="col-md-8">{props.children}</div>
    </div>
  );
};

export default EditProfileComponent;

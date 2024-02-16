import React from "react";

const TimeComponent = (props) => {
  return (
    <div className="jam-wrapper p-3 rounded bg-danger text-white d-flex align-items-center justify-content-center flex-column" style={{ width: "100px" }}>
      <span className="fs-1 fw-bold">{props.jam}</span>
      <span>{props.keterangan}</span>
    </div>
  );
};

export default TimeComponent;

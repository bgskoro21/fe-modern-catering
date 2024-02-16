import React from "react";

const FolksComponent = ({ img, nama }) => {
  return (
    <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
      <img src={img} alt="" className="img-fluid rounded-circle mb-3" style={{ width: "150px", height: "150px", objectFit: "cover" }} />
      <h4>{nama}</h4>
    </div>
  );
};

export default FolksComponent;

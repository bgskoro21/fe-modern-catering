import React from "react";

const LoadingComponent = ({ align }) => {
  return (
    <div className={`d-flex align-items-center justify-content-${align} my-4`}>
      <div className="spinner-grow bg-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow bg-danger mx-1" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow bg-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingComponent;

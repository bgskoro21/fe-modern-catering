import React from "react";

export const InputTextFloating = ({ type, id, placeholder, onChange, error = false, errorMessage, value }) => {
  return (
    <div className="mb-3">
      <input type={type} className={`form-control py-2 ${error ? "is-invalid" : ""}`} id={id} placeholder={placeholder} onChange={onChange} value={value} />
      {error && <div className="invalid-feedback">{errorMessage}</div>}
      {/* <label htmlFor={props.id}>{props.label}</label> */}
    </div>
  );
};

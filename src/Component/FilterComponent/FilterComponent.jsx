import React from "react";
import "./FilterComponent.css";

const FilterComponent = (props) => {
  return (
    <div className={`filter-wrapper border me-2 px-3 py-2 text-center ${props.selectedButton === props.id ? "filter-aktif" : ""}`} onClick={props.onClick}>
      {props.text} {props.sum ? `(${props.sum})` : ""}
    </div>
  );
};

export default FilterComponent;

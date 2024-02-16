import React from "react";

const BenefitPricing = ({ benefit }) => {
  return (
    <p className="mb-1">
      <i className="fa-solid fa-circle-check text-success" />
      &nbsp; {benefit}
    </p>
  );
};

export default BenefitPricing;

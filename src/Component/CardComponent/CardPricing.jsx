import React from "react";
import { Link } from "react-router-dom";

const CardPricing = ({ category, price, desc, children }) => {
  return (
    <div className="card w-100">
      <div className="card-body">
        <h2 className="fw-bold mb-2">Rp. {price}</h2>
        <div style={{ height: "200px", overflowY: "auto" }}>{children}</div>
        <Link to="/paket" className="btn btn-danger mt-3">
          Mulai Belanja
        </Link>
      </div>
    </div>
  );
};

export default CardPricing;

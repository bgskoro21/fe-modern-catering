import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const CartTableComponent = (props) => {
  return (
    <div className="row d-flex p-4 bg-light border">
      <div className="col-md-1 d-flex justify-content-center align-items-center">
        <input type="checkbox" onChange={props.handleCheckboxChange} checked={props.checked} />
      </div>
      <div className="col-md-4 d-flex align-items-center">
        <Link className="text-decoration-none text-dark d-flex align-items-center" to={`/detail-paket/${props.id}`}>
          <img src={props.img} alt="paket" className="img-fluid img-paket img-thumbnail" />
          &nbsp;&nbsp;
          <div className="d-flex flex-column">
            <span className="text-muted" style={{ fontSize: "12px" }}>
              {props.kategori}
            </span>
            <span className="fw-bold text-danger" style={{ fontSize: "12px" }}>
              {props.paket.toUpperCase()}
            </span>
            <span dangerouslySetInnerHTML={{ __html: props.menu }} />
          </div>
        </Link>
      </div>
      <div className="col-md-2 d-flex justify-content-center align-items-center">
        <span>{props.harga}</span>
      </div>
      <div className="col-md-2 d-flex justify-content-center align-items-center">
        <input type="number" className="form-control" min={props.min_order} value={props.amount} onChange={props.onChange} />
      </div>
      <div className="col-md-2 d-flex justify-content-center align-items-center">
        <span>{props.total}</span>
      </div>
      <div className="col-md-1 d-flex justify-content-center align-items-center">
        <i className="fa-solid fa-trash-can fs-4 text-danger" onClick={props.handleDelete} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
};

export default CartTableComponent;

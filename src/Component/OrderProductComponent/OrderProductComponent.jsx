import React from "react";

const OrderProductComponent = (props) => {
  return (
    <div className="row d-flex align-items-center mt-3">
      <div className="col-6">
        <div className="row d-flex align-items-center">
          <div className="col-7 col-md-2">
            <img src={props.gambar} alt="gambar" className="img-fluid" style={{ height: "60px", width: "60px", objectFit: "cover" }} />
          </div>
          <div className="col-5">
            <span className="text-muted">{props.kategori}</span>
            <br />
            <span className="fw-bold">{props.title.toUpperCase()}</span>
          </div>
          <div className="col-5 text-muted d-none d-md-block">
            <span dangerouslySetInnerHTML={{ __html: props.menu }} />
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="row d-block d-xl-flex justify-content-end">
          <div className="col-12 col-md-4 d-flex justify-content-end">
            <span>x{props.amount}</span>
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-end">
            <span>{props.harga}</span>
          </div>
          <div className="col-4 d-none d-md-flex justify-content-end">
            <span>{props.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProductComponent;

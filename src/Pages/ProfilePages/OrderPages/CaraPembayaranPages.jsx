import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../Component/LoadingComponent/LoadingComponent";
const CaraPembayaranPages = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});
  useEffect(() => {
    getDetailOrder();
  }, []);
  // detail order
  const getDetailOrder = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/order/" + params.id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    });
    const result = await response.json();
    setOrder(result.order);
    setLoading(false);
  };
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <>
      <section className="header">
        <div className="p-3 bg-danger text-white d-flex align-items-center">
          <Link className="text-decoration-none text-white" to="/user/purchase">
            <i className="fa-solid fa-arrow-left fs-3"></i> &nbsp;&nbsp;&nbsp;&nbsp;
          </Link>
          <span className="fw-bold fs-3 text-center">Cara Pembayaran</span>
        </div>
      </section>
      <section className="order"></section>
    </>
  );
};

export default CaraPembayaranPages;

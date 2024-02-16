import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext, UserContext } from "../../../Context";
import { LogoLoadingComponent } from "../../../Component";
import { formatRupiah, scrollToTop } from "../../../Helper";

const InvoicePages = () => {
  const { dispatch } = useContext(CartContext);
  const { dispatchUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingDownload, setLoadingDownload] = useState(false);
  useEffect(() => {
    getOrderById();
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   get data by id

  const getOrderById = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/invoice?order_id=" + id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    });
    const result = await response.json();
    console.log(result);
    if (result.status) {
      setOrder(result.invoice);
    } else {
      if (result.message === "Token is Expired") {
        Swal.fire({
          title: "Sesi Habis!",
          text: "Mohon maaf sesi anda telah habis! Silahkan login kembali!",
          confirmButtonText: "OK!",
          icon: "error",
        }).then((result) => {
          if (result.isConfirmed || result.isDenied || result.isDismissed) {
            localStorage.removeItem("auth");
            dispatch({ type: "RESET_CART" });
            dispatchUser({ type: "REMOVE_USER" });
            navigate("/auth/login");
          }
        });
      }
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    setLoadingDownload(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/print-invoice/" + id);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${order.no_invoice}_${order.order.nama_pemesan}.pdf`;
      // Simulasikan klik pada elemen anchor
      a.click();
      // Hapus objek URL setelah selesai mengunduh
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
    setLoadingDownload(false);
  };

  if (loading) {
    return <LogoLoadingComponent />;
  }
  return (
    <div className="invoice-container bg-white p-4 shadow-sm border">
      <div className="row d-flex mb-4">
        <div className="col-6">
          <Link to="/user/purchase" className="text-danger fs-3">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center">
          <button className="btn btn-primary btn-sm" onClick={handleDownload} disabled={loadingDownload}>
            <i className="fa-solid fa-download"></i>
          </button>
        </div>
      </div>
      <hr />
      <div className="row d-flex">
        <div className="col-md-6 d-flex flex-column">
          <h1 className="mb-0">Invoice</h1>
          <span className="text-muted">
            No. <strong>{order.no_invoice}</strong>
          </span>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-end">
          <img src={order.qrcode_url} alt="QrCode" className="img-fluid img-thumbnail" style={{ height: "120px", width: "120px" }} />
        </div>
      </div>
      <div className="my-4">
        <span>KEPADA</span>
        <br /> <br />
        <div className="fw-bold mt-2">{order.order.nama_pemesan.toUpperCase()}</div>
        <span>{order.order.no_telp_pemesan}</span>
        <br />
        <div style={{ maxWidth: "250px" }}>{order.order.alamat_pemesan}</div>
      </div>
      <div className="row d-flex row-invoice py-2 fw-bold">
        <div className="col-md-6">
          <span>PESANAN</span>
        </div>
        <div className="col-md-2">
          <span>HARGA</span>
        </div>
        <div className="col-md-2">
          <span>JUMLAH</span>
        </div>
        <div className="col-md-2">
          <span>TOTAL</span>
        </div>
      </div>
      {order.order.transactions.map((item, index) => (
        <React.Fragment key={index}>
          <div className="row d-flex py-2 mt-2">
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <p style={{ fontSize: "12px" }} className="mb-0">
                {item.paket_prasmanan.kategori.nama_kategori} : {item.paket_prasmanan.nama_paket}
              </p>
              <p style={{ fontSize: "12px" }} dangerouslySetInnerHTML={{ __html: item.menu }} />
            </div>
            <div className="col-md-2 d-flex align-items-center fw-bold">
              <span>{formatRupiah(item.paket_prasmanan.harga)}</span>
            </div>
            <div className="col-md-2 d-flex align-items-center fw-bold">
              <span>{item.jumlah_pesanan} porsi</span>
            </div>
            <div className="col-md-2 d-flex align-items-center fw-bold">
              <span>{formatRupiah(item.total_harga)}</span>
            </div>
          </div>
          {index > 0 && <hr />}
        </React.Fragment>
      ))}
      <div className="row d-flex row-invoice py-2 fw-bold">
        <div className="col-md-10 d-flex">
          <span>TOTAL KESELURUHAN</span>
        </div>
        <div className="col-md-2 d-flex">
          <span>{formatRupiah(order.order.total)}</span>
        </div>
      </div>
      <div className="mt-4">
        <span>DIBAYARKAN KEPADA</span>
        <br />
        <br />
        <div className="fw-bold mt-2">Chandra Abdullah A.N</div>
        <span>Pembayaran menggunakan Bank BCA</span>
      </div>
      <div className="mt-4">
        <span style={{ fontSize: "12px" }}>*Catatan</span>
        <br />
        <ol style={{ fontSize: "12px", margin: 0, padding: "0 20px" }}>
          <li>Pembayaran baru bisa dilakukan setelah pesanan disetujui!</li>
          <li>Pembayaran DP setengah dari total belanja!</li>
          <li>Pembayaran DP paling lambat 3 hari!</li>
        </ol>
      </div>
    </div>
  );
};

export default InvoicePages;

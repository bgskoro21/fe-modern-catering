import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../Component/LoadingComponent/LoadingComponent";

const DetailOrderPages = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});
  useEffect(() => {
    document.title = "Modern Catering - Detail Belanja";
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
  // Format Rupiah
  function formatRupiah(angka) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(angka);
  }
  return (
    <>
      <div className="d-flex justify-content-between p-3 bg-white border">
        <div className="button-back">
          <Link className="text-decoration-none text-dark" to="/user/purchase">
            {"< KEMBALI"}
          </Link>
        </div>
        <div className="identity-order">
          <span>NO. PESANAN. #{order.id}</span>&nbsp;|&nbsp;
          <span
            className={`${order.status === "Selesai" || order.status === "Diproses" ? "text-success" : ""} ${
              order.status === "Menunggu Persetujuan" || order.status === "Menunggu Konfirmasi DP" || order.status === "Menunggu Konfirmasi Pelunasan" ? "text-primary" : ""
            } ${order.status === "Dibatalkan" || order.status === "Ditolak" ? "text-danger" : ""} ${order.status === "Belum DP" || order.status === "Menunggu Pelunasan" ? "text-warning" : ""} fw-bold`}
          >
            {order.status}
          </span>
        </div>
      </div>
      <div className="d-flex p-3 bg-white border">
        <div className="col-md-3 d-flex flex-column">
          <span className="fw-bold">Tgl. Transaksi</span>
          <span className="fw-bold">{new Date(order.tanggal_pemesanan).toLocaleDateString()}</span>
        </div>
        <div className="col-md-3 d-flex flex-column">
          <span className="fw-bold">Tgl. Acara</span>
          <span className="fw-bold">{new Date(order.tanggal_acara).toLocaleDateString()}</span>
        </div>
        <div className="col-md-3 d-flex flex-column">
          <span className="fw-bold">Lokasi Acara</span>
          <span className="fw-bold">{order.lokasi_acara}</span>
        </div>
        <div className="col-md-3 d-flex flex-column">
          <span className="fw-bold">Catatan</span>
          <span className="fw-bold">{order.catatan !== null ? order.catatan : "-"}</span>
        </div>
      </div>
      <div className="p-3 bg-white border">
        <span>Modern Catering</span>
        <hr />
        {order.transactions.map((item, index) => (
          <React.Fragment key={index}>
            <div className="d-flex align-items-center justify-content-between my-2">
              <div className="d-flex align-items-center">
                <img src={item.paket_prasmanan.gambar_paket} alt="Photo" width={150} />
                &nbsp;
                <div className="desc d-flex flex-column">
                  <span className="text-muted">{item.paket_prasmanan.nama_paket}</span>
                  <span style={{ maxWidth: 500 }} dangerouslySetInnerHTML={{ __html: item.menu }} />
                  <span>Jumlah: {item.jumlah_pesanan}pax</span>
                </div>
              </div>
              <span className="fw-bold text-danger">{formatRupiah(item.total_harga)}</span>
            </div>
          </React.Fragment>
        ))}
        <hr />
        <span className="fs-3 fw-bold d-flex justify-content-end text-danger">TOTAL : {formatRupiah(order.total)}</span>
      </div>
    </>
  );
};

export default DetailOrderPages;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../Component/LoadingComponent/LoadingComponent";
import Swal from "sweetalert2";
import queryString from "query-string";
import moment from "moment/moment";
import "moment-duration-format";
import TimeComponent from "../../../Component/TimeComponent/TimeComponent";

const PembayaranPages = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [order, setOrder] = useState({});
  const [file, setFile] = useState(null);
  const [jumlah, setJumlah] = useState(0);
  const [preview, setPreview] = useState("");
  const [cancelTime, setCancelTime] = useState("");
  const [durationFormatted, setDurationFormatted] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [jam, setJam] = useState("");
  const [menit, setMenit] = useState("");
  const [detik, setDetik] = useState("");

  const type = queryString.parse(location.search);

  useEffect(() => {
    if (cancelTime !== "") {
      const interval = setInterval(async () => {
        const now = moment();
        const duration = moment.duration(cancelTime.diff(now));
        const durationFormatted = duration.format("H m s");
        const durationArray = durationFormatted.split(" ");
        setJam(durationArray[0]);
        setMenit(durationArray[1]);
        setDetik(durationArray[2]);
        setDurationFormatted(durationFormatted);
        console.log("Interval masih nyala");
        if (duration.asSeconds() <= 1) {
          clearInterval(interval);
          const response = await fetch("http://127.0.0.1:8000/api/cancel/" + params.id, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth")}`,
            },
          });
          const result = await response.json();
          setIsExpired(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [cancelTime]);
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
    if (result.status) {
      if (result.canceledTime !== undefined) {
        const cancelTime = moment(result.canceledTime);
        setCancelTime(cancelTime);
      }
      setOrder(result.order);
      setLoading(false);
    }
  };
  //   handle input file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setPreview(imageUrl);
  };
  //   handling submit pembayaran
  const handleSubmit = async () => {
    setLoadingSubmit(true);
    const form = new FormData();
    let url = "";
    if (type.type === "DP") {
      url += "http://127.0.0.1:8000/api/payment_dp/" + params.id;
    } else {
      url += "http://127.0.0.1:8000/api/payment_pelunasan/" + params.id;
    }
    form.append("payment_receipt", file);
    form.append("jumlah_bayar", jumlah);
    form.append("jenis_pembayaran", type.type);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
      body: form,
    });
    const result = await response.json();
    if (result.status) {
      Swal.fire({
        title: "Sukses",
        text: result.message,
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/user/purchase");
        }
      });
    }
    setLoadingSubmit(false);
  };
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <section className="p-4 rounded border">
      <div className="d-flex justify-content-center align-items-center mb-3">
        <i className="fa-solid fa-money-bill-1-wave fs-2 text-danger"></i>&nbsp;&nbsp;
        <span className="fs-2 fw-bold text-danger">Pembayaran</span>
      </div>
      <Link className="text-decoration-none text-danger" to="/user/purchase">
        <i className="fa-solid fa-arrow-left fs-3"></i>
      </Link>
      {cancelTime ? (
        isExpired ? (
          <h2 className="text-center text-danger">Waktu Habis</h2>
        ) : (
          <div className="d-flex justify-content-center align-items-center flex-column mt-2">
            <h3 className="mb-3 text-danger">Waktu Tersisa:</h3>
            <div className="d-flex">
              <TimeComponent jam={jam} keterangan="Jam" />
              <div className="me-2" />
              <TimeComponent jam={menit} keterangan="Menit" />
              <div className="ms-2" />
              <TimeComponent jam={detik} keterangan="Detik" />
            </div>
          </div>
        )
      ) : (
        ""
      )}
      {type.type === "DP" ? (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          Jumlah DP yang harus Anda bayar adalah minimal <strong>Rp. {order.total / 2}</strong> <br />
          Silahkan lakukan pembayaran DP sebelum <strong>{cancelTime.format("LLL")}</strong>
        </div>
      ) : (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          Jumlah Pelunasan yang harus Anda bayar adalah <strong>Rp. {order.payments[0].sisa}</strong>
        </div>
      )}
      <div className="row form-upload d-flex align-items-center justify-content-center mt-4">
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              <strong>Upload Bukti Pembayaran</strong>
            </label>
            <br />
            <input className="form-control" type="file" id="formFile" onChange={handleFileChange} disabled={isExpired} />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="Jumlah" className="form-label">
              {type.type === "DP" ? (
                <strong>
                  Masukkan Jumlah Bayar (Min. <strong className="text-danger">Rp. {order.total / 2}</strong>)
                </strong>
              ) : (
                <strong>
                  Masukkan Jumlah Bayar (<strong className="text-danger">Rp. {order.payments[0].sisa}</strong>)
                </strong>
              )}
            </label>
            <input className="form-control" type="number" id="Jumlah" placeholder="0" onChange={(e) => setJumlah(e.target.value)} disabled={isExpired} />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">{preview !== "" && <img src={preview} className="img-fluid rounded mb-2" width={200} />}</div>
      {loadingSubmit ? (
        <LoadingComponent />
      ) : (
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-danger px-4" onClick={handleSubmit} disabled={isExpired}>
            Kirim
          </button>
        </div>
      )}
    </section>
  );
};

export default PembayaranPages;

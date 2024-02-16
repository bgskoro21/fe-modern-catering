import React, { useContext, useEffect, useState } from "react";
import "./OrderPages.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LogoLoadingComponent, FilterComponent, RatingStarComponent, LoadingComponent } from "../../../Component";
import { CartContext, UserContext } from "../../../Context";
import { scrollToTop } from "../../../Helper";
import moment from "moment";

moment.locale("id");

const OrderPages = () => {
  const { dispatch } = useContext(CartContext);
  const { dispatchUser } = useContext(UserContext);
  const [order, setOrder] = useState([]);
  // const [detailOrder, setDetailOrder] = useState({});
  // const [loadingDetail, setLoadingDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingTesti, setLoadingTesti] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState({});
  const [search, setSearch] = useState("");
  const [testi, setTesti] = useState({});
  const [tipeModal, setTipeModal] = useState("");
  const [orderId, setOrderId] = useState(0);
  const [messageTesti, setMessageTesti] = useState("");
  const [rating, setRating] = useState(0);
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  //   side effec
  useEffect(() => {
    scrollToTop();
    document.title = "Modern Catering - Daftar Belanja";
    getOrder();
    const interval = setInterval(() => {
      getOrder();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   get Order
  const getOrder = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/myOrder", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    });
    const result = await response.json();
    if (result.status) {
      setOrder(result.orders.data);
      // if (result.data.length === 0) {
      //   setHasMore(false);
      // }

      // setPage((prevPage) => prevPage + 1);
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
  //   filter Order by Status
  const handleCategoryClick = (status) => {
    setSelectedStatus(status);
    setSelectedButton(status);
  };

  const searchOrder = (order, searchQuery) => {
    // console.log(searchQuery);
    if (!searchQuery) {
      return order;
    }
    const searchTerm = searchQuery.toLowerCase();
    return order.filter((order) => {
      const isPaketMatched = order.transactions.some((detail) => detail.paket_prasmanan.nama_paket.toLowerCase().includes(searchTerm));
      const isNomorPesananMatched = order.id.toString().includes(searchTerm);
      return isPaketMatched || isNomorPesananMatched;
    });
  };

  const filterPaketByCategory = (order, status, searchQuery) => {
    if (status === null) {
      return searchOrder(order, searchQuery);
    } else if (status === "Belum DP") {
      return searchOrder(
        order.filter((order) => order.status === status || order.status === "DP is Pending"),
        searchQuery
      );
    } else if (status === "Menunggu Pelunasan") {
      return searchOrder(
        order.filter((order) => order.status === status || order.status === "Pelunasan is Pending"),
        searchQuery
      );
    } else if (status === "Booked") {
      return searchOrder(
        order.filter((order) => order.status === status || order.status === "Book is Pending"),
        searchQuery
      );
    } else {
      return searchOrder(
        order.filter((order) => order.status === status),
        searchQuery
      );
    }
  };

  const filteredPackages = filterPaketByCategory(order, selectedStatus, search);

  // Open Snap Payment
  const handleSnap = async (id, total, type) => {
    Swal.fire({
      title: "Anda mau Bayar?",
      text: "Anda yakin ingin membayar " + type === "DP Pesanan" ? type : type === "Pelunasan" ? type : type + "?",
      icon: "question",
      confirmButtonText: "Ya",
      showCancelButton: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const form = new FormData();
          form.append("order_id", id.toString());
          form.append("gross_amount", total);
          form.append("jenis_bayar", type);
          const response = await fetch("http://127.0.0.1:8000/api/snapToken", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth")}`,
            },
            body: form,
          });
          const result = await response.json();
          console.log(result);
          window.snap.pay(result.snap_token, {
            onSuccess: function (result) {
              /* You may add your own implementation here */
              // console.log(result);
            },
            onPending: async function (result) {
              let orderId = result.order_id.split("-")[1];
              const form = new FormData();
              form.append("url", result.pdf_url);
              const response = await fetch("http://127.0.0.1:8000/api/pending/" + orderId, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("auth")}`,
                },
                body: form,
              });
              const resultPayment = await response.json();
              if (result.status) {
                Swal.fire({
                  title: "Menunggu Pembayaran",
                  message: resultPayment.message,
                  timer: 2000,
                  confirmButtonText: "OK",
                  icon: "warning",
                });
                getOrder();
              }
            },
            onError: function (result) {
              console.log(result);
            },
            onClose: function () {
              /* You may add your own implementation here */
              return false;
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  // Format Rupiah
  function formatRupiah(angka) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(angka);
  }
  // handle rating change
  const handleRatingChange = (value) => {
    setRating(value);
  };

  // validate form testimoni
  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    if (tipeModal !== "Batal") {
      if (rating === 0) {
        formIsValid = false;
        newErrors["rating"] = "Harap beri rating terlebih dahulu!";
      }
    }

    if (!messageTesti) {
      formIsValid = false;
      newErrors["message"] = "Harap isi pesan dan kesan anda terlebih dahulu!";
    }

    setError(newErrors);
    return formIsValid;
  };
  // handleSubmit Testimoni
  const handleSubmitTestimoni = async () => {
    setLoadingSubmit(true);
    if (validateForm()) {
      const form = new FormData();
      form.append("order_id", orderId);
      form.append("message", messageTesti);
      form.append("nilai", rating);
      const response = await fetch("http://127.0.0.1:8000/api/testimoni", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
        body: form,
      });
      const result = await response.json();
      if (result.status) {
        setShow(false);
        setRating(0);
        setMessageTesti("");
        setOrderId(0);
        setError({});
        Swal.fire({
          title: "Sukses!",
          text: result.message,
          icon: "success",
          timer: 2000,
        });
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
    }
    setLoadingSubmit(false);
  };
  // handle get Testimoni by Order
  const getTestimoniByOrder = async (id) => {
    setLoadingTesti(true);
    const response = await fetch("http://127.0.0.1:8000/api/show-testimoni?order_id=" + id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    });
    const result = await response.json();
    if (result.status) {
      setRating(result.testimoni.nilai);
      setTesti(result.testimoni);
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
    setLoadingTesti(false);
  };
  // Close Modal
  const handleCloseModal = () => {
    setRating(0);
    setShow(false);
    setMessageTesti("");
    setOrderId(0);
    setError({});
  };
  // handling cancel order
  const handleCancel = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoadingSubmit(true);
      const form = new FormData();
      form.append("alasan", messageTesti);
      const response = await fetch("http://127.0.0.1:8000/api/cancel/" + orderId, {
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
          timer: 2000,
          confirmButtonText: "OK",
        });
        handleCloseModal();
        getOrder();
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
    }
    setLoadingSubmit(false);
  };
  // // Modal Detail Component
  // const openModal = (id) => {
  //   // setIsModalOpen(true);
  //   getDetailOrder(id);
  //   document.body.style.overflow = "hidden";
  // };
  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setDetailOrder({});
  //   document.body.style.overflow = "auto";
  // };
  // detail order
  // const getDetailOrder = async (id) => {
  //   setLoadingDetail(true);
  //   const response = await fetch("http://127.0.0.1:8000/api/order/" + id, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("auth")}`,
  //     },
  //   });
  //   const result = await response.json();
  //   if (result.status) {
  //     setDetailOrder(result.order);
  //   } else {
  //     if (result.message === "Token is Expired") {
  //       Swal.fire({
  //         title: "Sesi Habis!",
  //         text: "Mohon maaf sesi anda telah habis! Silahkan login kembali!",
  //         confirmButtonText: "OK!",
  //         icon: "error",
  //       }).then((result) => {
  //         if (result.isConfirmed || result.isDenied || result.isDismissed) {
  //           localStorage.removeItem("auth");
  //           dispatch({ type: "RESET_CART" });
  //           dispatchUser({ type: "REMOVE_USER" });
  //           navigate("/auth/login");
  //         }
  //       });
  //     }
  //   }
  //   setLoadingDetail(false);
  // };
  return (
    <>
      {loading ? (
        <LogoLoadingComponent />
      ) : (
        <>
          <div className="row p-3 bg-white shadow-sm border d-none d-md-block">
            <ul className="d-flex justify-content-between align-items-center link-status">
              <li onClick={() => handleCategoryClick(null)} className={selectedButton === null ? "text-danger border-list" : ""}>
                Semua
              </li>
              <li onClick={() => handleCategoryClick("Menunggu Persetujuan")} className={selectedButton === "Menunggu Persetujuan" ? "text-danger border-list" : ""}>
                Menunggu
              </li>
              <li onClick={() => handleCategoryClick("Belum DP")} className={selectedButton === "Belum DP" ? "text-danger border-list" : ""}>
                Belum DP
              </li>
              <li onClick={() => handleCategoryClick("Tanggal Booked")} className={selectedButton === "Tanggal Booked" ? "text-danger border-list" : ""}>
                Tanggal Booked
              </li>
              <li onClick={() => handleCategoryClick("Booked")} className={selectedButton === "Booked" ? "text-danger border-list" : ""}>
                Booked
              </li>
              <li onClick={() => handleCategoryClick("Diproses")} className={selectedButton === "Diproses" ? "text-danger border-list" : ""}>
                Diproses
              </li>
              <li onClick={() => handleCategoryClick("Menunggu Pelunasan")} className={selectedButton === "Menunggu Pelunasan" ? "text-danger border-list" : ""}>
                Belum Lunas
              </li>
              <li onClick={() => handleCategoryClick("Selesai")} className={selectedButton === "Selesai" ? "text-danger border-list" : ""}>
                Selesai
              </li>
              <li onClick={() => handleCategoryClick("Dibatalkan")} className={selectedButton === "Dibatalkan" ? "text-danger border-list" : ""}>
                Dibatalkan
              </li>
              <li onClick={() => handleCategoryClick("Ditolak")} className={selectedButton === "Ditolak" ? "text-danger border-list" : ""}>
                Ditolak
              </li>
            </ul>
          </div>
          <div className="filter d-flex d-md-none mb-3 rounded">
            <FilterComponent selectedButton={selectedButton} onClick={() => handleCategoryClick(null)} id={null} text="Semua" />
            <FilterComponent selectedButton={selectedButton} onClick={() => handleCategoryClick("Menunggu Persetujuan")} id="Menunggu Persetujuan" text="Menunggu" />
            <FilterComponent selectedButton={selectedButton} onClick={() => handleCategoryClick("Belum DP")} id="Belum DP" text="Belum DP" />
            <FilterComponent selectedButton={selectedButton} onClick={() => handleCategoryClick("Diproses")} id="Diproses" text="Diproses" />
            <FilterComponent selectedButton={selectedButton} onClick={() => handleCategoryClick("Menunggu Pelunasan")} id="Menunggu Pelunasan" text="Menunggu Pelunasan" />
            <FilterComponent selectedButton={selectedButton} onClick={() => handleCategoryClick("Selesai")} id="Selesai" text="Selesai" />
            <FilterComponent selectedButton={selectedButton} onClick={() => handleCategoryClick("Dibatalkan")} id="Dibatalkan" text="Dibatalkan" />
            <FilterComponent selectedButton={selectedButton} onClick={() => handleCategoryClick("Ditolak")} id="Ditolak" text="Ditolak" />
          </div>
          <div className="row mt-2 mb-3 mb-md-2">
            <div className="col-12 d-none d-md-block p-0">
              <input type="text" className="form-control py-2" placeholder="Cari pesanan berdasarkan nomor pesanan atau nama paket" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="col-6 d-block d-md-none">
              <input type="text" className="form-control py-2" placeholder="Cari pesanan" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          <>
            {filteredPackages.length !== 0 ? (
              filteredPackages.map((item, index) => (
                <div className="row mt-0 mb-2 bg-white shadow-sm border" key={index}>
                  <div className="header p-3">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="d-none d-md-flex">Modern Catering | &nbsp;</span>
                        <span className="text-danger fw-bold">{`#${item.id}`}</span>
                      </div>
                      <span
                        className={`${item.status === "Selesai" && "text-success"} ${
                          item.status === "Menunggu Persetujuan" || item.status === "Menunggu Konfirmasi DP" || item.status === "Menunggu Konfirmasi Pelunasan" ? "text-primary" : ""
                        } ${item.status === "Dibatalkan" || item.status === "Ditolak" ? "text-danger" : ""} ${item.status === "Belum DP" || item.status === "Menunggu Pelunasan" ? "text-warning" : ""} fw-bold`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <hr />
                    {item.transactions.map((detail, index) => (
                      <div className="d-flex justify-content-between align-items-center mt-2" key={index}>
                        <div className="d-flex align-items-center">
                          <div className="me-2">
                            <img src={detail.paket_prasmanan.gambar_paket} alt="Mantap" className="img-fluid img-paket" />
                          </div>
                          <div className="rincian d-flex flex-column">
                            <span>{detail.paket_prasmanan.nama_paket}</span>
                            <span className="text-muted">Jumlah : {detail.jumlah_pesanan + " " + detail.paket_prasmanan.satuan}</span>
                          </div>
                        </div>
                        <span className="text-danger">{formatRupiah(detail.total_harga)}</span>
                      </div>
                    ))}
                  </div>
                  <hr />
                  <div className="footer p-3 text-end text-danger fw-bold">
                    <span className="text-total">Total Pesanan: {formatRupiah(item.total)}</span>
                    <div className="button-action mt-3 d-flex justify-content-end">
                      {item.status === "Belum DP" || item.status === "Menunggu Pelunasan" || item.status === "Tanggal Booked" ? (
                        <>
                          <button className="btn btn-outline-success" onClick={() => handleSnap(item.id, item.total, item.status === "Belum DP" || item.status === "Tanggal Booked" ? "DP Pesanan" : "Pelunasan")}>
                            {item.status === "Belum DP" || item.status === "Tanggal Booked" ? "Bayar DP" : "Bayar Pelunasan"}
                          </button>
                          &nbsp;
                          {item.status === "Belum DP" || item.status === "Tanggal Booked" ? (
                            <button className="btn btn-outline-primary" onClick={() => handleSnap(item.id, item.total, "Pelunasan")}>
                              Langsung Lunas
                            </button>
                          ) : (
                            ""
                          )}
                          &nbsp;
                          {item.status === "Belum DP" && item.total >= 5000000 ? (
                            <>
                              <button className="btn btn-outline-dark" onClick={() => handleSnap(item.id, item.total, "DP Tanggal")}>
                                DP Tanggal
                              </button>
                            </>
                          ) : (
                            ""
                          )}
                          &nbsp;
                        </>
                      ) : (
                        ""
                      )}
                      {item.pending_url !== null ? (
                        <>
                          <Link className="btn btn-outline-danger" to={item.pending_url} target="_blank">
                            Lihat Pembayaran
                          </Link>
                          &nbsp;
                        </>
                      ) : (
                        ""
                      )}
                      {/* <button className="btn btn-outline-danger" onClick={() => openModal(item.id)}>
                        Rincian Pesanan
                      </button>
                      &nbsp; */}
                      {item.status !== "Dibatalkan" && item.status !== "Ditolak" && (
                        <Link className="btn btn-outline-danger" to={"/user/purchase/invoice/" + item.id}>
                          Cetak Invoice
                        </Link>
                      )}
                      &nbsp;
                      {item.status === "Selesai" && item.dinilai.toString() === "0" && (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setShow(!show);
                            setOrderId(item.id);
                            setTipeModal("Nilai");
                          }}
                        >
                          Beri Penilaian
                        </button>
                      )}
                      {item.status === "Selesai" && item.dinilai.toString() === "1" && (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setShow(!show);
                            setOrderId(item.id);
                            setTipeModal("Lihat");
                            getTestimoniByOrder(item.id);
                          }}
                        >
                          Lihat Penilaian
                        </button>
                      )}
                      {item.status !== "Dibatalkan" && item.status !== "Selesai" && item.status !== "Pelunasan is Pending" && item.status !== "Ditolak" ? (
                        <Link
                          className="btn btn-danger"
                          onClick={() => {
                            setShow(!show);
                            setOrderId(item.id);
                            setTipeModal("Batal");
                          }}
                        >
                          Batalkan Pesanan
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div style={{ height: "80vh" }} className="row d-none d-md-flex mt-2 bg-white shadow-sm justify-content-center border align-items-center">
                  <p className="text-center">Belum Ada Pesanan!</p>
                </div>
                <div style={{ height: "40vh" }} className="d-flex justify-content-center align-items-center d-md-none">
                  <span>Belum ada pesanan!</span>
                </div>
              </>
            )}
          </>
        </>
      )}
      <div className={`custom-modal ${show ? "active" : "close"}`}>
        <div className={`modal-content-order rounded ${show ? "active" : "close"}`}>
          <div className="modal-header">
            <span className="fw-bold">{tipeModal === "Nilai" ? "Beri Penilaian Anda" : "Penilaian Anda"}</span>
            <span className="fs-3" onClick={() => handleCloseModal()} style={{ cursor: "pointer" }}>
              &times;
            </span>
          </div>
          <div className="body-modal mt-4">
            {tipeModal === "Nilai" && (
              <>
                <RatingStarComponent rating={rating} handleClick={handleRatingChange} small={false} />
                {error["rating"] && <p className="text-center">{error[rating]}</p>}
                <textarea
                  placeholder="Masukkan pesan anda..."
                  className={`form-control mt-4 ${error["message"] ? "is-invalid" : ""}`}
                  style={{ height: "150px" }}
                  onChange={(e) => setMessageTesti(e.target.value)}
                  value={messageTesti}
                  required
                ></textarea>
                {error["message"] && <div className="invalid-feedback">{error["message"]}</div>}
                {loadingSubmit ? (
                  <LoadingComponent align="center" />
                ) : (
                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmitTestimoni}>
                      Kirim
                    </button>
                  </div>
                )}
              </>
            )}
            {loadingTesti ? (
              <p className="text-center">Loading...</p>
            ) : Object.keys(testi).length !== 0 && tipeModal === "Lihat" ? (
              <>
                {testi.order.transactions.map((detail, index) => (
                  <div className="d-none d-md-flex justify-content-between align-items-center mb-4" key={index}>
                    <div className="d-flex align-items-center">
                      <div className="me-2">
                        <img src={detail.paket_prasmanan.gambar_paket} alt="Mantap" className="img-fluid img-paket" />
                      </div>
                      <div className="rincian d-flex flex-column">
                        <span>{detail.paket_prasmanan.kategori.nama_kategori}</span>
                        <span className="text-muted">{detail.paket_prasmanan.nama_paket}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <hr />
                <div className="d-flex align-items-center">
                  <img
                    src={testi.user.profile_picture ? testi.user.profile_picture : "https://tse2.mm.bing.net/th?id=OIP.rmim2jYzNpSCslo60INohQHaF9&pid=Api&P=0&h=180"}
                    alt="Profile"
                    className="img-fluid rounded-circle"
                    style={{ height: "50px", width: "50px" }}
                  />
                  &nbsp;&nbsp;
                  <div className="identity">
                    <span>{testi.user.name}</span>
                    <RatingStarComponent small={true} rating={rating} />
                    <span>{testi.message}</span>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {tipeModal === "Batal" && (
              <>
                <form onSubmit={handleCancel}>
                  <textarea
                    placeholder="Masukkan pesan anda..."
                    className={`form-control ${error["message"] ? "is-invalid" : ""}`}
                    style={{ height: "150px" }}
                    onChange={(e) => setMessageTesti(e.target.value)}
                    value={messageTesti}
                    required
                  ></textarea>
                  {error["message"] && <div className="invalid-feedback">{error["message"]}</div>}
                  {loadingSubmit ? (
                    <LoadingComponent align="center" />
                  ) : (
                    <div className="d-flex justify-content-center align-items-center mt-4">
                      <button type="submit" className="btn btn-primary">
                        Kirim
                      </button>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Modal Detail Component */}
      {/* <ModalComponent isOpen={isModalOpen}>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="fw-bold">Detail Pesanan</h3>
          <h3 className="text-danger" style={{ cursor: "pointer" }} onClick={closeModal}>
            X
          </h3>
        </div>
        <hr />
        {Object.keys(detailOrder).length > 0 ? (
          loadingDetail ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              <div className="row d-flex">
                <div className="col-12 col-md-2 d-flex flex-column">
                  <span className="fw-bold">Tanggal Pemesanan</span>
                  <span>{moment(detailOrder.tanggal_pemesanan).format("dddd, DD MMMM YYYY")}</span>
                </div>
                <div className="col-12 col-md-3 d-flex flex-column">
                  <span className="fw-bold">Waktu Acara</span>
                  <span>{moment(detailOrder.tanggal_acara).format("dddd, DD MMMM YYYY")}</span>
                  <span>
                    Pukul {detailOrder.waktu_acara} s/d {detailOrder.waktu_selesai_acara}
                  </span>
                </div>
                <div className="col-12 col-md-3 d-flex flex-column">
                  <span className="fw-bold">Alamat Acara</span>
                  <span>{detailOrder.lokasi_acara}</span>
                </div>
                <div className="col-12 col-md-3 d-flex flex-column">
                  <span className="fw-bold">Catatan</span>
                  <span>{detailOrder.catatan}</span>
                </div>
                <div className="col-12 col-md-1 d-flex flex-column align-items-start">
                  <span className="fw-bold">Status</span>
                  <span className="badge text-bg-danger">{detailOrder.status}</span>
                </div>
              </div>
              <hr />
              <div className="row d-none d-md-flex">
                <div className="col-12 col-md-3 d-flex flex-column">
                  <span className="fw-bold">Nama Pemesan</span>
                  <span className="fw-bold">No HP Pemesan</span>
                  <span className="fw-bold">Alamat Pemesan</span>
                </div>
                <div className="col-12 col-md-1 d-none d-md-flex flex-column">
                  <span className="fw-bold">:</span>
                  <span className="fw-bold">:</span>
                  <span className="fw-bold">:</span>
                </div>
                <div className="col-12 col-md-3 d-flex flex-column p-0">
                  <span>{detailOrder.nama_pemesan}</span>
                  <span>{detailOrder.no_telp_pemesan}</span>
                  <span>{detailOrder.alamat_pemesan}</span>
                </div>
              </div>
              <div className="row d-flex d-md-none">
                <div className="col-12 d-flex flex-column">
                  <span className="fw-bold">Nama Pemesan</span>
                  <span>{detailOrder.nama_pemesan}</span>
                </div>
                <div className="col-12 d-flex flex-column">
                  <span className="fw-bold">No HP Pemesan</span>
                  <span>{detailOrder.no_telp_pemesan}</span>
                </div>
                <div className="col-12 d-flex flex-column">
                  <span className="fw-bold">Alamat Pemesan</span>
                  <span>{detailOrder.alamat_pemesan}</span>
                </div>
              </div>
              <hr />
              {detailOrder.transactions.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="d-flex align-items-center justify-content-between my-2">
                    <div className="d-flex align-items-center">
                      <img src={item.paket_prasmanan.gambar_paket} alt={"Photo" + item.id} width={80} className="d-none d-md-block" />
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
              <span className="fs-3 fw-bold d-flex justify-content-end text-danger">TOTAL : {formatRupiah(detailOrder.total)}</span>
            </>
          )
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </ModalComponent> */}
      {/* End Modal Detail */}
    </>
  );
};

export default OrderPages;

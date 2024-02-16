import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { scrollToTop } from "../../Helper";
import Swal from "sweetalert2";
import { CartContext, UserContext } from "../../Context";
import { LoadingComponent, LogoLoadingComponent } from "../../Component";
import InfiniteScroll from "react-infinite-scroll-component";

const NotificationPages = () => {
  const [notifikasi, setNotifikasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useContext(CartContext);
  const { dispatchUser } = useContext(UserContext);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // // useEffect untuk melakukan pemanggilan getNotifikasi saat initialFetchCompletedNotifikasi berubah atau saat halaman berubah
  // useEffect(() => {
  //   if (isFetched) {
  //     getNotifikasi();
  //   }
  // }, [isFetched, page]);

  // // useEffect untuk menandai bahwa isFetched sudah selesai saat pertama kali dirender
  // useEffect(() => {
  //   setIsFetched(true);
  // }, []);

  useEffect(() => {
    getNotifikasi();
    scrollToTop();
    // eslint-disable-next-line
  }, []);

  const getNotifikasi = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/notifikasi?page=" + page, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      const result = await response.json();
      if (result.status) {
        const newData = result.notifikasi.data;
        setNotifikasi([...notifikasi, ...newData]);
        if (newData.length === 0) {
          setHasMore(false);
        }
        setPage(page + 1);
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
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (loading) {
    return <LogoLoadingComponent />;
  }

  return (
    <>
      <div className="notification-container">
        {notifikasi.length > 0 ? (
          <InfiniteScroll style={{ overflow: "visible" }} dataLength={notifikasi.length} next={getNotifikasi} hasMore={hasMore} loader={<LoadingComponent align="center" />}>
            {notifikasi.map((item, index) => (
              <div className="row d-flex border mb-2 p-4 bg-white shadow-sm" key={index}>
                <div className="col-12 col-md-8 d-flex flex-column justify-content-center mb-3">
                  <div className="header mb-3">
                    <strong>{item.title}</strong> - {moment(item.date).locale("id").format("DD/MM/YYYY HH.mm")}
                  </div>
                  <div className="body w-100">{item.message}</div>
                </div>
                <div className="col-12 col-md-4 d-flex justify-content-md-end align-items-center">
                  <Link className="btn btn-outline-danger" to="/user/purchase">
                    Lihat Daftar Belanja
                  </Link>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        ) : (
          <div className="bg-white d-flex justify-content-center align-items-center border shadow-sm" style={{ height: "80vh" }}>
            <h5 className="text-center">Belum ada notifikasi!</h5>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationPages;

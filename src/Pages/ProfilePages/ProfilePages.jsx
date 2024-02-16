import React, { useContext, useEffect, useState } from "react";
import "./ProfilePages.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import UserContext from "../../Context/UserContext/userContext";

const ProfilePages = () => {
  const { userState } = useContext(UserContext);
  const [isLinkVisible, setIsLinkVisible] = useState(false);
  const location = useLocation();
  const toggleLink = () => {
    setIsLinkVisible(!isLinkVisible);
  };
  useEffect(() => {
    if (location.pathname === "/user/account/profile" || location.pathname === "/user/account/password") {
      setIsLinkVisible(true);
    }
  }, [location.pathname]);
  return (
    <section className="py-4" style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="row d-flex">
          <div className="col-12 col-md-12 col-xl-3">
            <div className="d-flex profile-bio align-items-center">
              <img
                src={userState.user.profile_picture ? userState.user.profile_picture : "https://tse2.mm.bing.net/th?id=OIP.rmim2jYzNpSCslo60INohQHaF9&pid=Api&P=0&h=180"}
                alt="Mantap"
                className="img-fluid rounded-circle"
                style={{ width: "70px", height: "70px", objectFit: "cover" }}
              />
              &nbsp;&nbsp;
              <div className="bio d-flex flex-column">
                <span>
                  <strong>{userState.user.name}</strong>
                </span>
                <span>Ubah Profil</span>
              </div>
            </div>
            <hr className="mt-4" />
            <div className="link">
              <div className="akun mb-3">
                <i className="fa-regular fa-user" />
                &nbsp;&nbsp; <strong onClick={toggleLink}>Akun Saya</strong>
                {isLinkVisible && (
                  <ul className="link-akun">
                    <Link to="/user/account/profile" className={`text-decoration-none ${location.pathname === "/user/account/profile" ? "text-danger" : "text-dark"}`}>
                      <li className="mb-3">Profil</li>
                    </Link>
                    <Link to="/user/account/password" className={`text-decoration-none ${location.pathname === "/user/account/password" ? "text-danger" : "text-dark"}`}>
                      <li>Ubah Password</li>
                    </Link>
                  </ul>
                )}
              </div>
              <Link className={`text-decoration-none ${location.pathname.split("/")[2] === "purchase" ? "text-danger" : "text-dark"}`} to="/user/purchase" onClick={() => setIsLinkVisible(false)}>
                <div className="akun mb-3">
                  <i className="fa-regular fa-note-sticky"></i>
                  &nbsp;&nbsp; <strong>Pesanan Saya</strong>
                </div>
              </Link>
              <Link className={`text-decoration-none ${location.pathname.split("/")[2] === "notification" ? "text-danger" : "text-dark"}`} to="/user/notification" onClick={() => setIsLinkVisible(false)}>
                <div className="akun mb-3">
                  <i className="fa-solid fa-bell"></i>
                  &nbsp;&nbsp; <strong>Notifikasi</strong>
                </div>
              </Link>
            </div>
            <hr className="d-block d-md-none" />
          </div>
          <div className="col-12 col-md-12 col-xl-9">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePages;

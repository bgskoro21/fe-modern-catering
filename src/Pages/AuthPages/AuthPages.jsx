import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./AuthPages.css";
import { Logo } from "../../assets";
import { scrollToTop } from "../../Helper";

const AuthPages = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <section id="auth-body">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-xl-6 d-none d-xl-flex flex-column align-items-center text-white">
            <img src={Logo} alt="Gambar Logo" className="img-fluid" width={330} />
            <div className="text-center text-white mt-4">
              <h4>
                Penyedia Layanan Catering Amanah No. 1 <br /> di Bandar Lampung dan sekitarnya
              </h4>
            </div>
          </div>
          <div className="col-12 col-md-8 col-xl-6 d-flex flex-column align-items-center justify-content-center">
            <div className="card p-3 mb-3 card-auth">
              <div className="card-body">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPages;

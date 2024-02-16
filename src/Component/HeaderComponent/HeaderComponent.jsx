import React, { useContext } from "react";
import "./HeaderComponent.css";
import { NotificationContext } from "../../Context/NotificationContext/NotificationContext";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  const { notifAmount } = useContext(NotificationContext);
  return (
    <div className="headers px-4 py-2 d-none d-md-block">
      <div className="container">
        <div className="row">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <span className="text-white">Ikuti kami di</span>
              <div className="ms-2" />
              <Link aria-label="Chat on WhatsApp" to="https://wa.me/+6285369299969" target="_blank">
                <i className="fa-brands fa-whatsapp text-white" />
              </Link>
              <div className="ms-2" />
              <Link aria-label="Chat on WhatsApp" to="https://www.instagram.com/moderncatering/" target="_blank">
                <i className="fa-brands fa-instagram text-white" />
              </Link>
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-center">
              <Link to="/user/notification" className="text-decoration-none">
                <div className="d-flex align-items-center me-3 link-header text-white">
                  <i className="fa-solid fa-bell"></i>
                  {notifAmount !== 0 && (
                    <div className="amount-notifications bg-danger">
                      <span className="w-100">{notifAmount}</span>
                    </div>
                  )}
                  &nbsp;&nbsp;
                  <span className="text-white">Notifikasi</span>
                </div>
              </Link>
              <div className="d-flex align-items-center me-3 link-header">
                <i className="fa-solid fa-phone text-white icon" />
                &nbsp;&nbsp;
                <span className="text-white">Hubungi Kami</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;

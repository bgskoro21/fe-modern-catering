import React from "react";
import "./FooterComponent.css";
import { Link, useLocation } from "react-router-dom";

const FooterComponent = () => {
  const location = useLocation();
  return (
    <section id="footer" className={`py-5 px-3 ${location.pathname.split("/")[1] === "auth" ? "text-dark" : "bg-red text-white"}`}>
      <div className="container">
        {/* <div className="row d-flex">
          <div className="col-md-4">
            <div className="logo d-flex align-items-center mb-4">
              <img src={location.pathname.split("/")[1] === "auth" ? LogoRed : Logo} alt="Logo Catering" className="img-fluid rounded-circle me-3" width={50} />
              <h3>Modern Catering</h3>
            </div>
            <span className="fw-bold">Lokasi Kami</span>
            <br />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.4198610239814!2d105.296077779558!3d-5.352718593934179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c4bbc343adc9%3A0x9d7c6d7a5d4bc841!2sModern%20Catering!5e0!3m2!1sen!2sid!4v1679445723282!5m2!1sen!2sid"
              width="300"
              height="200"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi"
            />
          </div>
          <div className="col-md-4">
            <p className="fw-bold">Produk</p>
            <p>Prasmanan Porsi Kecil</p>
            <p>Prasmanan Porsi Besar</p>
            <p>Nasi Kotak</p>
          </div>
          <div className="col-md-4">
            <p className="fw-bold">Hubungi Kami</p>
            <p>+6283121288450</p>
            <p>moderncatering@gmail.com</p>
          </div>
        </div>
        <hr />
        <div className="social d-flex">
          <div className="col-md-6 d-flex align-items-center">
            <span>Dibuat dengan cinta di Lampung. Modern Catering 2022</span>
          </div>
          <div className="col-md-6 d-flex justify-content-end align-items-center">
            <span className="">Ikuti kami di</span>
            <div className="ms-2" />
            <i className="fa-brands fa-whatsapp " />
            <div className="ms-2" />
            <i className="fa-brands fa-instagram " />
            <div className="ms-2" />
            <i className="fa-brands fa-facebook " />
          </div>
        </div> */}
        <div className="row d-flex">
          <div className="col-12 col-md-3 d-flex flex-column mb-4 mb-md-0">
            <h5 className="mb-4">JAM OPERASIONAL</h5>
            <span className="mb-2">Reservasi: Setiap Hari 24 Jam</span>
            <span>Respon Admin: 08.00 - 20.00</span>
          </div>
          <div className="col-12 col-md-3 d-flex flex-column mb-4 mb-md-0">
            <h5 className="mb-4">CUSTOMER CARE</h5>
            <span className="mb-2">Aktif pada jam respon admin</span>
            <span className="mb-2">
              <i className="fa-brands fa-whatsapp"></i> +62831 21288450
            </span>
            <span>
              <i className="fa-solid fa-comment"></i> Kritik dan Saran
            </span>
          </div>
          <div className="col-12 col-md-3 d-flex flex-column mb-4 mb-md-0">
            <h5 className="mb-4">INFORMASI</h5>
            <Link to="/reservasi-pembayaran" className={location.pathname.split("/")[1] === "auth" ? "text-decoration-none text-dark" : "text-decoration-none text-white"}>
              <span className="mb-2">Reservasi dan Pembayaran</span>
            </Link>
            <span>Pembatalan dan Pengembalian Dana</span>
          </div>
          <div className="col-12 col-md-3 d-flex flex-column">
            <h5 className="mb-4">LOKASI KAMI</h5>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.4198610239814!2d105.296077779558!3d-5.352718593934179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c4bbc343adc9%3A0x9d7c6d7a5d4bc841!2sModern%20Catering!5e0!3m2!1sen!2sid!4v1679445723282!5m2!1sen!2sid"
              width="300"
              height="200"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi"
            />
          </div>
        </div>
        <hr className="mb-0" />
        <div className="row d-flex align-items-center h-100 mt-3">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <span>
              Dibuat dengan <i className="fa-solid fa-heart"></i> di Lampung. Modern Catering 2022
            </span>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-start justify-content-md-end">
            <div className="bg-white p-2 rounded">
              <img src="http://logos-download.com/wp-content/uploads/2017/03/BCA_logo_Bank_Central_Asia.png" alt="BCA" className="img-fluid" width={100} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterComponent;

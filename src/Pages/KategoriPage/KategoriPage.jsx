import React from "react";
import "./KategoriPage.css";
import { CardComponent } from "../../Component/CardComponent/CardComponent";
import { useState } from "react";
import { useEffect } from "react";
import LoadingComponent from "../../Component/LoadingComponent/LoadingComponent";

export const KategoriPage = () => {
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(true);
  // first rendering
  useEffect(() => {
    getKategori();
  }, []);
  // handle get kategori
  const getKategori = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/kategori");
    const result = await response.json();
    setKategori(result.kategori);
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <div className="p-4">
          <LoadingComponent />
        </div>
      ) : (
        <>
          <section id="title" className="hero">
            <div className="title-page d-flex justify-content-center align-items-center">
              <h1 className="fw-bold text-white text-center text-title">
                Kategori Layanan <br /> Modern Catering
              </h1>
            </div>
            {/* <div className="d-flex justify-content-center align-items-center bg-dark" style={{ height: "100vh" }}>
              <img src={} alt="" />
            </div> */}
          </section>
          <section id="plain-kategori" className="p-4">
            <div className="container">
              <div className="text-container d-flex justify-content-center mb-3">
                <h1 className="text-center text-sub">Kategori Layanan</h1>
              </div>
              <div className="d-flex justify-content-center">
                <p className="text-center" style={{ maxWidth: "800px" }}>
                  Modern Catering selalu berusaha untuk dapat memberikan pelayanan terbaik kepada pelanggan. Ayo tunggu apalagi, pesan paket untuk acaramu sekarang juga!
                </p>
              </div>
              <div className="row d-flex align-items-center mt-4">
                {kategori.map((item, index) => (
                  <div className="col-md-4 mb-2" key={index}>
                    <CardComponent img={item.gambar_kategori} title={item.nama_kategori} description={<span dangerouslySetInnerHTML={{ __html: item.description }}></span>} url={`/detail-kategori/${item.id}`} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

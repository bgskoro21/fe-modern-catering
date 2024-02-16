import React from "react";
import { CardComponent } from "../../Component/CardComponent/CardComponent";
import "./DetailKategori.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import LoadingComponent from "../../Component/LoadingComponent/LoadingComponent";

export const DetailKategori = () => {
  const [loading, setLoading] = useState(true);
  const [paket, setPaket] = useState([]);
  const [kategori, setKategori] = useState([]);
  const params = useParams();
  const getKategoriById = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/kategori/" + params.id);
    const result = await response.json();
    setKategori(result.kategori);
    setPaket(result.kategori.paket_prasmanan);
    setLoading(false);
  };
  useEffect(() => {
    getKategoriById();
  }, []);
  return (
    <>
      {loading ? (
        <div className="p-4">
          <LoadingComponent />
        </div>
      ) : (
        <>
          <section id="hero-kategori" style={{ backgroundImage: `url(${encodeURI(kategori.gambar_kategori)})` }}>
            <div className="title d-flex justify-content-center align-items-center">
              <h1 className="text-white text-title">{kategori.nama_kategori}</h1>
            </div>
          </section>
          <section id="description" className="px-3 py-5">
            <div className="container">
              <div className="d-flex justify-content-center">
                <h1 className="text-center mb-4">Deskripsi Kategori</h1>
              </div>
              <div className="text-center">
                <div dangerouslySetInnerHTML={{ __html: kategori.description }}></div>
              </div>
            </div>
          </section>
          <section id="paket" className="bg-light px-3 py-5">
            <h1 className="text-center">Daftar Paket</h1>
            <p className="text-center mb-4">Daftar paket kategori {kategori.nama_kategori}</p>
            <div className="container">
              {paket.length !== 0 ? (
                <div className="row">
                  {paket.map((item, index) => (
                    <div className="col-md-4" key={index}>
                      <CardComponent img={item.gambar_paket} title={item.nama_paket} prices={item.harga} url={`/detail-paket/${item.id}`} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center">Belum Ada Paket Kategori Ini!</p>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

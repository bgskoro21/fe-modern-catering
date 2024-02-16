import React, { useEffect, useState } from "react";
import LogoLoadingComponent from "../../Component/LoadingComponent/LogoLoadingComponent";
import { Link } from "react-router-dom";
import "./PaketPages.css";
import FilterComponent from "../../Component/FilterComponent/FilterComponent";

const PaketPages = () => {
  const [kategori, setKategori] = useState([]);
  const [paket, setPaket] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPaket();
    document.title = "Modern Catering - Halaman Paket";
    scrollToTop();
    setSortOption("Nama");
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const getPaket = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/paket-released");
    const result = await response.json();
    setPaket(result.paket);
    setKategori(result.kategori);
    setLoading(false);
  };

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
  };

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
    setSelectedButton(id);
  };
  const filterCategoryById = (kategori, id) => {
    return kategori.filter((kategori) => kategori.id === id);
  };
  const filterPaketByCategory = (paket, categoryId) => {
    if (categoryId === null) {
      return paket;
    } else {
      return paket.filter((paket) => paket.kategori_id === categoryId);
    }
  };
  const filteredPackages = filterPaketByCategory(paket, selectedCategoryId);
  const filteredCategory = filterCategoryById(kategori, selectedCategoryId);

  // Mengurutkan paket-paket berdasarkan opsi urutan yang dipilih
  const sortedPackages = filteredPackages.sort((a, b) => {
    switch (sortOption) {
      case "Nama":
        return a.nama_paket.localeCompare(b.nama_paket);
      case "NamaZ":
        return b.nama_paket.localeCompare(a.nama_paket);
      case "Harga":
        return b.harga - a.harga;
      case "HargaZ":
        return a.harga - b.harga;
      default:
        return 0;
    }
  });

  // Format Rupiah
  function formatRupiah(angka) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

    return formatter.format(angka);
  }

  if (loading) {
    return <LogoLoadingComponent />;
  }
  return (
    <section className="paket px-3 pb-4">
      <div className="container">
        <div className="row d-flex mt-4">
          <div className="col-md-3 d-none d-md-block">
            <div className="bg-white p-2 shadow-sm border">
              <h3 className="text-danger mb-4">Kategori</h3>
              <div className={`${selectedButton === null ? "text-danger" : ""} mb-3 text-kategori`} style={{ cursor: "pointer" }} onClick={() => handleCategoryClick(null)}>
                <i className="fa-solid fa-pen text-danger" />
                &nbsp; Semua Kategori ({paket.length})
              </div>
              {kategori.map((item, index) => (
                <div key={index} className={`${selectedButton === item.id ? "text-danger" : ""} mb-3 text-kategori`} style={{ cursor: "pointer" }} onClick={() => handleCategoryClick(item.id)}>
                  <i className="fa-solid fa-pen text-danger" />
                  &nbsp; {item.nama_kategori} ({item.jumlah_paket})
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-9 bg-white px-4 py-2 shadow-sm border">
            <div className="filter d-flex d-md-none mb-4 rounded">
              <FilterComponent selectedButton={selectedButton} id={null} onClick={() => handleCategoryClick(null)} text="Semua Kategori" sum={paket.length} />
              {kategori.map((item, index) => (
                <FilterComponent selectedButton={selectedButton} id={item.id} onClick={() => handleCategoryClick(item.id)} text={item.nama_kategori} sum={item.jumlah_paket} key={index} />
              ))}
            </div>
            <div className="row d-flex">
              {selectedCategoryId !== null ? (
                <>
                  <h3 className="text-danger mb-4">{filteredCategory[0].nama_kategori}</h3>
                  <span dangerouslySetInnerHTML={{ __html: filteredCategory[0].description }} className="mb-0 fw-bold" />
                </>
              ) : (
                <>
                  <h3 className="text-danger mb-4">All Category</h3>
                  <p className="mb-4 fw-bold">Modern Catering memiliki berbagai macam kategori layanan yang cocok untuk acara anda</p>
                </>
              )}
              <div className="row d-flex mb-3">
                <div className="col-12 col-md-6 d-flex align-items-center">
                  <i className="fa-solid fa-border-all fs-3 text-danger" />
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-end align-items-center p-0 mt-2 mt-md-0">
                  <span style={{ fontSize: "12px" }} className="d-none d-md-block">
                    Urutkan berdasarkan:
                  </span>
                  <select className="form-select" defaultValue={sortOption} onChange={handleSortChange}>
                    <option value="Nama">Nama (A-Z)</option>
                    <option value="NamaZ">Nama (Z-A)</option>
                    <option value="Harga">Harga (Tinggi-Rendah)</option>
                    <option value="HargaZ">Harga (Rendah-Tinggi)</option>
                  </select>
                </div>
              </div>
              <hr className="text-danger" />
              {sortedPackages.length !== 0 ? (
                sortedPackages.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="col-6 col-md-3 mb-3 mt-2">
                      <Link to={`/detail-paket/${item.id}`} className="text-decoration-none">
                        <div className="card-custom w-100 border">
                          <img src={item.gambar_paket} className="card-img-top" alt="..." />
                          <div className="card-body p-3">
                            <h6 className="card-title text-danger text-paket">{item.nama_paket}</h6>
                            <span className="text-muted kategori-text">{item.kategori.nama_kategori}</span>
                            <p className="card-text fw-bold text-dark">{formatRupiah(item.harga)}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </React.Fragment>
                ))
              ) : (
                <p className="text-center">Belum ada paket atau menu!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaketPages;

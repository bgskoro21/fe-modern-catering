import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import LoadingComponent from "../../Component/LoadingComponent/LoadingComponent";
import { LogoLoadingComponent } from "../../Component";
import { formatRupiah } from "../../Helper";

const SearchPages = () => {
  const params = new URLSearchParams(window.location.search);
  const search = params.get("keyword");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Modern Catering - Cari";
    setKeyword(search);
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSearch = async () => {
    const form = new FormData();
    form.append("keyword", search);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/search", {
        method: "POST",
        body: form,
      });
      const result = await response.json();
      console.log(result);
      setResult(result.paket);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    navigate("/search?keyword=" + keyword);
  };

  //   Sorting
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
  };

  // Mengurutkan paket-paket berdasarkan opsi urutan yang dipilih
  const sortedPackages = result.sort((a, b) => {
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

  if (loading) {
    return <LogoLoadingComponent />;
  }
  return (
    <section className="px-3 py-4" style={{ minHeight: "100vh" }}>
      <div className="container">
        <h2 className="mb-4 text-danger">Cari - {search}</h2>
        <span className="fw-bold fs-4">Kriteria Pencarian</span>
        <div className="row d-flex mt-3">
          <div className="col-12 col-md-4">
            <form role="search" className="d-flex align-items-center" onSubmit={handleSubmitSearch}>
              <input className="form-control me-2" type="search" placeholder="Cari paket atau kategori" aria-label="Search" onChange={(e) => setKeyword(e.target.value)} value={keyword} />
              <button className="btn btn-outline-danger" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="row d-flex my-3">
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
        <div className="row d-flex">
          {sortedPackages.length !== 0 ? (
            sortedPackages.map((item, index) => (
              <React.Fragment key={index}>
                <div className="col-6 col-md-3 mb-3 mt-2">
                  <Link to={`/detail-paket/${item.id}`} className="text-decoration-none">
                    <div className="card-custom w-100 border">
                      <img src={item.gambar_paket} className="card-img-top" alt="..." />
                      <div className="card-body p-3">
                        <h5 className="card-title text-danger" style={{ fontSize: "18px" }}>
                          {item.nama_paket}
                        </h5>
                        <span className="text-muted" style={{ fontSize: "12px" }}>
                          {item.nama_kategori}
                        </span>
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
    </section>
  );
};

export default SearchPages;

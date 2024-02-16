import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CardComponent = ({ img, title, description, url, prices }) => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavigate = (to) => {
    scrollToTop();
    navigate(to);
  };
  return (
    <div className="card">
      <img src={img} className="img-fluid rounded" alt="Gambar" style={{ height: "250px" }} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {prices && <h3>Rp. {prices}</h3>}
        <p className="card-text" dangerouslySetInnerHTML={{ __html: description }} />
        <Link to={url} className="btn btn-danger" onClick={() => handleNavigate(url)}>
          Lihat Selengkapnya
        </Link>
      </div>
    </div>
  );
};

export default CardComponent;

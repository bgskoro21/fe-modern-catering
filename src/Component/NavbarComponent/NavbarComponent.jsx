import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartContext from "../../Context/CartContext/CartContext";
import UserContext from "../../Context/UserContext/userContext";
import "./Navbar.css";
import { LogoRed } from "../../assets";

const NavbarComponent = () => {
  const { state, dispatch } = useContext(CartContext);
  const { userState, dispatchUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  // const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // const [isVisible, setIsVisible] = useState(true);
  // const handleScroll = () => {
  //   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //   const isMobile = window.matchMedia("(max-width: 767px)").matches;

  //   // Lakukan logika sesuai dengan kebutuhan Anda
  //   // Contoh:
  //   // setIsVisible(scrollTop > 100 && isMobile);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   // console.log(isVisible);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  // handling logout
  const handleLogout = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    });
    const result = await response.json();
    if (result.status) {
      localStorage.removeItem("auth");
      dispatch({ type: "RESET_CART" });
      dispatchUser({ type: "REMOVE_USER" });
      navigate("/auth/login");
    } else {
      localStorage.removeItem("auth");
      dispatch({ type: "RESET_CART" });
      dispatchUser({ type: "REMOVE_USER" });
      navigate("/auth/login");
    }
  };

  const handleScrollTo = (idElement) => {
    const element = document.getElementById(idElement);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const scrollPosition = window.pageYOffset || window.scrollY;
      const offsetPosition = elementPosition + scrollPosition - 70;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // animasi pengguliran halus
      });
    }
  };

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

  // handle submit search
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    // window.location.href = "/search?keyword=" + keyword;
    navigate("/search?keyword=" + keyword);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light shadow sticky-top" style={{ zIndex: 900 }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={LogoRed} alt="Logo" className="img-fluid logo" width={100} />
        </Link>
        <div className="d-flex align-items-center">
          {location.pathname !== "/" && location.pathname !== "/pricing" && location.pathname !== "/about" && location.pathname.split("/")[1] !== "auth" && location.pathname !== "/cart" ? (
            <Link to="/cart" className="text-decoration-none">
              <div className="d-flex d-md-none flex-column justify-content-center align-items-center cart-wrapper">
                <i className="fa-solid fa-cart-shopping fs-4 text-danger" />
                {state.itemCount !== 0 && (
                  <div className="count-wrapper bg-danger rounded-circle d-flex justify-content-center align-items-center">
                    <span className="text-white">{state.itemCount}</span>
                  </div>
                )}
              </div>
            </Link>
          ) : (
            ""
          )}
          &nbsp;&nbsp;&nbsp;
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className={`navbar-nav ${location.pathname === "/" || location.pathname === "/pricing" || location.pathname === "/about" || location.pathname.split("/")[1] === "auth" ? "ms-auto" : ""}`}>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/" onClick={() => handleNavigate("/")}>
                Home
              </Link>
            </li>
            {location.pathname === "/" && (
              <>
                <li className="nav-item">
                  <span className="nav-link scroll-to" onClick={() => handleScrollTo("acara")}>
                    Acara
                  </span>
                </li>
                <li className="nav-item">
                  <span className="nav-link scroll-to" onClick={() => handleScrollTo("kategori")}>
                    Produk
                  </span>
                </li>
                <li className="nav-item">
                  <span className="nav-link scroll-to" onClick={() => handleScrollTo("galeri")}>
                    Galeri
                  </span>
                </li>
                <li className="nav-item">
                  <span className="nav-link scroll-to" onClick={() => handleScrollTo("contact")}>
                    Kontak
                  </span>
                </li>
                <li className="nav-item">
                  <span className="nav-link scroll-to" onClick={() => handleScrollTo("testimoni")}>
                    Testimoni
                  </span>
                </li>
              </>
            )}
            {location.pathname.split("/")[1] !== "auth" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/pricing" onClick={() => handleNavigate("/pricing")}>
                    Daftar Harga
                  </Link>
                </li>
                {location.pathname === "/pricing" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/pricing" onClick={() => handleScrollTo("prasmanan-mini")}>
                        Prasmanan Mini
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" onClick={() => handleScrollTo("prasmanan-besar")}>
                        Prasmanan Besar
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/about" onClick={() => handleNavigate("/about")}>
                    Tentang
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/paket" onClick={() => handleNavigate("/paket")}>
                    Belanja
                  </Link>
                </li>
              </>
            )}
            {localStorage.getItem("auth") ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userState.user.name}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/user/account/profile">
                      Akun Saya
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/user/purchase">
                      Pesanan Saya
                    </Link>
                  </li>
                  <li className="d-flex justify-content-center">
                    <button className="dropdown-item" onClick={handleLogout}>
                      Log Out
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              location.pathname.split("/")[2] !== "callback" && (
                <li className="nav-item">
                  <Link className="nav-link btn btn-danger text-white" to="/auth/login">
                    <i className="fa-solid fa-right-to-bracket"></i> LOGIN
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
        {location.pathname !== "/" && location.pathname !== "/pricing" && location.pathname !== "/about" && location.pathname.split("/")[1] !== "auth" ? (
          <>
            {location.pathname !== "/cart" && (
              <Link to="/cart" className="text-decoration-none d-none d-xl-flex me-4">
                <div className="d-flex flex-column justify-content-center align-items-center cart-wrapper">
                  <i className="fa-solid fa-cart-shopping fs-4 text-danger" />
                  {state.itemCount !== 0 && (
                    <div className="count-wrapper bg-danger rounded-circle d-flex justify-content-center align-items-center">
                      <span className="text-white">{state.itemCount}</span>
                    </div>
                  )}
                </div>
              </Link>
            )}
            <form className="d-none d-xl-flex search-bar" role="search" onSubmit={handleSubmitSearch}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setKeyword(e.target.value)} />
              <button className="btn btn-outline-danger" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;

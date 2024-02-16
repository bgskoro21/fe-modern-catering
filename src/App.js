import { useContext, useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { FooterComponent, HeaderComponent, NavbarComponent, ChatWhatsAppComponent, ScrollTopButtonComponent, LogoLoadingComponent } from "./Component";
import {
  AuthPages,
  HomePage,
  PricingPages,
  About,
  PaketPages,
  DetailPaket,
  CartPage,
  CheckoutPages,
  AccountProfilePages,
  OrderPages,
  SearchPages,
  LoginPages,
  RegisterPages,
  Reset,
  ForgotPasswordPages,
  ResetPasswordPages,
  UbahPasswordPages,
  Verify,
  ProfilePages,
  LoginGoogleCallback,
  InvoicePages,
  ReservasiPembayaranPages,
} from "./Pages";
import { PrivateRoute, PrivateRouteReset, GuestRoute } from "./Routes";
import { CartContext, UserContext, LandingPageContext } from "./Context";
import NotificationPages from "./Pages/NotificationPages/NotificationPages";

function App() {
  const { dispatchUser } = useContext(UserContext);
  const { dispatch } = useContext(CartContext);
  const { setBannerData, setCategoryData, setTestimonyData } = useContext(LandingPageContext);
  const [loading, setLoading] = useState(true);
  const [loadingTestimoni, setLoadingTestimoni] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  // const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = () => {
    // setScrollTop(window.pageYOffset);
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // console.log(scrollTop);
    setIsVisible(scrollTop > 100); // Atur nilai ambang batas sesuai kebutuhan (misalnya, 100 piksel)
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // console.log(isVisible);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getTestimoni();
    if (localStorage.getItem("auth")) {
      getAuthUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get Testimoni
  const getTestimoni = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/testimoni-acc");
    const result = await response.json();
    setTestimonyData(result.testimoni);
    setCategoryData(result.paket);
    setBannerData(result.banner);
    setLoadingTestimoni(false);
  };

  // get Authenticated User
  const getAuthUser = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    });
    const result = await response.json();
    if (result.status) {
      dispatchUser({ type: "SET_USER", payload: result.user });
      dispatch({ type: "GET_ITEM", payload: result.user.cart });
    } else {
      if (result.message === "Token is Expired") {
        localStorage.removeItem("auth");
        dispatch({ type: "RESET_CART" });
        dispatchUser({ type: "REMOVE_USER" });
        navigate("/");
      }
    }
    setLoading(false);
  };

  if (loading && loadingTestimoni) {
    return <LogoLoadingComponent />;
  }

  return (
    <div className="App">
      {location.pathname.split("/")[1] !== "auth" && location.pathname.split("/")[1] !== "cara-pembayaran" ? <HeaderComponent /> : ""}
      {location.pathname.split("/")[1] !== "cara-pembayaran" && <NavbarComponent />}
      {location.pathname === "/" || location.pathname === "/pricing" || location.pathname === "/about" ? <ChatWhatsAppComponent /> : ""}
      <ScrollTopButtonComponent status={isVisible} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/detail-kategori/:id" element={<DetailKategori />} /> */}
        {/* <Route path="/kantor" element={<DetailAcara />} /> */}
        <Route path="/detail-paket/:id" element={<DetailPaket />} />
        {/* <Route path="/kategori" element={<KategoriPage />} /> */}
        <Route path="/paket" element={<PaketPages />} />
        <Route path="/search" element={<SearchPages />} />
        <Route path="/reservasi-pembayaran" element={<ReservasiPembayaranPages />} />
        {/* <Route
          path="/cara-pembayaran/:id"
          element={
            <PrivateRoute>
              <CaraPembayaranPages />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route path="/pricing" element={<PricingPages />} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPages />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPages />
            </GuestRoute>
          }
        />
        <Route
          path="/login/callback"
          element={
            <GuestRoute>
              <LoginGoogleCallback />
            </GuestRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <ProfilePages />
            </PrivateRoute>
          }
        >
          <Route path="/user/account/profile" element={<AccountProfilePages />} />
          <Route path="/user/account/password" element={<UbahPasswordPages />} />
          <Route path="/user/purchase" element={<OrderPages />} />
          <Route path="/user/notification" element={<NotificationPages />} />
          <Route path="/user/purchase/invoice/:id" element={<InvoicePages />} />
          {/* <Route path="/user/purchase/pembayaran/:id" element={<PembayaranPages />} /> */}
        </Route>
        <Route path="/auth" element={<AuthPages />}>
          <Route path="/auth/login" element={<LoginPages />} />
          <Route path="/auth/registrasi" element={<RegisterPages />} />
          <Route path="/auth/verify" element={<Verify />} />
          <Route path="/auth/forgot" element={<ForgotPasswordPages />} />
          <Route path="/auth/reset" element={<Reset />} />
          <Route
            path="/auth/resetpassword"
            element={
              <PrivateRouteReset>
                <ResetPasswordPages />
              </PrivateRouteReset>
            }
          />
        </Route>
      </Routes>
      {location.pathname !== "/cart" ? <FooterComponent /> : ""}
    </div>
  );
}

export default App;

import React, { useContext, useEffect } from "react";
import "./LoginPages.css";
import { Link, useNavigate } from "react-router-dom";
import { InputTextFloating } from "../../Component/FormComponent/FormComponent";
import { useState } from "react";
import LoadingComponent from "../../Component/LoadingComponent/LoadingComponent";
import AlertComponent from "../../Component/AlertComponent/AlertComponent";
import UserContext from "../../Context/UserContext/userContext";
import CartContext from "../../Context/CartContext/CartContext";
import LoginGoogleButtonComponent from "../../Component/LoginGoogleButtonComponent/LoginGoogleButtonComponent";

const LoginPages = () => {
  const { dispatchUser } = useContext(UserContext);
  const { dispatch } = useContext(CartContext);
  // const [loadingCallback, setLoadingCallback] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  // first rendering
  useEffect(() => {
    const emailVerified = JSON.parse(localStorage.getItem("emailVerified"));
    if (emailVerified) {
      setAlert(emailVerified.messages);
      setIsSuccess(emailVerified.status);
      localStorage.removeItem("emailVerified");
    }
    document.title = "Login sekarang untuk mulai berbelanja!";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle login
  const handleLogin = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("email", email);
    form.append("password", password);
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      body: form,
    });
    const result = await response.json();
    if (result.status) {
      navigate("/user/account/profile");
      dispatchUser({ type: "SET_USER", payload: result.user });
      dispatch({ type: "GET_ITEM", payload: result.user.cart });
      localStorage.setItem("auth", result.token);
    } else {
      setIsSuccess(result.status);
      setAlert(result.message);
    }
    setLoading(false);
  };
  // // handle Callback Login Google
  // const handleLoginCallback = async (code) => {
  //   setLoadingCallback(true);
  //   const response = await fetch("http://127.0.0.1:8000/public/api/google-callback?code=" + code);
  //   const result = await response.json();
  //   if (result.status) {
  //     navigate("/");
  //     dispatchUser({ type: "SET_USER", payload: result.user });
  //     dispatch({ type: "GET_ITEM", payload: result.user.cart });
  //     localStorage.setItem("auth", result.token);
  //   }
  //   setLoadingCallback(false);
  // };

  // if (loadingCallback) {
  //   return <p className="text-center">Loading...</p>;
  // }
  return (
    <>
      <h3 className="card-title text-center mb-4">Log In</h3>
      {alert !== "" && (
        <AlertComponent
          alert={alert}
          color={isSuccess ? "success" : "danger"}
          onClick={() => {
            setAlert("");
            setIsSuccess(false);
          }}
        />
      )}
      <InputTextFloating type="email" id="email" placeholder="Masukkan Email Anda" onChange={(e) => setEmail(e.target.value)} />
      <InputTextFloating type="password" id="password" placeholder="Masukkan Password Anda" onChange={(e) => setPassword(e.target.value)} />
      <Link to="/auth/forgot" className="text-decoration-none">
        <p className="text-end"> Lupa Password?</p>
      </Link>
      {loading ? (
        <LoadingComponent align="center" />
      ) : (
        <button className="btn btn-danger w-100 fw-bold mb-2 py-2" onClick={handleLogin} disabled={email === "" || password === ""}>
          LOGIN
        </button>
      )}
      <LoginGoogleButtonComponent text="Sign in with Google" />
      <p className="text-muted text-center">
        Belum punya akun?&nbsp;
        <Link to="/auth/registrasi" className="text-decoration-none">
          Daftar
        </Link>
      </p>
    </>
  );
};

export default LoginPages;

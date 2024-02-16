import React, { useEffect, useState } from "react";
import { InputTextFloating } from "../../Component/FormComponent/FormComponent";
import AlertComponent from "../../Component/AlertComponent/AlertComponent";
import LoadingComponent from "../../Component/LoadingComponent/LoadingComponent";
import { Link } from "react-router-dom";

const ForgotPasswordPages = () => {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [messageEmail, setMessageEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  // first rendering
  useEffect(() => {
    document.title = "Lupa Password";
  }, []);
  //   handle submit
  const handleSubmit = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("email", email);
    const response = await fetch("http://127.0.0.1:8000/api/forgot-password", {
      method: "POST",
      body: form,
    });
    const result = await response.json();
    if (result.status) {
      setEmail("");
      setAlert(result.message);
      setIsSuccess(result.status);
      setErrorEmail(false);
      setMessageEmail("");
    } else {
      if (result.hasOwnProperty("email")) {
        setErrorEmail(true);
        setMessageEmail(result.message.email);
      }
    }
    setLoading(false);
  };
  return (
    <>
      <h3 className="mb-4 text-center">Lupa Password?</h3>
      <p className="text-muted">Silahkan Masukkan Email Anda</p>
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
      <InputTextFloating type="email" id="email" label="Masukkan Email Anda" placeholder="Email" errorMessage={messageEmail} error={errorEmail} onChange={(e) => setEmail(e.target.value)} value={email} />
      {loading ? (
        <LoadingComponent align="center" />
      ) : (
        <button className="btn btn-danger w-100 py-2 fw-bold mb-4" onClick={handleSubmit} disabled={email === ""}>
          FORGOT
        </button>
      )}
      <p className="text-muted text-center">
        Sudah punya akun?&nbsp;
        <Link to="/auth/login" className="text-decoration-none">
          Login
        </Link>
      </p>
    </>
  );
};

export default ForgotPasswordPages;

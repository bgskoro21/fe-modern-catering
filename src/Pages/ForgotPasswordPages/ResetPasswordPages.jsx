import React, { useEffect, useState } from "react";
import AlertComponent from "../../Component/AlertComponent/AlertComponent";
import { InputTextFloating } from "../../Component/FormComponent/FormComponent";
import LoadingComponent from "../../Component/LoadingComponent/LoadingComponent";
import { Link } from "react-router-dom";

const ResetPasswordPages = () => {
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [messagePassword, setMessagePassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [errorPassword1, setErrorPassword1] = useState(false);
  const [messagePassword1, setMessagePassword1] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const tokenReset = localStorage.getItem("token_reset");
  const email = localStorage.getItem("email");

  useEffect(() => {
    document.title = "Reset Password";
  }, []);

  //   handle submit
  const handleSubmit = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("email", email);
    form.append("token", tokenReset);
    form.append("password", password);
    form.append("password_confirmation", password1);
    const response = await fetch("http://127.0.0.1:8000/api/reset-password", {
      method: "POST",
      body: form,
    });
    const result = await response.json();
    if (result.status) {
      setAlert(result.messages);
      setIsSuccess(result.status);
      localStorage.removeItem("email");
      localStorage.removeItem("token_reset");
      setErrorPassword(false);
      setErrorPassword1(false);
      setMessagePassword("");
      setMessagePassword1("");
    } else {
      if (result.hasOwnProperty("form_validation")) {
        setErrorPassword(result.message.hasOwnProperty("password") ? true : false);
        setErrorPassword1(result.message.hasOwnProperty("password_confirmation") ? true : false);
        setMessagePassword(result.message.hasOwnProperty("password") ? result.message.password : "");
        setMessagePassword1(result.message.hasOwnProperty("password_confirmation") ? result.message.password_confirmation : "");
      }
    }
    setLoading(false);
  };
  return (
    <>
      <h3 className="mb-4 text-center">Reset Password</h3>
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
      <InputTextFloating type="password" id="password" placeholder="Masukkan password Anda" value={password} error={errorPassword} errorMessage={messagePassword} onChange={(e) => setPassword(e.target.value)} />
      <InputTextFloating type="password" id="password1" placeholder="Ulangi Password" error={errorPassword1} errorMessage={messagePassword1} value={password1} onChange={(e) => setPassword1(e.target.value)} />
      {loading ? (
        <LoadingComponent />
      ) : (
        <button className="btn btn-danger w-100 py-2 fw-bold mb-4" onClick={handleSubmit} disabled={password === "" || password1 === ""}>
          RESET
        </button>
      )}
      <p className="text-muted">
        Sudah punya akun?
        <Link to="/auth/login" className="text-decoration-none fw-bold">
          Login Sekarang
        </Link>
      </p>
    </>
  );
};

export default ResetPasswordPages;

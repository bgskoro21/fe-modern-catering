import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { InputTextFloating } from "../../Component/FormComponent/FormComponent";
import { useState } from "react";
import LoadingComponent from "../../Component/LoadingComponent/LoadingComponent";
import AlertComponent from "../../Component/AlertComponent/AlertComponent";
import LoginGoogleButtonComponent from "../../Component/LoginGoogleButtonComponent/LoginGoogleButtonComponent";

const RegisterPages = () => {
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [messageName, setMessageName] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [messagePassword, setMessagePassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [errorPassword1, setErrorPassword1] = useState(false);
  const [messagePassword1, setMessagePassword1] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [messageEmail, setMessageEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    document.title = "Registrasi sekarang untuk mulai berbelanja!";
  }, []);

  //   handle submit
  const handleSubmit = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("password", password);
    form.append("password_confirmation", password1);

    const response = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      body: form,
    });
    const result = await response.json();
    if (!result.status) {
      if (result.hasOwnProperty("form_validation")) {
        setErrorName(result.message.hasOwnProperty("name") ? true : false);
        setErrorPassword(result.message.hasOwnProperty("password") ? true : false);
        setErrorPassword1(result.message.hasOwnProperty("password_confirmation") ? true : false);
        setErrorEmail(result.message.hasOwnProperty("email") ? true : false);
        setMessageEmail(result.message.hasOwnProperty("email") ? result.message.email : "");
        setMessageName(result.message.hasOwnProperty("name") ? result.message.name : "");
        setMessagePassword(result.message.hasOwnProperty("password") ? result.message.password : "");
        setMessagePassword1(result.message.hasOwnProperty("password_confirmation") ? result.message.password_confirmation : "");
        setPassword("");
        setPassword1("");
      }
    } else {
      setIsSuccess(result.status);
      setAlert(result.messages);
      setName("");
      setEmail("");
      setPassword("");
      setPassword1("");
      setErrorName(false);
      setErrorPassword(false);
      setErrorPassword1(false);
      setErrorEmail(false);
      setMessageEmail("");
      setMessageName("");
      setMessagePassword("");
      setMessagePassword1("");
    }
    setLoading(false);
  };
  return (
    <>
      <h3 className="text-center mb-4">Registrasi Akun</h3>
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
      <InputTextFloating type="text" id="name" placeholder="Masukkan Nama Anda" error={errorName} errorMessage={messageName} onChange={(e) => setName(e.target.value)} value={name} />
      <InputTextFloating type="email" id="email" placeholder="Masukkan Email Anda" error={errorEmail} errorMessage={messageEmail} onChange={(e) => setEmail(e.target.value)} value={email} />
      <InputTextFloating type="password" id="password" placeholder="Masukkan Password Anda" error={errorPassword} errorMessage={messagePassword} onChange={(e) => setPassword(e.target.value)} value={password} />
      <InputTextFloating type="password" id="password_confirmation" placeholder="Ulangi Password Anda" error={errorPassword1} errorMessage={messagePassword1} onChange={(e) => setPassword1(e.target.value)} value={password1} />
      {loading ? (
        <LoadingComponent align="center" />
      ) : (
        <button className="btn btn-danger w-100 py-2 fw-bold mb-2" onClick={handleSubmit} disabled={email === "" || name === "" || password === "" || password1 === ""}>
          BUAT AKUN
        </button>
      )}
      <LoginGoogleButtonComponent text="Register with Google" />
      <p className="text-muted text-center">
        Sudah Punya Akun?&nbsp;
        <Link to="/auth/login" className="text-decoration-none fw-bold">
          Login
        </Link>
      </p>
    </>
  );
};

export default RegisterPages;

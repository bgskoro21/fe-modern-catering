import React, { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import { EditProfileComponent, LoadingComponent } from "../../../Component";
import { CartContext, UserContext } from "../../../Context";
import { useNavigate } from "react-router-dom";

const UbahPasswordPages = () => {
  const { dispatchUser } = useContext(UserContext);
  const { dispatch } = useContext(CartContext);
  const [password, setPassword] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [passwordConf, setPasswordConf] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState({});
  const decode = jwtDecode(localStorage.getItem("auth"));
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Modern Catering - Ubah Password";
  }, []);
  // Validate Form Ubah Password
  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    if (!password) {
      formIsValid = false;
      newErrors["old_password"] = "Harap isi password lama terlebih dahulu!";
    }

    if (!newPassword) {
      formIsValid = false;
      newErrors["new_password"] = "Harap isi password baru terlebih dahulu!";
    } else if (newPassword.length < 8) {
      formIsValid = false;
      newErrors["new_password"] = "Password baru minimal 8 karakter!";
    }

    if (!passwordConf) {
      formIsValid = false;
      newErrors["password_conf"] = "Harap isi password konfirmasi terlebih dahulu!";
    } else if (passwordConf !== newPassword) {
      formIsValid = false;
      newErrors["password_conf"] = "Password baru dan password konfirmasi tidak sama!";
    }

    setError(newErrors);
    return formIsValid;
  };
  // handle submit change passwword
  const handleSubmit = async () => {
    setLoadingSubmit(true);
    if (validateForm()) {
      const data = {
        password: newPassword,
        oldPassword: password,
        password_confirmation: passwordConf,
      };

      const response = await fetch("http://127.0.0.1:8000/api/user/" + decode.sub, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status) {
        setPassword("");
        setPasswordConf("");
        setNewPassword("");
        Swal.fire({
          title: "Sukses",
          text: result.message,
          icon: "success",
          timer: 2000,
        });
      } else {
        if (result.message === "Token is Expired") {
          if (result.message === "Token is Expired") {
            Swal.fire({
              title: "Sesi Habis!",
              text: "Mohon maaf sesi anda telah habis! Silahkan login kembali!",
              confirmButtonText: "OK!",
              icon: "error",
            }).then((result) => {
              if (result.isConfirmed || result.isDenied || result.isDismissed) {
                localStorage.removeItem("auth");
                dispatch({ type: "RESET_CART" });
                dispatchUser({ type: "REMOVE_USER" });
                navigate("/auth/login");
              }
            });
          }
        }
      }
    }
    setLoadingSubmit(false);
  };
  return (
    <section className="p-4 bg-white border shadow-sm">
      <div className="header">
        <h4>Ubah Password</h4>
        <span>Untuk keamanan akun Anda, mohon untuk tidak menyebarkan password Anda ke orang lain.</span>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-8">
          <EditProfileComponent label="Password Saat Ini">
            <input type="password" className={`form-control ${error["old_password"] ? "is-invalid" : ""}`} onChange={(e) => setPassword(e.target.value)} />
            {error["old_password"] && <div className="invalid-feedback">{error["old_password"]}</div>}
          </EditProfileComponent>
          <EditProfileComponent label="Password Baru">
            <input type="password" className={`form-control ${error["new_password"] ? "is-invalid" : ""}`} onChange={(e) => setNewPassword(e.target.value)} />
            {error["new_password"] && <div className="invalid-feedback">{error["new_password"]}</div>}
          </EditProfileComponent>
          <EditProfileComponent label="Konfirmasi Password">
            <input type="password" className={`form-control ${error["password_conf"] ? "is-invalid" : ""}`} onChange={(e) => setPasswordConf(e.target.value)} />
            {error["password_conf"] && <div className="invalid-feedback">{error["password_conf"]}</div>}
          </EditProfileComponent>
        </div>
      </div>
      <div className="button-aja d-flex justify-content-center mt-3">
        {loadingSubmit ? (
          <LoadingComponent align="center" />
        ) : (
          <button className="btn btn-danger" onClick={handleSubmit}>
            Konfirmasi
          </button>
        )}
      </div>
    </section>
  );
};

export default UbahPasswordPages;

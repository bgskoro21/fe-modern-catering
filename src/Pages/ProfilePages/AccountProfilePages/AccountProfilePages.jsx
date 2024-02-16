import React, { useContext, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { EditProfileComponent, LoadingComponent, LogoLoadingComponent } from "../../../Component";
import { CartContext, UserContext } from "../../../Context";
import { useNavigate } from "react-router-dom";

const AccountProfilePages = () => {
  const { userState, dispatchUser } = useContext(UserContext);
  const { dispatch } = useContext(CartContext);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [nama, setNama] = useState("");
  const [notelp, setNotelp] = useState("");
  const [jk, setJK] = useState("");
  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Modern Catering - Profile Saya";
    getAuthUser();
  }, []);

  // get Authenticated User
  const getAuthUser = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    });
    const result = await response.json();
    setNama(result.user.name);
    setNotelp(result.user.no_hp !== null ? result.user.no_hp : "");
    setJK(result.user.jenis_kelamin !== null ? result.user.jenis_kelamin : "");
    setTanggal(result.user.tanggal_lahir !== null ? result.user.tanggal_lahir : "");
    setPreview(result.user.profile_picture !== null ? result.user.profile_picture : "");
    setLoading(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfile(file);
    const imgUrl = URL.createObjectURL(file);
    setPreview(imgUrl);
  };

  // handle Submit Update Profile
  const handleSubmit = async () => {
    setLoadingSubmit(true);
    const form = new FormData();
    form.append("name", nama);
    form.append("no_hp", notelp);
    form.append("jenis_kelamin", jk);
    form.append("tanggal_lahir", tanggal);
    if (profile !== null) {
      form.append("profile_picture", profile);
    }
    const response = await fetch("http://127.0.0.1:8000/api/user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
      body: form,
    });
    const result = await response.json();
    if (result.status) {
      setProfile(null);
      Swal.fire({
        title: "Sukses",
        text: result.message,
        icon: "success",
        timer: 2000,
      });
      dispatchUser({
        type: "UPDATE_USER",
        payload: {
          name: nama,
          no_hp: notelp,
          jenis_kelamin: jk,
          tanggal_lahir: tanggal,
          profile_picture: preview,
        },
      });
      setLoadingSubmit(false);
    } else {
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
  };

  if (loading) {
    return <LogoLoadingComponent />;
  }

  return (
    <section className="p-4 bg-white border shadow-sm">
      <div className="header">
        <h5>Profile Saya</h5>
        <span>Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun</span>
      </div>
      <hr />
      <div className="row d-flex">
        <div className="col-md-8 mt-3">
          <EditProfileComponent label="Nama Pengguna">
            <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} />
          </EditProfileComponent>
          <EditProfileComponent label="Email">
            <span>{userState.user.email}</span>
          </EditProfileComponent>
          <EditProfileComponent label="Nomor Telepon">
            <input type="text" className="form-control" value={notelp} onChange={(e) => setNotelp(e.target.value)} />
          </EditProfileComponent>
          <EditProfileComponent label="Jenis Kelamin">
            <div className="d-flex">
              <div className="form-check">
                <input type="radio" className="form-check-input" id="Laki-laki" value="Laki-laki" name="group" checked={jk === "Laki-laki"} onChange={(e) => setJK(e.target.value)} />
                <label htmlFor="Laki-laki" className="form-check-label">
                  Laki-laki
                </label>
              </div>
              &nbsp;&nbsp;
              <div className="form-check">
                <input type="radio" className="form-check-input" id="Perempuan" value="Perempuan" name="group" checked={jk === "Perempuan"} onChange={(e) => setJK(e.target.value)} />
                <label htmlFor="Perempuan" className="form-check-label">
                  Perempuan
                </label>
              </div>
            </div>
          </EditProfileComponent>
          <EditProfileComponent label="Tanggal Lahir">
            <input type="date" className="form-control" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
          </EditProfileComponent>
        </div>
        <div className="col-md-4 d-flex flex-column align-items-center">
          <div className="profile-wrapper rounded-circle bg-dark d-flex justify-content-center text-white align-items-center" style={{ width: "100px", height: "100px" }}>
            {preview ? (
              <img src={preview} className="img-fluid rounded-circle" alt="Profile1" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
            ) : (
              <img src="https://tse2.mm.bing.net/th?id=OIP.rmim2jYzNpSCslo60INohQHaF9&pid=Api&P=0&h=180" alt="Profile2" className="img-fluid rounded-circle" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
            )}
          </div>
          <input type="file" className="form-control d-none" ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
          <button className="btn btn-outline-dark mt-3" onClick={handleButtonClick}>
            Pilih Gambar
          </button>
          <div className="note mt-2">
            <div className="text-muted" style={{ fontSize: "12px" }}>
              Ukuran gambar: maks. 1 MB
            </div>
          </div>
        </div>
        <div className="button submit mt-3 d-flex justify-content-center">
          {loadingSubmit ? (
            <LoadingComponent align="center" />
          ) : (
            <button className="btn btn-danger" onClick={handleSubmit}>
              Simpan
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AccountProfilePages;

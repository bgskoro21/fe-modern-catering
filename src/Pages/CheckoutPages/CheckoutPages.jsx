import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { LoadingComponent, LogoLoadingComponent, OrderProductComponent } from "../../Component";
import { CartContext, UserContext } from "../../Context";
import CryptoJS from "crypto-js";

const CheckoutPages = () => {
  const { dispatchUser } = useContext(UserContext);
  const { dispatch } = useContext(CartContext);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [alamat, setAlamat] = useState("");
  const [paket, setPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catatan, setCatatan] = useState(null);
  const [nama, setNama] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [acara, setAcara] = useState("");
  const [acaraLain, setAcaraLain] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [time, setTime] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [kecamatanP, setKecamatanP] = useState("");
  const [kodePosP, setKodePosP] = useState("");
  const [kotaP, setKotaP] = useState("");
  const [kecamatanA, setKecamatanA] = useState("");
  const [kodePosA, setKodePosA] = useState("");
  const [kotaA, setKotaA] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(true);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  // Ambil query params
  const queryParams = new URLSearchParams(window.location.search);
  const selectedItemsEncrypted = queryParams.get("state") || "";
  let selectedItems = [];
  if (selectedItemsEncrypted) {
    const decrypted = CryptoJS.AES.decrypt(selectedItemsEncrypted, "secretKey").toString(CryptoJS.enc.Utf8);
    selectedItems = JSON.parse(decrypted);
  }
  let total = 0;
  // first rendering
  useEffect(() => {
    document.title = "Modern Catering - Reservasi";
    getPaket();
    scrollToTop(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToTop = (to = 200) => {
    window.scrollTo({
      top: to,
      behavior: "smooth",
    });
  };

  // penanganan perubahan input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "nama":
        setNama(value);
        break;
      case "no_hp":
        setNoTelp(value);
        break;
      case "alamat_pelanggan":
        setAlamat(value);
        break;
      case "kecamatan_pelanggan":
        setKecamatanP(value);
        break;
      case "kode_pos_pelanggan":
        setKodePosP(value);
        break;
      case "kota_pelanggan":
        setKotaP(value);
        break;
      case "alamat_acara":
        setLokasi(value);
        break;
      case "kecamatan_acara":
        setKecamatanA(value);
        break;
      case "kode_pos_acara":
        setKodePosA(value);
        break;
      case "jenis_acara":
        setAcara(value);
        if (value !== "Lainnya") {
          setAcaraLain("");
        }
        break;
      case "acara_lain":
        setAcaraLain(value);
        break;
      case "kota_acara":
        setKotaA(value);
        break;
      case "tanggal_acara":
        setTanggal(value);
        break;
      case "waktu_acara":
        setTime(value);
        break;
      case "waktu_selesai_acara":
        setTimeEnd(value);
        break;
      default:
        return false;
    }
  };

  // Validasi form front end
  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};
    if (!nama) {
      formIsValid = false;
      newErrors["nama"] = "Isi nama terlebih dahulu";
      scrollToTop();
    }

    if (!noTelp) {
      formIsValid = false;
      newErrors["no_hp"] = "Isi Nomor HP terlebih dahulu";
      scrollToTop();
    } else if (!/^\d{10,12}$/.test(noTelp)) {
      formIsValid = false;
      newErrors["no_hp"] = "Nomor HP harus valid!";
      scrollToTop();
    }

    if (!alamat) {
      formIsValid = false;
      newErrors["alamat_pelanggan"] = "Alamat anda harus diisi!";
      scrollToTop();
    }
    if (!kecamatanP) {
      formIsValid = false;
      newErrors["kecamatan_pelanggan"] = "Kecamatan anda harus diisi!";
      scrollToTop();
    }
    if (!kodePosP) {
      formIsValid = false;
      newErrors["kode_pos_pelanggan"] = "Kode Pos anda harus diisi!";
      scrollToTop();
    } else if (!/^\d{5}$/.test(kodePosP)) {
      formIsValid = false;
      newErrors["kode_pos_pelanggan"] = "Kode Pos anda harus valid!";
      scrollToTop();
    }

    if (kotaP === "") {
      formIsValid = false;
      newErrors["kota_pelanggan"] = "Kabupaten / kota anda harus diisi!";
      scrollToTop();
    }

    if (!checked) {
      if (!lokasi) {
        formIsValid = false;
        newErrors["alamat_acara"] = "Alamat acara harus diisi!";
        scrollToTop();
      }
      if (!kecamatanA) {
        formIsValid = false;
        newErrors["kecamatan_acara"] = "Kecamatan acara harus diisi!";
        scrollToTop();
      }
      if (!kodePosA) {
        formIsValid = false;
        newErrors["kode_pos_acara"] = "Kode Pos acara harus diisi!";
        scrollToTop();
      } else if (!/^\d{5}$/.test(kodePosA)) {
        formIsValid = false;
        newErrors["kode_pos_acara"] = "Kode Pos acara harus valid!";
        scrollToTop();
      }

      if (kotaA === "") {
        formIsValid = false;
        newErrors["kota_acara"] = "Kabupaten / kota acara harus diisi!";
        scrollToTop();
      }
    }

    if (acara === "") {
      formIsValid = false;
      newErrors["jenis_acara"] = "Jenis acara harus diisi!";
    } else if (acara === "Lainnya") {
      if (!acaraLain) {
        formIsValid = false;
        newErrors["acara_lain"] = "Jenis acara lain harus diisi!";
      }
    }

    if (!tanggal) {
      formIsValid = false;
      newErrors["tanggal_acara"] = "Tanggal acara harus diisi!";
    } else if (new Date(tanggal) < new Date()) {
      scrollToTop();
      formIsValid = false;
      newErrors["tanggal_acara"] = "Tanggal sudah terlewat!";
    }

    if (!time) {
      formIsValid = false;
      newErrors["waktu_acara"] = "Waktu acara harus diisi!";
    }
    if (!timeEnd) {
      formIsValid = false;
      newErrors["waktu_selesai_acara"] = "Waktu selesai acara harus diisi!";
    }

    setError(newErrors);
    return formIsValid;
  };

  // handle get Paket in selected Cart
  const getPaket = async () => {
    const form = new FormData();
    if (selectedItems.length !== 0) {
      selectedItems.forEach((item) => {
        form.append("packageIds[]", item);
      });
    } else {
      Swal.fire({
        text: "Beberapa informasi produk pesananmu telah diperbarui. Mohon kembali ke halaman keranjang dan coba lagi.",
        confirmButtonText: "OK",
      });
      setLoading(false);
    }
    const response = await fetch("http://127.0.0.1:8000/api/detail-cart", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
      body: form,
    });
    const result = await response.json();
    if (result.status) {
      setNama(result.cart[0].user.name);
      setEmail(result.cart[0].user.email);
      setNoTelp(result.cart[0].user.no_hp);
      setPaket(result.cart);
    } else {
      if (result.message === "Token is Expired") {
        Swal.fire({
          title: "Sesi Habis!",
          text: "Mohon maaf sesi anda telah habis! Silahkan login kembali!",
          confirmButtonText: "OK!",
          icon: "error",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed || result.isDenied) {
            localStorage.removeItem("auth");
            dispatch({ type: "RESET_CART" });
            dispatchUser({ type: "REMOVE_USER" });
            navigate("/auth/login");
          }
        });
      }
    }
    setLoading(false);
  };

  // handle Submit Form Checkout
  const handleSubmit = async () => {
    if (validateForm()) {
      if (isChecked1 && isChecked2) {
        setLoadingSubmit(true);
        const newAlamat = `${alamat}, ${kecamatanP}, ${kotaP}, Lampung, ID ${kodePosP}`;
        const form = new FormData();
        form.append("nama_pemesan", nama);
        form.append("no_telp_pemesan", noTelp);
        form.append("alamat_pemesan", newAlamat);
        form.append("waktu_acara", time);
        form.append("waktu_selesai_acara", timeEnd);
        if (acara !== "Lainnya") {
          form.append("jenis_acara", acara);
        } else {
          form.append("jenis_acara", acaraLain);
        }
        form.append("tanggal_acara", tanggal);
        if (checked) {
          form.append("lokasi_acara", newAlamat);
        } else {
          const newLokasi = `${lokasi}, ${kecamatanA}, ${kotaA}, Lampung, ID, ${kodePosA}`;
          form.append("lokasi_acara", newLokasi);
        }
        form.append("total", total);
        form.append("catatan", catatan);
        selectedItems.forEach((item) => {
          form.append("packagesId[]", item);
        });
        const response = await fetch("http://127.0.0.1:8000/api/checkout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
          body: form,
        });

        const result = await response.json();
        if (result.status) {
          Swal.fire({
            title: "Sukses!",
            text: result.message,
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed || result.isDenied) {
              dispatch({
                type: "RESET_SELECTED_CART",
                payload: {
                  packagesId: selectedItems,
                },
              });
              navigate("/user/purchase");
            }
          });
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
          } else {
            Swal.fire({
              title: "Gagal Checkout!",
              text: result.message,
              confirmButtonText: "OK!",
              icon: "error",
            });
          }
        }
        setLoadingSubmit(false);
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Harap baca dan setujui terms and condition terlebih dahulu!",
          confirmButtonText: "OK!",
          icon: "error",
        });
      }
    }
  };
  // Format rupiah
  // Format Rupiah
  function formatRupiah(angka) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(angka);
  }

  if (loading) {
    return <LogoLoadingComponent />;
  }
  return (
    <>
      <section id="form" className="my-4">
        {/* Judul */}
        <div className="container d-block d-md-none bg-white shadow-sm p-4 border mb-3">
          <h1>RESERVASI</h1>
        </div>
        {/* End Judul */}
        {/* Data Pribadi */}
        <div className="container bg-white shadow-sm p-4 border">
          {/* Data Pribadi */}
          <div className="d-flex flex-column">
            <span className="fw-bold">Data Pribadi Anda</span>
            <div className="row d-flex mt-2">
              <div className="col-md-2 d-flex align-items-center">
                <label>*Nama Anda</label>
              </div>
              <div className="col-md-8">
                <input type="text" className={`form-control ${error["nama"] ? "is-invalid" : ""}`} placeholder="Masukkan nama anda" name="nama" onChange={(e) => handleInputChange(e)} value={nama} />
                {error["nama"] && <div className="invalid-feedback">{error["nama"]}</div>}
              </div>
            </div>
            <div className="row d-flex mt-2">
              <div className="col-md-2 d-flex align-items-center">
                <label>*Nomor HP</label>
              </div>
              <div className="col-md-8">
                <input type="text" className={`form-control ${error["no_hp"] ? "is-invalid" : ""}`} placeholder="Masukkan nomor telepon anda" name="no_hp" onChange={(e) => handleInputChange(e)} value={noTelp} />
                {error["no_hp"] && <div className="invalid-feedback">{error["no_hp"]}</div>}
              </div>
            </div>
            <div className="row d-flex mt-2">
              <div className="col-md-2 d-flex align-items-center">
                <label>*E-mail</label>
              </div>
              <div className="col-md-8">
                <span>{email}</span>
              </div>
            </div>
          </div>
          {/* End Data Pribadi */}
          {/* Alamat Anda */}
          <div className="d-flex flex-column mt-3">
            <span className="fw-bold">Alamat Anda</span>
            <div className="row d-flex mt-2">
              <div className="col-md-2 d-flex align-items-center">
                <label>*Alamat</label>
              </div>
              <div className="col-md-8">
                <textarea
                  name="alamat_pelanggan"
                  id="alamat"
                  placeholder="Masukkan alamat lengkap anda"
                  className={`form-control ${error["alamat_pelanggan"] ? "is-invalid" : ""}`}
                  onChange={(e) => handleInputChange(e)}
                  style={{ height: "100px" }}
                  defaultValue={alamat}
                ></textarea>
                {error["alamat_pelanggan"] && <div className="invalid-feedback">{error["alamat_pelanggan"]}</div>}
              </div>
            </div>
            <div className="row d-flex mt-2">
              <div className="col-md-2 d-flex align-items-center">
                <label>*Kecamatan</label>
              </div>
              <div className="col-md-8">
                <input type="text" className={`form-control ${error["kecamatan_pelanggan"] ? "is-invalid" : ""}`} placeholder="Masukkan kecamatan anda" name="kecamatan_pelanggan" onChange={(e) => handleInputChange(e)} value={kecamatanP} />
                {error["kecamatan_pelanggan"] && <div className="invalid-feedback">{error["kecamatan_pelanggan"]}</div>}
              </div>
            </div>
            <div className="row d-flex mt-2">
              <div className="col-md-2 d-flex align-items-center">
                <label>*Kode Pos</label>
              </div>
              <div className="col-md-8">
                <input type="text" name="kode_pos_pelanggan" className={`form-control ${error["kode_pos_pelanggan"] ? "is-invalid" : ""}`} placeholder="Masukkan kode pos anda" onChange={(e) => handleInputChange(e)} value={kodePosP} />
                {error["kode_pos_pelanggan"] && <div className="invalid-feedback">{error["kode_pos_pelanggan"]}</div>}
              </div>
            </div>
            <div className="row d-flex mt-2">
              <div className="col-md-2 d-flex align-items-center">
                <label>*Wilayah / Kabupaten</label>
              </div>
              <div className="col-md-4">
                <select className={`form-select ${error["kota_pelanggan"] ? "is-invalid" : ""}`} name="kota_pelanggan" defaultValue={kotaP} onChange={(e) => handleInputChange(e)}>
                  <option value="">-- Pilih Kota/Kabupaten --</option>
                  <option value="Bandar Lampung">Bandar Lampung</option>
                  <option value="Pringsewu">Pringsewu</option>
                  <option value="Metro">Metro</option>
                  <option value="Pesawaran">Pesawaran</option>
                  <option value="Lampung Selatan">Lampung Selatan</option>
                </select>
                {error["kota_pelanggan"] && <div className="invalid-feedback">{error["kota_pelanggan"]}</div>}
              </div>
            </div>
          </div>
          {/* End Alamat Anda */}
          {/* Checkbox isSama */}
          <div className={checked ? "mt-3" : "my-3"}>
            <input type="checkbox" id="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
            &nbsp;
            <label htmlFor="checkbox" className="text-success">
              Lokasi acara dan alamat saya adalah sama
            </label>
          </div>
          {/* End Checbox */}
          {/* Lokasi Acara */}
          {!checked && (
            <div className="d-flex flex-column mt-3">
              <span className="fw-bold">Alamat Anda</span>
              <div className="row d-flex mt-2">
                <div className="col-md-2 d-flex align-items-center">
                  <label>*Alamat</label>
                </div>
                <div className="col-md-8">
                  <textarea
                    name="alamat_acara"
                    id="alamat"
                    placeholder="Masukkan alamat lengkap anda"
                    className={`form-control ${error["alamat_acara"] ? "is-invalid" : ""}`}
                    onChange={(e) => handleInputChange(e)}
                    style={{ height: "100px" }}
                    defaultValue={lokasi}
                  ></textarea>
                  {error["alamat_acara"] && <div className="invalid-feedback">{error["alamat_acara"]}</div>}
                </div>
              </div>
              <div className="row d-flex mt-2">
                <div className="col-md-2 d-flex align-items-center">
                  <label>*Kecamatan</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    className={`form-control ${error["kecamatan_acara"] ? "is-invalid" : ""}`}
                    placeholder="Masukkan kecamatan lokasi acara anda"
                    name="kecamatan_acara"
                    onChange={(e) => handleInputChange(e)}
                    value={kecamatanA}
                  />
                  {error["kecamatan_acara"] && <div className="invalid-feedback">{error["kecamatan_acara"]}</div>}
                </div>
              </div>
              <div className="row d-flex mt-2">
                <div className="col-md-2 d-flex align-items-center">
                  <label>*Kode Pos</label>
                </div>
                <div className="col-md-8">
                  <input type="text" name="kode_pos_acara" className={`form-control ${error["kode_pos_acara"] ? "is-invalid" : ""}`} placeholder="Masukkan kode pos acara anda" onChange={(e) => handleInputChange(e)} value={kodePosA} />
                  {error["kode_pos_acara"] && <div className="invalid-feedback">{error["kode_pos_acara"]}</div>}
                </div>
              </div>
              <div className="row d-flex mt-2">
                <div className="col-md-2 d-flex align-items-center">
                  <label>*Wilayah / Kabupaten</label>
                </div>
                <div className="col-md-4">
                  <select className={`form-select ${error["kota_acara"] ? "is-invalid" : ""}`} name="kota_acara" defaultValue={kotaA} onChange={(e) => handleInputChange(e)}>
                    <option value="">-- Pilih Kota/Kabupaten --</option>
                    <option value="Bandar Lampung">Bandar Lampung</option>
                    <option value="Pringsewu">Pringsewu</option>
                    <option value="Metro">Metro</option>
                    <option value="Pesawaran">Pesawaran</option>
                  </select>
                  {error["kota_acara"] && <div className="invalid-feedback">{error["kota_acara"]}</div>}
                </div>
              </div>
            </div>
          )}
          {/* End Lokasi Acara */}
        </div>
        {/* End Data Pribadi */}
        {/* Produk yang dipesan */}
        <div className="container bg-white shadow-sm p-4 mt-3 border overflow-auto">
          <div className="row d-none d-md-flex justify-content-center align-items-center">
            <div className="col-md-6">
              <h5>Produk Dipesan</h5>
            </div>
            <div className="col-2 d-flex justify-content-end">
              <span className="fw-bold">Harga Satuan</span>
            </div>
            <div className="col-2 d-flex justify-content-end">
              <span className="fw-bold">Jumlah</span>
            </div>
            <div className="col-2 d-flex justify-content-end">
              <span className="fw-bold">Subtotal Paket</span>
            </div>
          </div>
          {paket.map((item, index) => {
            total += item.total_harga;
            return (
              <OrderProductComponent
                gambar={item.paket_prasmanan.gambar_paket}
                title={item.paket_prasmanan.nama_paket}
                kategori={item.paket_prasmanan.kategori.nama_kategori}
                menu={item.menu}
                harga={formatRupiah(item.paket_prasmanan.harga)}
                amount={item.amount}
                total={formatRupiah(item.total_harga)}
                key={index}
              />
            );
          })}
          <hr />
          <div className="d-flex align-items-center justify-content-end">
            <div className="d-flex justify-content-end">
              <span className="text-muted">Total Pesanan: &nbsp;</span>
              <h5>{formatRupiah(total)}</h5>
            </div>
          </div>
        </div>
        {/* End Produuk */}
        {/* Tanggal dan Waktu */}
        <div className="container bg-white shadow-sm mt-3 p-4 border">
          <div className="d-flex flex-column">
            <span className="fw-bold mb-3">Detail Acara</span>
            <div className="row d-flex mt-2">
              <div className="col-md-2 d-flex align-items-center">
                <span>*Jenis Acara</span>
              </div>
              <div className="col-md-4">
                <select className={`form-select ${error["jenis_acara"] ? "is-invalid" : ""}`} name="jenis_acara" defaultValue={acara} onChange={(e) => handleInputChange(e)}>
                  <option value="">-- Pilih Jenis Acara --</option>
                  <option value="Pernikahan">Pernikahan</option>
                  <option value="Lamaran">Lamaran</option>
                  <option value="Wisuda">Wisuda</option>
                  <option value="Khitanan">Khitanan</option>
                  <option value="Kirim Doa">Kirim Doa</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                {acara === "Lainnya" && (
                  <>
                    <input type="text" name="acara_lain" className={`form-control mt-2 ${error["acara_lain"] ? "is-invalid" : ""}`} placeholder="Masukkan jenis acara anda" onChange={(e) => handleInputChange(e)} value={acaraLain} />
                    {error["acara_lain"] && <div className="invalid-feedback">{error["acara_lain"]}</div>}
                  </>
                )}
                {error["jenis_acara"] && <div className="invalid-feedback">{error["jenis_acara"]}</div>}
              </div>
            </div>
            <div className="row d-flex mt-2">
              <div className="col-md-2 d-flex align-items-center">
                <span>*Tanggal Acara</span>
              </div>
              <div className="col-md-4">
                <input type="date" name="tanggal_acara" className={`form-control ${error["tanggal_acara"] ? "is-invalid" : ""}`} placeholder="Masukkan nomor telepon anda" onChange={(e) => handleInputChange(e)} value={tanggal} />
                {error["tanggal_acara"] && <div className="invalid-feedback">{error["tanggal_acara"]}</div>}
              </div>
            </div>
            <div className="row d-flex mt-2">
              <div className="col-md-2 d-flex align-items-center">
                <span>*Waktu Mulai Acara</span>
              </div>
              <div className="col-md-4">
                <input type="time" name="waktu_acara" className={`form-control ${error["waktu_acara"] ? "is-invalid" : ""}`} placeholder="Masukkan nomor telepon anda" onChange={(e) => handleInputChange(e)} value={time} />
                {error["waktu_acara"] && <div className="invalid-feedback">{error["waktu_acara"]}</div>}
              </div>
            </div>
            <div className="row d-flex mt-2">
              <div className="col-md-2 d-flex align-items-center">
                <span>*Waktu Selesai Acara</span>
              </div>
              <div className="col-md-4">
                <input type="time" name="waktu_selesai_acara" className={`form-control ${error["waktu_selesai_acara"] ? "is-invalid" : ""}`} placeholder="Masukkan nomor telepon anda" onChange={(e) => handleInputChange(e)} value={timeEnd} />
                <span className="text-primary" style={{ fontSize: "12px" }}>
                  *Jika melebihi waktu selesai acara akan dikenakan charge
                </span>
                {error["waktu_selesai_acara"] && <div className="invalid-feedback">{error["waktu_selesai_acara"]}</div>}
              </div>
            </div>
          </div>
        </div>
        {/* End Tanggal dan Waktu */}
        {/* Catatan */}
        <div className="container bg-white shadow-sm mt-3 p-4 border">
          <div className="d-flex flex-column">
            <span className="fw-bold mb-3">Tambahkan Catatan Pesanan</span>
            <div className="row">
              <div className="col-md-10">
                <textarea
                  name="basing"
                  id="basing"
                  cols="30"
                  className="form-control"
                  placeholder="Pesan (Opsional) Tinggalkan pesan ke penjual misalnya jumlah item pondokkan yang dipilih, dll."
                  onChange={(e) => setCatatan(e.target.value)}
                  style={{ height: "100px" }}
                  defaultValue={catatan}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column mt-3">
            <span className="fw-bold mb-3">Terms and Condition</span>
            <label>
              <input type="checkbox" checked={isChecked1} onChange={() => setIsChecked1(!isChecked1)} />
              &nbsp;Saya menyetujui jika melebihi waktu acara dikenakan charge
            </label>
            <label>
              <input type="checkbox" checked={isChecked2} onChange={() => setIsChecked2(!isChecked2)} />
              &nbsp;Saya menyetujui dikenakan charge sebesar Rp. 300.000 jika membatalkan pesanan setelah pesanan diproses
            </label>
          </div>
          <hr />
          <div className="btn-checkout d-flex justify-content-between align-items-center">
            <Link className="btn btn-danger fw-bold py-2" to="/cart">
              KEMBALI
            </Link>
            {loadingSubmit ? (
              <LoadingComponent align="end" />
            ) : (
              <button className="btn btn-primary fw-bold py-2" onClick={handleSubmit}>
                RESERVASI
              </button>
            )}
          </div>
        </div>
        {/* End Catatan */}
      </section>
    </>
  );
};

export default CheckoutPages;

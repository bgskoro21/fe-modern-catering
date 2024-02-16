import React, { useContext, useEffect, useState } from "react";
import { CartTableComponent, ModalComponent } from "../../Component";
import { scrollToTop } from "../../Helper";
import Swal from "sweetalert2";
import CartContext from "../../Context/CartContext/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "./CartPages.css";
import CryptoJS from "crypto-js";

const CartPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { state, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  // first rendering 1
  useEffect(() => {
    scrollToTop();
  }, []);
  // first rendering
  useEffect(() => {
    document.title = "Modern Catering - Keranjang Belanja";
    calculateTotalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProducts]);
  // Hapus Keranjang
  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Paket?",
      text: "Anda yakin hapus paket ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch("http://127.0.0.1:8000/api/cart/" + id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        });
        const result = await response.json();
        if (result.status) {
          dispatch({ type: "REMOVE_ITEM", payload: id });
          Swal.fire({
            title: "Sukses",
            text: result.message,
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Gagal",
            text: result.message,
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };
  // Ubah Data Dalam Keranjang
  function handleChange(id, value) {
    // cari index paket yang akan diupdate
    const index = state.cartItems.findIndex((cart) => cart.id === id);
    let total_harga = value * state.cartItems[index].paket_prasmanan.harga;
    const hargaSebelumnya = state.cartItems[index].amount * state.cartItems[index].paket_prasmanan.harga;
    if (selectedProducts.includes(id)) {
      setTotalPrice(totalPrice - hargaSebelumnya + total_harga);
    }
    dispatch({
      type: "EDIT_ITEM",
      payload: {
        id: id,
        amount: value,
      },
    });

    // update jumlah beli di server
    updateJumlahBeli(id, value, total_harga);
  }
  // update cart
  const updateJumlahBeli = async (id, jumlah, total_harga) => {
    const response = await fetch("http://127.0.0.1:8000/api/cart/" + id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: jumlah,
        total_harga: total_harga,
      }),
    });
    const result = await response.json();
    if (!result.status) {
      if (result.message === "Token is Expired") {
        Swal.fire({
          title: "Sesi habis!",
          text: "Mohon maaf sesi anda telah habis! Silahkan login kembali!",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/auth/login");
            localStorage.removeItem("auth");
          }
        });
      }
    }
  };
  // Format Rupiah
  function formatRupiah(angka) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(angka);
  }
  // handle CheckBox Product Change
  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    // Jika checkbox master diubah
    if (id === "master") {
      setSelectedProducts(isChecked ? state.cartItems.map((cart) => cart.id) : []);
    } else {
      setSelectedProducts((prevSelectedProducts) => {
        if (isChecked) {
          return [...prevSelectedProducts, id];
        } else {
          return prevSelectedProducts.filter((idProduk) => idProduk !== id);
        }
      });
    }
  };

  // handle calculate total price
  const calculateTotalPrice = () => {
    let total = 0;
    selectedProducts.forEach((paketId) => {
      const paket = getPaketById(paketId);
      if (paket) {
        total += paket.paket_prasmanan.harga * paket.amount;
      }
    });
    setTotalPrice(total);
  };
  // handle get Produk by id
  const getPaketById = (id) => {
    return state.cartItems.find((product) => product.id === id);
  };
  // handle navigate to CheckoutPages
  const handleNavigateCheckout = () => {
    const filteredPackages = state.cartItems.filter((item) => item.amount < item.paket_prasmanan.min_order);
    if (filteredPackages.length > 0) {
      filteredPackages.forEach((item) => {
        Swal.fire({
          title: "Gagal!",
          text: `Minimal order untuk ${item.paket_prasmanan.nama_paket.toLowerCase()} adalah ${item.paket_prasmanan.min_order} porsi!`,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
    } else {
      const selected = selectedProducts;
      // Memeriksa apakah ada paket prasmanan yang dipilih
      const hasPaketPrasmanan = state.cartItems.some((item) => {
        return item.paket_prasmanan.kategori.nama_kategori === "Prasmanan" && selectedProducts.includes(item.id);
      });
      // Memeriksa apakah ada nasi kotak yang dipilih
      const hasNasiKotak = state.cartItems.some((item) => {
        return item.paket_prasmanan.kategori.nama_kategori === "Nasi Kotak" && selectedProducts.includes(item.id);
      });
      // Memeriksa apakah ada pondokkan tambahan
      const hasPondokkanTambahan = state.cartItems.some((item) => {
        return item.paket_prasmanan.kategori.nama_kategori === "Pondokkan Tambahan" && item.paket_prasmanan.nama_paket !== "Kambing Guling" && selectedProducts.includes(item.id);
      });
      // Memeriksa apakah hanya pondokkan tambahan dan kambing aqiqah yang dipilih
      const onlyPondokkanAqiqah = selectedProducts.every((id) => {
        const item = state.cartItems.find((cartItem) => cartItem.id === id);
        // console.log(item);
        return (item.paket_prasmanan.kategori.nama_kategori.includes("Pondokkan Tambahan") && item.paket_prasmanan.nama_paket !== "Kambing Guling") || item.paket_prasmanan.kategori.nama_kategori === "Kambing Aqiqah";
      });
      // Validasi jika dia mau checkout nasi kotak + pondokkan tambahan
      if (hasNasiKotak && hasPondokkanTambahan) {
        Swal.fire({
          title: "Oops!",
          text: "Anda tidak bisa mengombinasikan nasi kotak dan pondokkan tambahan!",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      // Validasi jika ada prasmanan dan nasi kotak
      if (hasNasiKotak && hasPaketPrasmanan) {
        Swal.fire({
          title: "Peringatan!",
          text: "Anda ingin memesan prasmanan dan nasi kotak? Apakah keduanya memiliki waktu dan alamat yang sama?",
          icon: "warning",
          confirmButtonText: "Ya",
          showCancelButton: true,
          cancelButtonText: "Tidak",
        }).then((result) => {
          if (result.isConfirmed) {
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(selectedProducts), "secretKey").toString();
            const params = new URLSearchParams();
            // Mengenkripsi data menggunakan AES
            params.append("state", encryptedData);
            navigate("/checkout/?" + params.toString());
          }
        });
        return;
      }
      // Validasi prasmanan
      if (!hasPaketPrasmanan && onlyPondokkanAqiqah) {
        Swal.fire({
          title: "Oops!",
          text: "Anda harus memilih paket prasmanan atau nasi kotak untuk dapat checkout pondokkan tambahan atau kambing aqiqah!",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      if (selected.length !== 0) {
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(selectedProducts), "secretKey").toString();
        const params = new URLSearchParams();
        // Mengenkripsi data menggunakan AES
        params.append("state", encryptedData);
        navigate("/checkout/?" + params.toString());
      } else {
        Swal.fire({
          title: "Gagal!",
          text: `Harap pilih paket yang ingin dipesan terlebih dahulu!`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  // handling modal open
  const openModal = (id) => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
    const filteredCart = state.cartItems.filter((item) => item.id === id);
    setDetail(filteredCart);
  };
  // handling modal closed
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
    setDetail(null);
  };
  return (
    <section id="cart" className="p-0 p-md-4" style={{ marginBottom: "100px" }}>
      {state.itemCount !== 0 ? (
        <div className="container d-none d-md-block">
          <div className="row d-flex bg-light shadow-sm p-4 mb-3 border">
            <div className="col-md-1 text-center">
              <input type="checkbox" onChange={(event) => handleCheckboxChange(event, "master")} checked={selectedProducts.length === state.cartItems.length} />
            </div>
            <div className="col-md-4">
              <span>Paket</span>
            </div>
            <div className="col-md-2 text-center">
              <span>Harga Satuan</span>
            </div>
            <div className="col-md-2 text-center">
              <span>Kuantitas</span>
            </div>
            <div className="col-md-2 text-center">
              <span>Total Harga</span>
            </div>
            <div className="col-md-1 text-center">
              <span>Aksi</span>
            </div>
          </div>

          {state.cartItems
            .slice()
            .reverse()
            .map((item, index) => {
              return (
                <CartTableComponent
                  img={item.paket_prasmanan.gambar_paket}
                  paket={item.paket_prasmanan.kategori.nama_kategori !== "Pondokkan Tambahan" ? item.paket_prasmanan.nama_paket : ""}
                  kategori={item.paket_prasmanan.kategori.nama_kategori}
                  menu={item.menu}
                  min_order={item.paket_prasmanan.min_order}
                  harga={formatRupiah(item.paket_prasmanan.harga)}
                  amount={item.amount}
                  total={formatRupiah(item.total_harga)}
                  id={item.paket_prasmanan.id}
                  key={index}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  handleDelete={() => handleDelete(item.id)}
                  handleCheckboxChange={(event) => handleCheckboxChange(event, item.id)}
                  checked={selectedProducts.includes(item.id)}
                />
              );
            })}
        </div>
      ) : (
        <div className="container d-none d-md-block">
          <div className="row d-flex align-items-center p-4 bg-light border mb-5" style={{ height: "55vh" }}>
            <h3 className="text-center">Belum ada barang di keranjang!</h3>
          </div>
        </div>
      )}
      {/* Responsive Layout */}
      <div className="container">
        {state.itemCount !== 0 ? (
          state.cartItems
            .slice()
            .reverse()
            .map((item, index) => (
              <div className="row d-flex d-md-none bg-light shadow-sm border p-2 my-2" key={index}>
                <div className="header-cart d-flex justify-content-between align-items-center px-3 mb-2">
                  <span>Modern Catering</span>
                  <div className="col-md-1 d-flex justify-content-center align-items-center">
                    <i className="fa-solid fa-trash-can fs-4 text-danger" onClick={() => handleDelete(item.id)} style={{ cursor: "pointer" }} />
                  </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-betweens">
                  <div className="col-4 d-flex align-items-center">
                    <input type="checkbox" onChange={(event) => handleCheckboxChange(event, item.id)} checked={selectedProducts.includes(item.id)} />
                    &nbsp;&nbsp;
                    <Link className="text-decoration-none" to={`/detail-paket/${item.paket_prasmanan_id}`}>
                      <img src={item.paket_prasmanan.gambar_paket} alt={"Paket" + item.id} className="img-fluid" width={80} />
                    </Link>
                  </div>
                  <div className="col-4 d-flex flex-column justify-content-center p-0">
                    <span className="text-muted" style={{ fontSize: "10px" }}>
                      {item.paket_prasmanan.kategori.nama_kategori}
                    </span>
                    <span style={{ fontSize: "12px" }}>{item.paket_prasmanan.nama_paket}</span>
                    <span className="text-danger" style={{ fontSize: "12px" }}>
                      {formatRupiah(item.paket_prasmanan.harga)}
                    </span>
                    <input type="number" className="form-control px-1 py-0" min="100" value={item.amount} onChange={(e) => handleChange(item.id, e.target.value)} />
                  </div>
                  <div className="col-4 d-flex justify-content-end align-items-center p-0">
                    <i className="fa-solid fa-eye text-primary" onClick={() => openModal(item.id)} />
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div style={{ height: "80vh" }} className="d-flex d-md-none justify-content-center align-items-center">
            Belum ada barang di keranjang!
          </div>
        )}
      </div>
      {/* End Responsive Layout */}
      {/* Detail Checkout Item */}
      <div className="d-flex checkout-wrapper flex-column border justify-content-between p-2 py-md-4 px-md-5">
        <div className="d-flex justify-content-between">
          <div className="col-5 col-md-5 d-flex align-items-center">
            <label>
              <input type="checkbox" onChange={(event) => handleCheckboxChange(event, "master")} checked={selectedProducts.length === state.cartItems.length} /> Pilih Semua ({state.itemCount})
            </label>
          </div>
          <div className="col-5 col-md-5 d-flex align-items-center justify-content-end">
            <span className="fw-bold text-total">
              Total: <span className="text-danger">{formatRupiah(totalPrice)}</span>
            </span>
            &nbsp;&nbsp;
            <button className="btn btn-danger d-none d-md-block" onClick={handleNavigateCheckout}>
              Reservasi
            </button>
          </div>
        </div>
        <button className="btn btn-danger d-block d-md-none" onClick={handleNavigateCheckout}>
          Reservasi
        </button>
      </div>
      {/* End Detail Checkout item */}
      {/* Modal Detail Responsive */}
      <ModalComponent isOpen={isModalOpen}>
        <div className="header">
          <h3 className="text-end text-danger" onClick={closeModal}>
            X
          </h3>
        </div>
        <hr />
        {detail && (
          <div className="content">
            <div className="d-flex">
              <img src={detail[0].paket_prasmanan.gambar_paket} alt="Gambar basing" className="img-fluid" width={100} />
              &nbsp;
              <div className="d-flex flex-column justify-content-end">
                <span className="text-muted">{detail[0].paket_prasmanan.kategori.nama_kategori}</span>
                <span>{detail[0].paket_prasmanan.nama_paket}</span>
                <span>Jumlah: {detail[0].amount} porsi</span>
              </div>
            </div>
            <hr />
            <span dangerouslySetInnerHTML={{ __html: detail[0].menu }} />
          </div>
        )}
      </ModalComponent>
      {/* End Modal Detail Responsive */}
    </section>
  );
};

export default CartPage;

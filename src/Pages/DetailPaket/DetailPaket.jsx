import React, { useContext, useEffect, useState } from "react";
import "./DetailPaket.css";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { LoadingComponent, LogoLoadingComponent, ModalComponent } from "../../Component";
import { CartContext, UserContext } from "../../Context";
import { scrollToTop } from "../../Helper";

const DetailPaket = () => {
  const { dispatchUser } = useContext(UserContext);
  const params = useParams();
  const [paket, setPaket] = useState({});
  const [amount, setAmount] = useState(0);
  const [errorAmount, setErrorAmount] = useState(false);
  const [messageAmount, setMessageAmount] = useState("");
  const [menu, setMenu] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubmenus, setSelectedSubmenus] = useState({});
  const [selectedPondokkan, setSelectedPondokan] = useState({});
  const [selectedDekorasi, setSelectedDekorasi] = useState({});
  const [selectedSarapan, setSelectedSarapan] = useState({});
  const [selectedPendamping, setSelectedPendamping] = useState({});
  const [selectedSayuran, setSelectedSayuran] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [option, setOption] = useState([]);
  const [catatan, setCatatan] = useState({});
  const [isTampil, setIsTampil] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledSarapan, setIsDisabledSarapan] = useState(false);
  const [loading, setLoading] = useState(true);
  // const decode = localStorage.getItem("auth") ? jwtDecode(localStorage.getItem("auth")).sub : 0;
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  // get Paket by Id
  const getPaketById = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/paket_prasmanan/" + params.id);
    const result = await response.json();
    setSelectedImage(result.paket.paket_galleries[0].gambar);
    setOption(result.paket.paket_galleries);
    setPaket(result.paket);
    setMenu(result.paket.menu_prasmanan);
    setAmount(result.paket.min_order);
    setIsDisabled(result.paket.min_order < 100);
    setLoading(false);
  };

  useEffect(() => {
    setIsDisabled(amount < 100);
    setIsDisabledSarapan(amount < 500);
  }, [amount]);

  useEffect(() => {
    getPaketById();
    return () => (document.body.style.overflowY = "auto");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // first rendering
  useEffect(() => {
    scrollToTop();
    document.title = "Modern Catering - Detail Paket";
  }, []);
  // handle submenu Change
  const handleSubmenuChange = (menuId, menuName, submenuName) => {
    if (menuName.includes("Pondokkan" || "Pondokan")) {
      if (submenuName === "Tidak Ambil") {
        setIsTampil(!true);
        setSelectedPondokan((prevState) => {
          if (prevState[menuId]?.includes("Tidak Ambil")) {
            const newState = { ...prevState };
            delete newState[menuId];
            return newState;
          } else {
            return { ...prevState, [menuId]: ["Tidak Ambil"] };
          }
        });
      } else {
        setSelectedPondokan((prevState) => {
          if (selectedPondokkan[menuId]?.includes("Tidak Ambil")) {
            return prevState;
          }
          const prevSelectedSubmenus = prevState[menuId] || [];

          if (prevSelectedSubmenus.includes(submenuName)) {
            // Jika submenu sudah dipilih sebelumnya, hapus dari daftar pilihan
            if (prevSelectedSubmenus.length !== 1) {
              return { ...prevState, [menuId]: prevSelectedSubmenus.filter((id) => id !== submenuName) };
            } else {
              const newState = { ...prevState };
              delete newState[menuId];
              return newState;
            }
          } else {
            // Jika submenu belum dipilih sebelumnya, tambahkan ke daftar pilihan
            if (prevSelectedSubmenus.length < 4) {
              return { ...prevState, [menuId]: [...prevSelectedSubmenus, submenuName] };
            } else {
              return prevState;
            }
          }
        });
      }
    } else if (menuName.includes("Dekorasi" || "Dekor")) {
      if (submenuName === "Tidak Ambil") {
        setIsTampil(!true);
        setSelectedDekorasi((prevState) => {
          if (prevState[menuId]?.includes("Tidak Ambil")) {
            const newState = { ...prevState };
            delete newState[menuId];
            return newState;
          } else {
            return { ...prevState, [menuId]: ["Tidak Ambil"] };
          }
        });
      } else {
        setSelectedDekorasi((prevState) => {
          if (selectedDekorasi[menuId]?.includes("Tidak Ambil")) {
            return prevState;
          }
          const prevSelectedDekorasi = prevState[menuId] || [];
          if (prevSelectedDekorasi.includes(submenuName)) {
            if (prevSelectedDekorasi.length !== 1) {
              return { ...prevState, [menuId]: prevSelectedDekorasi.filter((id) => id !== submenuName) };
            } else {
              const newState = { ...prevState };
              delete newState[menuId];
              return newState;
            }
          } else {
            // Jika submenu belum dipilih sebelumnya, tambahkan ke daftar pilihan
            if (prevSelectedDekorasi.length < 2) {
              return { ...prevState, [menuId]: [...prevSelectedDekorasi, submenuName] };
            } else {
              return prevState;
            }
          }
        });
      }
    } else if (menuName.includes("Sarapan")) {
      setSelectedSarapan((prevState) => {
        const prevSelectedSarapan = prevState[menuId] || "";
        if (prevSelectedSarapan === submenuName) {
          const newState = { ...prevState };
          delete newState[menuId];
          return newState;
        } else {
          return { ...prevState, [menuId]: submenuName };
        }
      });
    } else if (menuName.includes("Pendamping")) {
      setSelectedPendamping((prevState) => {
        const prevSelectedPendamping = prevState[menuId] || [];
        if (prevSelectedPendamping.includes(submenuName)) {
          if (prevSelectedPendamping.length !== 1) {
            return { ...prevState, [menuId]: prevSelectedPendamping.filter((id) => id !== submenuName) };
          } else {
            const newState = { ...prevState };
            delete newState[menuId];
            return newState;
          }
        } else {
          // Jika submenu belum dipilih sebelumnya, tambahkan ke daftar pilihan
          if (prevSelectedPendamping.length < 2) {
            return { ...prevState, [menuId]: [...prevSelectedPendamping, submenuName] };
          } else {
            return prevState;
          }
        }
      });
    } else if (menuName.includes("Sayuran")) {
      if (paket.kategori.nama_kategori.includes("Nasi Kotak", "Rice Box")) {
        if (paket.harga > 20000) {
          setSelectedSayuran((prevState) => {
            const prevSelectedSayuran = prevState[menuId] || [];
            if (prevSelectedSayuran.includes(submenuName)) {
              if (prevSelectedSayuran.length !== 1) {
                return { ...prevState, [menuId]: prevSelectedSayuran.filter((id) => id !== submenuName) };
              } else {
                const newState = { ...prevState };
                delete newState[menuId];
                return newState;
              }
            } else {
              // Jika submenu belum dipilih sebelumnya, tambahkan ke daftar pilihan
              if (prevSelectedSayuran.length < 2) {
                return { ...prevState, [menuId]: [...prevSelectedSayuran, submenuName] };
              } else {
                return prevState;
              }
            }
          });
        } else {
          setSelectedSayuran((prevState) => {
            const prevSelectedSayuran = prevState[menuId] || "";
            if (prevSelectedSayuran === submenuName) {
              const newState = { ...prevState };
              delete newState[menuId];
              return newState;
            } else {
              return { ...prevState, [menuId]: submenuName };
            }
          });
        }
      } else {
        setSelectedSayuran((prevState) => {
          const prevSelectedSayuran = prevState[menuId] || "";
          if (prevSelectedSayuran === submenuName) {
            const newState = { ...prevState };
            delete newState[menuId];
            return newState;
          } else {
            return { ...prevState, [menuId]: submenuName };
          }
        });
      }
    } else {
      setSelectedSubmenus((prevState) => {
        const prevSelectedSubmenus = prevState[menuId] || "";
        if (prevSelectedSubmenus === submenuName) {
          const newState = { ...prevState };
          delete newState[menuId];
          return newState;
        } else {
          return { ...prevState, [menuId]: submenuName };
        }
      });
    }
  };

  const handleSubmit = async () => {
    if (!localStorage.getItem("auth")) {
      navigate("/auth/login");
      return;
    }
    if (amount < paket.min_order) {
      setErrorAmount(true);
      setMessageAmount(`Minimal order dari ${paket.nama_paket.toLowerCase()} adalah ${paket.min_order} porsi!`);
      return;
    }

    setLoadingSubmit(true);
    let menu = "";
    if (paket.kategori.nama_kategori.includes("Prasmanan")) {
      const selectedSubMenuKeys = Object.keys(selectedSubmenus);

      if (paket.menu_prasmanan.some((menu) => menu.menu.includes("Pondokkan")) && paket.menu_prasmanan.some((menu) => menu.menu.includes("Dekorasi")) && paket.menu_prasmanan.some((menu) => menu.menu.includes("Sarapan"))) {
        // let jumlahMenu = 4;
        // if (paket.menu_prasmanan.some((menu) => menu.menu.includes("Pendamping"))) {
        //   jumlahMenu = 5;
        // }
        // if (paket.menu_prasmanan.length - jumlahMenu !== selectedSubMenuKeys.length) {
        //   setErrorAmount(true);
        //   setMessageAmount(`Harap pilih opsi menu terlebih dahulu!`);
        //   setLoadingSubmit(false);
        //   return;
        // }
      } else {
        if (paket.menu_prasmanan.length !== selectedSubMenuKeys.length) {
          setErrorAmount(true);
          setMessageAmount(`Harap pilih antum opsi menu terlebih dahulu!`);
          setLoadingSubmit(false);
          return;
        }
      }

      if (amount > 100 && (Object.keys(selectedPondokkan).length === 0 || Object.keys(selectedDekorasi).length === 0)) {
        setErrorAmount(true);
        setMessageAmount(`Jumlah pesanan lebih dari 100 porsi, harap pilih opsi Menu Pondokkan dan Menu Dekorasi terlebih dahulu!`);
        setLoadingSubmit(false);
        return;
      }
      const selectedSubMenuValues = Object.values(selectedSubmenus);
      const selectedSarapanValues = Object.values(selectedSarapan);
      const selectedPendampingValues = Object.values(selectedPendamping);
      const selectedSayuranValues = Object.values(selectedSayuran);
      const selectSubmenuString = selectedSubMenuValues.join(", ");
      const selectedSarapanString = selectedSarapanValues.join(", ");
      const selectedPendampingString = selectedPendampingValues.join(", ");
      const selectedSayuranString = selectedSayuranValues.join(", ");

      // Validation Menu Sayuran
      if (selectedSayuranValues.length === 0) {
        setErrorAmount(true);
        setMessageAmount(`Harap pilih menu sayuran pendamping terlebih dahulu!`);
        setLoadingSubmit(false);
        return;
      }

      // Validation Menu Pendamping
      if (paket.menu_prasmanan.some((menu) => menu.menu.includes("Pendamping")) && selectedPendampingValues.length === 0) {
        setErrorAmount(true);
        setMessageAmount(`Harap pilih menu pendamping terlebih dahulu!`);
        setLoadingSubmit(false);
        return;
      }

      // Validation Menu Sarapan
      if (amount >= 500 && selectedSarapanValues.length === 0) {
        setErrorAmount(true);
        setMessageAmount(`Pesanan anda mencapai ${amount} porsi. Silahkan pilih menu sarapan terlebih dahulu!`);
        setLoadingSubmit(false);
        return;
      }
      // Kondisi Pondokkan
      const selectedPondokkanEntries = Object.entries(selectedPondokkan);
      let selectedPondokkanString = "";
      if (selectedPondokkanEntries.length === 1) {
        const [selectedPondokkanKeys, selectedPondokkanValue] = selectedPondokkanEntries[0];
        if (selectedPondokkanValue.length === 1 && selectedPondokkanValue[0] === "Tidak Ambil") {
          const catatanPondokkan = catatan[selectedPondokkanKeys] || "";
          selectedPondokkanString += `Tidak Ambil ${catatanPondokkan ? `(${catatanPondokkan})` : "-"}`;
        } else {
          selectedPondokkanString = selectedPondokkanValue.join(", ");
        }
      }
      // Kondisi Dekorasi
      const selectedDekorasiEntries = Object.entries(selectedDekorasi);
      let selectedDekorasiString = "";
      if (selectedDekorasiEntries.length === 1) {
        const [selectedDekorasiKeys, selectedDekorasiValue] = selectedDekorasiEntries[0];
        if (selectedDekorasiValue.length === 1 && selectedDekorasiValue[0] === "Tidak Ambil") {
          const catatanDekorasi = catatan[selectedDekorasiKeys] || "";
          selectedDekorasiString += `Tidak Ambil ${catatanDekorasi ? `(${catatanDekorasi})` : ""}`;
        } else {
          selectedDekorasiString = selectedDekorasiValue.join(", ");
        }
      }
      // Hasil String
      if (!selectedDekorasiString && !selectedPondokkanString && !selectedSarapanString) {
        menu += `<strong>Menu Utama</strong>: ${selectSubmenuString}, ${selectedSayuranString}, ${selectedPendampingString}`;
      } else if (selectedDekorasiString && selectedPondokkanString && !selectedSarapanString) {
        menu += `<strong>Menu Utama</strong>: ${selectSubmenuString}, ${selectedSayuranString}, ${selectedPendampingString}<br/> <strong>Menu Pondokkan</strong>: ${selectedPondokkanString}<br/><strong>Dekorasi</strong>: ${selectedDekorasiString}`;
      } else {
        menu += `<strong>Menu Utama</strong>: ${selectSubmenuString}, ${selectedSayuranString}, ${selectedPendampingString}<br/> <strong>Menu Pondokkan</strong>: ${selectedPondokkanString}<br/><strong>Dekorasi</strong>: ${selectedDekorasiString}<br/><strong>Menu Sarapan:</strong> ${selectedSarapanString}`;
      }
      // End Hasil
    } else if (paket.kategori.nama_kategori.includes("Nasi Kotak", "Rice Box")) {
      if (paket.nama_paket.includes("Nasi Kotak Mini")) {
        menu += paket.description;
      } else {
        const selectedSubMenuValues = Object.values(selectedSubmenus);
        const selectedSayuranValues = Object.values(selectedSayuran);
        const selectSubmenuString = selectedSubMenuValues.join(", ");
        const selectSayuranString = selectedSayuranValues.join(", ");
        if (paket.menu_prasmanan.some((menu) => menu.menu.includes("Sayuran"))) {
          if (selectedSubMenuValues.length !== paket.menu_prasmanan.length - 1) {
            setErrorAmount(true);
            setMessageAmount(`Harap lengkapi menu terlebih dahulu!`);
            setLoadingSubmit(false);
            return;
          }
        }
        // Validation Sub Menu
        if (!selectSubmenuString) {
          setErrorAmount(true);
          setMessageAmount(`Harap pilih menu terlebih dahulu!`);
          setLoadingSubmit(false);
          return;
        }
        // Validation Sayuran
        if (!selectSayuranString) {
          setErrorAmount(true);
          setMessageAmount(`Harap pilih menu sayuran terlebih dahulu!`);
          setLoadingSubmit(false);
          return;
        }
        menu += `<strong>Menu:</strong> ${selectSubmenuString}, ${selectSayuranString}`;
      }
    } else if (paket.kategori.nama_kategori.includes("Kambing Aqiqah", "Aqiqah")) {
      const selectedSubMenuValues = Object.values(selectedSubmenus);
      const selectSubmenuString = selectedSubMenuValues.join(", ");
      // const selectSubmenuString = `<ol>${selectedSubMenuValues.map((value) => `<li>${value}</li>`).join("")}</ol>`;
      if (paket.menu_prasmanan.length !== selectedSubMenuValues.length) {
        setErrorAmount(true);
        setMessageAmount(`Harap lengkapi menu olahan terlebih dahulu!`);
        setLoadingSubmit(false);
        return;
      }
      menu += `<strong>Menu Olahan:</strong> ${selectSubmenuString}`;
    } else {
      menu += paket.nama_paket;
    }
    const form = new FormData();
    form.append("paket_prasmanan_id", params.id);
    // form.append("user_id", decode);
    form.append("amount", amount);
    form.append("harga", paket.harga);
    form.append("menu", menu);
    const response = await fetch("http://127.0.0.1:8000/api/cart", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
      body: form,
    });
    const result = await response.json();
    setLoadingSubmit(false);
    if (result.status) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: result.id,
          paket_prasmanan_id: params.id,
          paket_prasmanan: paket,
          amount: amount,
          menu: menu,
          total_harga: paket.harga * amount,
        },
      });
      Swal.fire({
        title: "Sukses",
        icon: "success",
        text: result.message,
        showCancelButton: true,
        confirmButtonText: "Lihat Keranjang",
        cancelButtonText: "Lanjut Belanja",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/cart");
        } else {
          navigate("/paket");
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
      }
    }
    setLoadingSubmit(false);
    setIsModalOpen(false);
  };

  // Scroll Modal Disable Enable
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflowY = "auto";
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflowY = "hidden";
  };

  // Transisi
  useEffect(() => {
    setIsTransitioning(true);

    const transitionTimeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Waktu transisi fade, sesuaikan dengan kebutuhan

    return () => {
      clearTimeout(transitionTimeout);
    };
  }, [selectedImage]);

  // Handle key Down

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        // Tekan tombol kiri
        const currentIndex = option.findIndex((item) => item.gambar === selectedImage);
        if (currentIndex !== 0) {
          const previousIndex = (currentIndex - 1 + option.length) % option.length;
          setSelectedImage(option[previousIndex].gambar);
        }
      } else if (event.key === "ArrowRight") {
        // Tekan tombol kanan
        const currentIndex = option.findIndex((item) => item.gambar === selectedImage);
        const lastIndex = option.length - 1;

        if (currentIndex !== lastIndex) {
          const nextIndex = (currentIndex + 1) % option.length;
          setSelectedImage(option[nextIndex].gambar);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, option]);

  // Format Rupiah
  // Format Rupiah
  function formatRupiah(angka) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(angka);
  }

  // handle ctatan
  const handleCatatanChange = (event, menuId) => {
    const value = event.target.value;
    setCatatan((prevState) => ({
      ...prevState,
      [menuId]: value,
    }));
  };

  if (loading) {
    return <LogoLoadingComponent />;
  }
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <section id="paket" className="p-0 p-md-4">
          <div className="container">
            <div className="row d-flex">
              <div className="col-md-7 column-gambar d-flex flex-column">
                <div className="large-img">
                  <img src={encodeURI(selectedImage)} alt="Photo0" className={`img-fluid img-hero shadow mb-2 ${isTransitioning ? "fade-in" : ""}`} />
                </div>
                <div className="option-wrapper mb-2">
                  {option.map((item, index) => (
                    <React.Fragment key={index}>
                      <img
                        src={encodeURI(item.gambar)}
                        alt={`Gambar ${item.id}`}
                        className={`img-fluid option-img ${selectedImage === item.gambar ? "border-red" : " border"}`}
                        width={100}
                        height={100}
                        onMouseEnter={() => setSelectedImage(item.gambar)}
                      />
                      &nbsp;
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="col-md-5 d-none d-md-block">
                <span className="text-muted">{paket.kategori.nama_kategori}</span>
                <h5 className="fw-bold">{paket.nama_paket.toUpperCase()}</h5>
                <h5 className="fw-bold text-danger fs-3">
                  {formatRupiah(paket.harga)}/<span style={{ fontSize: "20px" }}>{paket.satuan}</span>
                </h5>
                {paket.kategori.nama_kategori !== "Prasmanan" && (
                  <div className="include mt-3 mb-0">
                    <div dangerouslySetInnerHTML={{ __html: paket.description }} />
                  </div>
                )}
                <div className="fitur mt-3">
                  <div className="d-flex" style={{ fontSize: "14px" }}>
                    <div className="icon" style={{ fontSize: "14px" }}>
                      <i className="fa-solid fa-truck-pickup"></i>
                    </div>
                    &nbsp;&nbsp;
                    <div className="d-flex flex-column">
                      <span className="fw-bold">Bebas Ongkir</span>
                      <span className="text-muted">Semua harga sudah termasuk ongkir</span>
                    </div>
                  </div>
                  <div className="d-flex mt-3" style={{ fontSize: "14px" }}>
                    <div className="icon" style={{ fontSize: "14px" }}>
                      <i className="fa-solid fa-umbrella"></i>
                    </div>
                    &nbsp;&nbsp;
                    <div className="d-flex flex-column">
                      <span className="fw-bold">Proteksi kerusakkan makanan</span>
                      <span className="text-muted">Jamiman makanan diterima dalam keadaan baik</span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-outline-danger mt-4 py-3 w-100" onClick={openModal}>
                  <i className="fa-solid fa-cart-plus" />
                  &nbsp; Masukkan Keranjang
                </button>
              </div>
              <div className="col-12 d-flex flex-column d-md-none py-3 shadow border my-3">
                <span className="text-muted">{paket.kategori.nama_kategori}</span>
                <span className="fw-bold">{paket.nama_paket}</span>
                <h5 className="fw-bold text-danger fs-3 my-2">
                  {formatRupiah(paket.harga)}/<span style={{ fontSize: "20px" }}>{paket.satuan}</span>
                </h5>
                <span className="text-muted" style={{ fontSize: "14px" }}>
                  Terjual {paket.terjual} {paket.satuan}
                </span>
                <div className="fitur mt-3">
                  <div className="d-flex" style={{ fontSize: "14px" }}>
                    <div className="icon" style={{ fontSize: "14px" }}>
                      <i className="fa-solid fa-truck-pickup"></i>
                    </div>
                    &nbsp;&nbsp;
                    <div className="d-flex flex-column">
                      <span className="fw-bold">Bebas Ongkir</span>
                      <span className="text-muted">Semua harga sudah termasuk ongkir</span>
                    </div>
                  </div>
                  <div className="d-flex mt-3" style={{ fontSize: "14px" }}>
                    <div className="icon" style={{ fontSize: "14px" }}>
                      <i className="fa-solid fa-umbrella"></i>
                    </div>
                    &nbsp;&nbsp;
                    <div className="d-flex flex-column">
                      <span className="fw-bold">Proteksi kerusakkan makanan</span>
                      <span className="text-muted">Jamiman makanan diterima dalam keadaan baik</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {paket.kategori.nama_kategori.includes("Prasmanan") && (
          <section id="description" className="d-block p-4 p-md-0 mb-5">
            <div className="container">
              <div className="row d-flex mb-4">
                <div className="col-5 d-none  d-md-flex align-items-center">
                  <div className="line bg-danger" />
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-center">
                  <h3 className="text-danger">Deskripsi</h3>
                </div>
                <div className="col-5 d-none  d-md-flex  align-items-center">
                  <div className="line bg-danger" />
                </div>
              </div>
              <span dangerouslySetInnerHTML={{ __html: paket.description }} />
            </div>
          </section>
        )}
        <div className="d-md-none insert-cart bg-danger" onClick={openModal}>
          <div className="d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-cart-plus"></i>&nbsp;
            <span>Masukkan Keranjang</span>
          </div>
        </div>
        <ModalComponent isOpen={isModalOpen}>
          <div className="menu d-flex">
            <img src={paket.gambar_paket} alt="Paket Gambar Modal" className="img-fluid p-1 border" width={100} />
            &nbsp;&nbsp;
            <div className="d-flex flex-column justify-content-end">
              <span className="fw-bold text-danger" style={{ fontSize: "20px" }}>
                {formatRupiah(paket.harga)}
              </span>
              <span className="text-muted" style={{ fontSize: "12px" }}>
                Terjual {paket.terjual} {paket.satuan}
              </span>
            </div>
            <div className="d-flex justify-content-end w-100 text-muted" style={{ fontSize: "25px", cursor: "pointer" }} onClick={closeModal}>
              X
            </div>
          </div>
          <hr />
          <div className="menu-olahan">
            {menu.map((item, index) => (
              <React.Fragment key={index}>
                <div className="d-flex flex-column mb-1" key={index}>
                  <span className="fw-bold">{`${item.menu} ${
                    item.menu.includes("Pondokan") || item.menu.includes("Pondokkan")
                      ? "(Maksimal 4)"
                      : item.menu.includes("Dekorasi") || item.menu.includes("Pendamping")
                      ? "(Maksimal 2)"
                      : paket.kategori.nama_kategori.includes("Nasi Kotak", "Rice Box") && paket.harga > 20000 && item.menu.includes("Sayuran")
                      ? "(Maksimal 2)"
                      : ""
                  }`}</span>
                  {item.menu.includes("Pondokkan") || item.menu.includes("Pondokkan") || item.menu.includes("Dekorasi") ? (
                    <span className="text-danger" style={{ fontSize: "12px" }}>
                      * Minimal order 100 pax
                    </span>
                  ) : item.menu.includes("Sarapan") ? (
                    <span className="text-danger" style={{ fontSize: "12px" }}>
                      * Minimal order 500 pax
                    </span>
                  ) : (
                    ""
                  )}
                  <div className="d-flex flex-wrap">
                    {item.sub_menu_prasmanans.map((itemSub) => (
                      <React.Fragment key={itemSub.id}>
                        <div className={`my-2 ${isDisabled && (item.menu.includes("Pondokkan" || "Pondokan") || item.menu.includes("Dekorasi")) ? "disabled" : isDisabledSarapan && item.menu.includes("Sarapan") ? "disabled" : ""}`}>
                          <div
                            className={
                              selectedSubmenus[item.id] === itemSub.sub_menu ||
                              selectedPondokkan[item.id]?.includes(itemSub.sub_menu) ||
                              selectedDekorasi[item.id]?.includes(itemSub.sub_menu) ||
                              selectedSarapan[item.id]?.includes(itemSub.sub_menu) ||
                              selectedPendamping[item.id]?.includes(itemSub.sub_menu) ||
                              selectedSayuran[item.id]?.includes(itemSub.sub_menu)
                                ? `opsi-menu selected`
                                : `opsi-menu border-grey`
                            }
                            onClick={() => handleSubmenuChange(item.id, item.menu, itemSub.sub_menu)}
                          >
                            {itemSub.sub_menu}
                          </div>
                        </div>
                        &nbsp;
                      </React.Fragment>
                    ))}
                    {item.menu.includes("Pondokkan" || "Pondokan") || item.menu.includes("Dekorasi") ? (
                      <div className={`my-2 ${isDisabled && (item.menu.includes("Pondokkan" || "Pondokan") || item.menu.includes("Dekorasi")) ? "disabled" : ""}`}>
                        <div
                          className={selectedPondokkan[item.id]?.includes("Tidak Ambil") || selectedDekorasi[item.id]?.includes("Tidak Ambil") ? `opsi-menu selected` : `opsi-menu border-grey`}
                          onClick={() => handleSubmenuChange(item.id, item.menu, "Tidak Ambil")}
                        >
                          Tidak Ambil
                        </div>
                        {!isTampil && ((selectedPondokkan[item.id] && selectedPondokkan[item.id].includes("Tidak Ambil")) || (selectedDekorasi[item.id] && selectedDekorasi[item.id].includes("Tidak Ambil"))) && (
                          <input type="text" placeholder="catatan (opsional)" value={catatan[item.id] || ""} onChange={(event) => handleCatatanChange(event, item.id)} />
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <hr />
              </React.Fragment>
            ))}
            <div className="d-flex flex-column mb-2 w-50">
              <span className="fw-bold mb-2">Kuantitas</span>
              <input
                type="number"
                className={`form-control ${errorAmount ? "is-invalid" : ""}`}
                style={{ width: "50%" }}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setErrorAmount(false);
                  setMessageAmount("");
                }}
                minLength={amount}
              />
              {errorAmount && <div className="invalid-feedback">{messageAmount}</div>}
            </div>
            <hr />
            {loadingSubmit ? (
              <LoadingComponent align="center" />
            ) : (
              <button className="btn btn-danger py-3 w-100" onClick={handleSubmit}>
                Masukkan Keranjang
              </button>
            )}
          </div>
        </ModalComponent>
      </div>
    </>
  );
};

export default DetailPaket;

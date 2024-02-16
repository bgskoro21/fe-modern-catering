import React, { useContext, useEffect, useState } from "react";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "./Homepage.css";
import { LandingPageContext } from "../../Context";
import { DescriptionComponent, LoadingComponent, RatingStarComponent } from "../../Component";
import { Karyawan, Makanan, Panstop, Picture1, Picture2, Picture3, Picture4, Picture5, Picture6, Picture7, Picture8, Picture9, Prasmanan } from "../../assets";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const HomePage = () => {
  const { bannerData, categoryData, testimonyData } = useContext(LandingPageContext);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [pesan, setPesan] = useState("");
  const [error, setError] = useState({});

  let delay = 0;
  let delay1 = 0;
  let delay2 = 0;
  const galeri = [
    { id: 1, url: Picture1 },
    { id: 2, url: Picture2 },
    // { id: 3, url: process.env.PUBLIC_URL + "/galeri/3.jpeg" },
    { id: 3, url: Picture3 },
  ];
  const galeri2 = [
    { id: 1, url: Picture4 },
    { id: 2, url: Picture9 },
  ];
  const galeri3 = [
    { id: 1, url: Picture5 },
    { id: 2, url: Picture6 },
    { id: 3, url: Picture7 },
    { id: 4, url: Picture8 },
  ];

  useEffect(() => {
    document.title = "Modern Catering - Home";
  }, []);

  // Validate Form
  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};
    if (!nama) {
      formIsValid = false;
      newErrors["nama"] = "Harap isi nama terlebih dahulu!";
    }

    if (!noHp) {
      formIsValid = false;
      newErrors["no_hp"] = "Isi Nomor HP terlebih dahulu";
    } else if (!/^\d{10,12}$/.test(noHp)) {
      formIsValid = false;
      newErrors["no_hp"] = "Nomor HP harus valid!";
    }

    if (!pesan) {
      formIsValid = false;
      newErrors["pesan"] = "Harap isi pesan terlebih dahulu!";
    }

    setError(newErrors);
    return formIsValid;
  };

  // handle submit konsultasi
  const handleSubmitKonsultasi = async () => {
    setLoadingSubmit(true);
    if (validateForm()) {
      try {
        const form = new FormData();
        form.append("nama", nama);
        form.append("no_hp", noHp);
        form.append("pesan", pesan);
        const response = await fetch("http://127.0.0.1:8000/api/konsultasi", {
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
            timer: 2000,
          });
          setNama("");
          setNoHp("");
          setPesan("");
          setError({});
        } else {
          Swal.fire({
            title: "Gagal!",
            text: result.message,
            icon: "errors",
            confirmButtonText: "OK",
            timer: 2000,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    setLoadingSubmit(false);
  };

  return (
    <div className="home">
      <section id="banner">
        <Splide
          aria-label="My Favorite Images"
          options={{
            type: "slide",
            perPage: 1,
            autoplay: true,
            interval: 3000, // Waktu perpindahan slide (dalam milidetik)
            rewindByDrag: true,
            rewind: true,
            width: "100vw",
          }}
        >
          <SplideSlide>
            <div className="fade-slide">
              <img src={galeri[0].url} alt="img" className="img-fluid w-100 img-banner" />
            </div>
          </SplideSlide>
          {bannerData.map((item, index) => (
            <SplideSlide key={index}>
              <div className="fade-slide">
                <img src={item.banner} alt={"Photo" + index + 1} className="img-fluid w-100 img-banner" />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </section>
      <section id="pernikahan" className="px-3 py-5 bg-light">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-6 mb-2" data-aos="fade-up">
              <img src={Prasmanan} alt="Foto Prasmanan" className="img-fluid w-100" data-aos="fade-right" data-aos-offset="1000" />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center" data-aos="fade-in" data-aos-offset="1000" data-aos-delay="100">
              <h1 style={{ maxWidth: "500px" }} className="mb-4">
                Bingung Pilih Catering? Modern Catering Aja!
              </h1>
              <p>
                Catering kami adalah pilihan ideal untuk memenuhi kebutuhan catering acara Anda. Dengan penekanan pada kualitas, rasa, dan pelayanan, kami menghadirkan hidangan lezat dan pelayanan terbaik untuk menyempurnakan momen berharga
                dalam hidup Anda. Dari hidangan utama yang menggoda hingga makanan penutup yang menggugah selera, setiap hidangan kami disiapkan dengan cinta dan perhatian pada detail. Kami juga menyediakan paket layanan yang dapat
                disesuaikan untuk memenuhi preferensi dan jumlah tamu yang berbeda. Percayakan kepada kami untuk memberikan pengalaman catering yang luar biasa dalam acara Anda.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="pernikahan1" className="px-3 py-5 bg-white">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-6 d-flex flex-column justify-content-center" data-aos="fade-down" data-aos-offset="1200">
              <h1 style={{ maxWidth: "500px" }} className="mb-4">
                Rasakan Kelezatan Hidangan dan Pelayanan Terbaik dalam Acara Anda
              </h1>
              <p style={{ maxWidth: "450px" }}>
                Masih bingung untuk memenuhi konsumsi acaramu? Modern Catering hadir untuk memenuhi kebutuhan konsumsi acaramu. Modern Catering menawarkan layanan yang sangat lengkap untuk mendukung lancarnya acaramu. Anda cukup terima
                beres,dan kami yang bekerja.
              </p>
            </div>
            <div className="col-md-6" data-aos="fade-up" data-aos-offset="1200" data-aos-delay="100">
              <img src={Panstop} alt="Foto Prasmanan" className="img-fluid w-100" />
            </div>
          </div>
        </div>
      </section>
      <section id="layanan" className="px-3 py-5 bg-light">
        <div className="container">
          <div data-aos="fade-in" data-aos-offset="1100">
            <h1 style={{ maxWidth: "500px" }} className="mb-4">
              Catering Unik, Memanjakan Lidah dan Jiwa dalam Acara Anda{" "}
            </h1>
            <p style={{ maxWidth: "500px" }}>Dengan menggabungkan kecanggihan teknologi dan pengalaman di bidang F&B, Modern Catering siap menghilangkan kebingungan dan waktu serta biaya anda dalam memesan catering.</p>
          </div>
          <div className="row d-flex">
            <DescriptionComponent
              img={"https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
              title="Reservasi yang fleksibel"
              desc="Tidak perlu repot harus datang ke kantor untuk memesan layanan catering. Kini Modern Catering, sudah menyediakan platform yang memungkinkan pemesanan secara online."
              delay={100}
              aos="flip-right"
              offset="1100"
            />
            <DescriptionComponent
              img={"https://images.unsplash.com/photo-1616645297079-dfaf44a6f977?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
              title="Menu dapat di custom"
              desc="Modern Catering memungkinkan anda untuk dapat memilih menu sesuai dengan keinginan anda. Anda tidak perlu khawatir, kami selalu siap untuk memenuhi keinginan anda."
              aos="flip-right"
              offset="1100"
              delay={200}
            />
            <DescriptionComponent
              img={Makanan}
              title="Kualitas terjamin"
              desc="Makanan Modern Catering sangat memuaskan pelanggan. Modern Catering memberikan garansi uang kembali ketika anda kurang cocok dengan makanan Modern Catering."
              aos="flip-right"
              offset="1100"
              delay={300}
            />
            <DescriptionComponent
              img={Karyawan}
              title="Karyawan cekatan"
              desc="Modern Catering memiliki karyawan yang cepat tanggap dalam menangani acara. Anda cukup terima beres, kami yang bekerja."
              aos="flip-right"
              offset="1100"
              delay={400}
            />
          </div>
        </div>
      </section>
      <section id="acara" className="px-3 py-5 bg-white">
        <div className="container">
          <div data-aos="fade-down" data-aos-offset="1200">
            <h1 className="text-center">Tersedia untuk kebutuhan acaramu</h1>
            <p className="text-center">Modern Catering siap untuk memenuhi kebutuhan acaramu.</p>
          </div>
          <div className="row d-flex mt-4">
            <DescriptionComponent
              img={"https://media.istockphoto.com/id/1399000045/photo/wedding-guests-clapping-hands-as-the-newlywed-couple-walk-down-the-aisle-joyful-bride-and.webp?b=1&s=170667a&w=0&k=20&c=BVEqcua-bQik4loA3L-SAr1iS-Fg58haObnUwZNvr4k="}
              title="Pernikahan"
              desc="Modern Catering selalu siap untuk memberikan hidangan dan pelayanan terbaik untuk acara pernikahan anda"
              aos="fade-down-right"
              offset="1200"
              delay={100}
            />
            <DescriptionComponent
              img={"https://media.istockphoto.com/id/1349302576/photo/happy-graduate-student-holding-his-diploma-on-graduation-day.webp?b=1&s=170667a&w=0&k=20&c=Rr9c4Evpt3SU3qxVjmUvjYD8JDRomWT_DeKmSg9CuEw="}
              title="Wisuda"
              desc="Bagi anda yang membutuhkan konsumsi untuk memenuhi kebutuhan acara wisuda, Modern Catering selalu siap memenuhinya."
              aos="fade-down-right"
              offset="1200"
              delay={200}
            />
            <DescriptionComponent
              img={"https://media.istockphoto.com/id/1158331861/photo/install-ring.webp?b=1&s=170667a&w=0&k=20&c=g5FsduzuJLgeruUX614SKojyOVrR9VV5MoZY4MzY5ZQ="}
              title="Lamaran"
              desc="Modern Catering juga menyediakan layanan untuk memenuhi kebutuhan konsumsi lamaran anda."
              aos="fade-down-right"
              offset="1200"
              delay={300}
            />
            <DescriptionComponent
              img={"https://media.istockphoto.com/id/660311458/photo/people-realxing-during-lunch-break.webp?b=1&s=170667a&w=0&k=20&c=5iAWASvQiC4kUTjOXvkjtW1MuNAswvh28sJuXW2XzLk="}
              title="Acara Kantor"
              desc="Modern Catering selalu siap jika kantor ada membutuhkan jasa catering untuk memenuhi kebutuhan acara kantor anda."
              aos="fade-down-right"
              offset="1200"
              delay={400}
            />
          </div>
        </div>
      </section>
      <section id="kategori" className="py-5 px-3 bg-light">
        <div className="container">
          <div className="mb-4 d-flex flex-column align-items-md-end">
            <h1>Produk Andalan Kami</h1>
            <p>Modern Catering menyediakan layanan berkualitas tinggi yang cocok untuk acara anda!</p>
          </div>
          <div data-aos="flip-left">
            <Splide
              aria-label="My Favorite Images"
              options={{
                perPage: 3,
                interval: 3000, // Waktu perpindahan slide (dalam milidetik)
                rewindByDrag: true,
                rewind: true,
                gap: 10,
                perMove: 1,
                pagination: false,
                breakpoints: {
                  640: {
                    perPage: 1,
                  },
                },
              }}
            >
              {categoryData.map((item, index) => (
                <SplideSlide key={index}>
                  <Link to={"/detail-paket/" + item.id} className="text-dark text-decoration-none">
                    <div className="custom-card border">
                      <div className="card-header">
                        <img src={item.gambar_paket} alt="Paket" className="img-fluid img-card" />
                      </div>
                      <div className="py-3">
                        <p className="text-muted text-center mb-0" style={{ fontSize: "14px" }}>
                          {item.kategori.nama_kategori}
                        </p>
                        <h4 className="text-center">{item.nama_paket}</h4>
                      </div>
                    </div>
                  </Link>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
      </section>
      <section id="galeri" className="py-5 px-3 bg-white">
        <div className="container">
          <h1 data-aos="fade-in" data-aos-offset="1200">
            Galeri Modern Catering
          </h1>
          <div className="row d-flex mt-4">
            {galeri.map((item, index) => {
              delay += 100;
              return (
                <div className="col-md-4 mb-2" key={index}>
                  <img src={item.url} alt={`Gambar${item.id}`} className="img-fluid img-thumbnail rounded w-100" style={{ height: "300px" }} data-aos="fade-down-right" data-aos-offset="1200" data-aos-delay={delay} />
                </div>
              );
            })}
          </div>
          <div className="row dflex mt-3">
            {galeri2.map((item, index) => {
              delay1 += 100;
              return (
                <div className="col-md-6 mb-2" key={index}>
                  <img src={item.url} alt={`Gambar${index}`} className="img-fluid img-thumbnail rounded w-100 h-100" data-aos="fade-left" data-aos-offset="1300" data-aos-delay={delay1} />
                </div>
              );
            })}
          </div>
          <div className="row dflex mt-3">
            {galeri3.map((item, index) => {
              delay2 += 100;
              return (
                <div className="col-md-3 mb-2" key={index}>
                  <img src={item.url} alt={`Gambar${index}`} className="img-fluid img-thumbnail rounded w-100" data-aos="fade-up" data-aos-offset="1400" data-aos-delay={delay2} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section id="contact" className="px-3 py-5 bg-light">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-6 d-flex flex-column justify-content-center" data-aos="fade-right" data-aos-offset="2000">
              <h2 className="mb-3">KONSULTASI GRATIS</h2>
              <h5 className="mb-3">Anda telah datang jauh-jauh ke sini, mengapa tidak mengambil langkah pertama dan mengirimkan pesan kepada kami? Gratis!</h5>
              <span className="text-muted">
                Kami menyediakan konsultasi awal gratis dan tanpa kewajiban. Kami akan membantu Anda memahami detail layanan, menu, ataupun informasi lainnya tentang kami. Hubungi kami dan kami akan berusaha membantu kebutuhan konsumsi
                acara anda.
              </span>
            </div>
            <div className="col-md-6" data-aos="fade-left" data-aos-offset="2000" data-aos-delay="100">
              <div className="mb-3">
                <label htmlFor="nama" className="form-label">
                  Nama
                </label>
                <input type="text" className={`form-control ${error["nama"] ? "is-invalid" : ""}`} id="nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
                {error["nama"] && <div className="invalid-feedback">{error["nama"]}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Nomor HP (WhatsApp)
                </label>
                <input type="text" className={`form-control ${error["no_hp"] ? "is-invalid" : ""}`} id="email" value={noHp} onChange={(e) => setNoHp(e.target.value)} required />
                {error["no_hp"] && <div className="invalid-feedback">{error["no_hp"]}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="pesan" className="form-label">
                  Pesan
                </label>
                <textarea className={`form-control ${error["pesan"] ? "is-invalid" : ""}`} id="pesan" required value={pesan} onChange={(e) => setPesan(e.target.value)}></textarea>
                {error["pesan"] && <div className="invalid-feedback">{error["pesan"]}</div>}
              </div>
              {loadingSubmit ? (
                <LoadingComponent />
              ) : (
                <button className="btn btn-danger" onClick={handleSubmitKonsultasi}>
                  Kirim
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <section id="testimoni" className="bg-white px-3 py-5">
        <div className="container py-3">
          <div data-aos="fade-down" data-aos-offset="2000">
            <h1 className="text-center">Apa Kata Pelanggan Kami?</h1>
            <p className="text-center text-sm mb-5">Kami sangat senang bisa memuaskan pelanggan kami.</p>
          </div>
          <div data-aos="fade-down" data-aos-offset="2000" data-aos-delay="100">
            <Splide
              aria-label="My Favorite Images"
              options={{
                type: "slide",
                perPage: 1,
                autoplay: true,
                interval: 10000, // Waktu perpindahan slide (dalam milidetik)
                rewindByDrag: true,
                rewind: true,
                pagination: false,
              }}
            >
              {testimonyData.map((item, index) => (
                <SplideSlide key={index}>
                  <div className="d-flex justify-content-center mb-3">
                    <img
                      src={item.user.profile_picture ? item.user.profile_picture : "https://tse2.mm.bing.net/th?id=OIP.rmim2jYzNpSCslo60INohQHaF9&pid=Api&P=0&h=180"}
                      alt={"Profile Picture" + item.id}
                      className="rounded-circle"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    <RatingStarComponent small={true} rating={item.nilai} />
                  </div>
                  <h3 className="mb-3 text-center">{item.user.name}</h3>
                  <div className="d-flex justify-content-center">
                    <p className="testi-pelanggan text-center" style={{ maxWidth: "500px" }}>
                      {item.message}
                    </p>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

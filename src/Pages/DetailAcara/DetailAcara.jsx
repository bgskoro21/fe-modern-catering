import React from "react";
import { DescriptionComponent } from "../../Component/DescriptionComponent/DescriptionComponent";
import "./DetailAcara.css";

export const DetailAcara = () => {
  return (
    <>
      <section id="section-1" className="p-5">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h1 className="title-section1">Bebas mikir urusan makan siang</h1>
              <p>
                Jangan lagi bingung memilih makanan untuk jam istirahat. Dengan menggunakan layanan meal planning dari Modern Catering, kamu bisa memesan makanan untuk seminggu atau bahkan sebulan ke depan sekaligus. Dengan demikian, kamu
                tak perlu khawatir lagi soal urusan makanan dan bisa menikmati waktu istirahatmu dengan santai pada jam makan siang.
              </p>
            </div>
            <div className="col-md-6 d-md-flex d-sm-none align-items-center">
              <img src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      <section id="modern-catering" className="bg-light p-4">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-6 d-md-flex d-sm-none align-items-center">
              <img src="https://images.unsplash.com/photo-1616645258469-ec681c17f3ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h1 className="title-section1">Modern Catering, solusi makan siang bebas pusing</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid molestias facilis mollitia obcaecati quas qui? Inventore distinctio maiores nobis reiciendis asperiores ipsa voluptatum. Iste ullam autem quaerat nostrum
                deserunt. Commodi culpa vitae labore tempora nostrum molestiae omnis aliquid non eveniet error dolorum laborum nesciunt, magnam dolore aperiam. Enim ipsam provident ipsum adipisci accusamus magni, sed excepturi eligendi
                sequi ad! Iure voluptas esse repudiandae voluptatum perferendis suscipit eveniet.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="benefit" className="p-4">
        <div className="container">
          <div className="title-section3 mb-4">
            <h1 className="mb-3">You can rest, we'll do the rest</h1>
            <p>Dengan menggabungkan kecanggihan teknologi dan pengalaman di bidang F&B, Kulina siap menghilangkan kebingungan dan kebosanan saat pesan makan tiap hari.</p>
          </div>
          <div className="row d-flex">
            <DescriptionComponent
              img={"https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
              title="Bebas repot pesan tiap hari"
              desc="Tidak perlu repot mikir mau makan apa tiap hari karena menu makan siang bisa direncanakan jauh-jauh hari mulai dari sehari, seminggu, hingga sebulan ke depan."
            />
            <DescriptionComponent
              img={"https://images.unsplash.com/photo-1616645297079-dfaf44a6f977?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
              title="Makan siang anti bosan"
              desc="Kulina punya ratusan merchant yang siap memasak untukmu. Menunya pun diatur tim Food Experience sehingga tetap ada menu favorit, namun juga ada menu baru yang menarik."
            />
            <DescriptionComponent
              img={"https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
              title="Kualitas makanan terjamin"
              desc="Semua merchant telah diseleksi dengan ketat sehingga kualitasnya lebih terjamin. Makanan Kulina juga punya garansi kualitas yang bisa diklaim jika kualitas tidak sesuai."
            />
          </div>
        </div>
      </section>
    </>
  );
};

import React from "react";
import "./PricingPages.css";
import { CardPricing, BenefitPricing } from "../../Component";
// import { CardPricing } from "../../Component/CardComponent/CardPricing";
// import { BenefitPricing } from "../../Component/CardComponent/BenefitPricing";

const PricingPages = () => {
  return (
    <>
      <section id="hero-pricing" className="d-flex justify-content-center align-items-center text-white">
        <h1 className="text-title">Daftar Harga</h1>
      </section>
      <section id="prasmanan-mini" className="p-4">
        <div className="container">
          <h1 className="text-center mb-4">Prasmanan Mini</h1>
          <p className="text-center mb-3">Prasmanan mini cocok untuk acara yang tidak cukup besar seperti halny lamaran, acara kantor, wisuda, dan lain sebagainya.</p>
          <p className="text-center mb-0">
            Minimal Order: <strong>50 pax</strong>
          </p>
          <p className="text-center mb-0">
            Min Order 100 pax: <strong>Free Meja Prasmanan dan Dekorasi Catering</strong>
          </p>
          <p className="text-center mb-4">
            Min Order 200 pax: <strong>Free Soft Drink</strong>
          </p>
          <p className="text-center text-danger">* Menu di tabel hanya contoh, bisa diganti sesuai selera</p>
          <div className="row d-flex justify-content-center mb-3">
            <div className="col-md-3">
              <CardPricing category="Lebih dari 100 porsi" price="35,000" desc="Cocok untuk acara sunatan, lamaran, dll.">
                <BenefitPricing benefit={"Nasi"} />
                <BenefitPricing benefit={"Ayam Kecap Cabe Ijo"} />
                <BenefitPricing benefit={"Balado Telur"} />
                <BenefitPricing benefit={"Sop Kimlo"} />
                <BenefitPricing benefit={"Kering Kentang Wijen"} />
                <BenefitPricing benefit={"Mie Goreng"} />
                <BenefitPricing benefit={"Kerupuk"} />
                <BenefitPricing benefit={"Buah"} />
                <BenefitPricing benefit={"Air Mineral"} />
              </CardPricing>
            </div>
            <div className="col-md-3">
              <CardPricing category="Lebih dari 200 porsi" price="40,000" desc="Cocok untuk acara sunatan, lamaran, dll.">
                <BenefitPricing benefit={"Nasi"} />
                <BenefitPricing benefit={"Ayam Suir Kecap Cabe Ijo"} />
                <BenefitPricing benefit={"Balado Dagin"} />
                <BenefitPricing benefit={"Sop"} />
                <BenefitPricing benefit={"Bihun"} />
                <BenefitPricing benefit={"Kerupuk"} />
                <BenefitPricing benefit={"Buah"} />
                <BenefitPricing benefit={"Air Mineral"} />
              </CardPricing>
            </div>
            <div className="col-md-3">
              <CardPricing category="Lebih dari 100 porsi" price="45,000" desc="Cocok untuk acara sunatan, lamaran, dll.">
                <BenefitPricing benefit={"Nasi"} />
                <BenefitPricing benefit={"Ayam Suir Kecap Cabe Ijo"} />
                <BenefitPricing benefit={"Balado Daging"} />
                <BenefitPricing benefit={"Sop Telur Puyuh"} />
                <BenefitPricing benefit={"Sambel Kentang"} />
                <BenefitPricing benefit={"Pempek"} />
                <BenefitPricing benefit={"Es Buah"} />
                <BenefitPricing benefit={"Kerupuk"} />
                <BenefitPricing benefit={"Air Mineral"} />
              </CardPricing>
            </div>
            <div className="col-md-3">
              <CardPricing category="Lebih dari 200 porsi" price="50,000" desc="Cocok untuk acara sunatan, lamaran, dll.">
                <BenefitPricing benefit={"Nasi"} />
                <BenefitPricing benefit={"Ayam Suir Lada Hitam"} />
                <BenefitPricing benefit={"Balado Daging"} />
                <BenefitPricing benefit={"Gurame Asam Manis"} />
                <BenefitPricing benefit={"Sop Jamur"} />
                <BenefitPricing benefit={"Kering Kentang Kacang"} />
                <BenefitPricing benefit={"Pempek"} />
                <BenefitPricing benefit={"Salad Buah"} />
                <BenefitPricing benefit={"Kerupuk"} />
                <BenefitPricing benefit={"Air Mineral"} />
              </CardPricing>
            </div>
          </div>
        </div>
      </section>
      <section id="prasmanan-besar" className="p-4 bg-white">
        <div className="container">
          <h1 className="text-center mb-4">Prasmanan Besar</h1>
          <p className="text-center mb-2">Prasmanan Besar cocok untuk memenuhi kebutuhan acara seperti halnya pernikahan, dan lain sebagainya.</p>
          <p className="text-center mb-2">
            Minimal Order: <strong>400px</strong>
          </p>
          <p className="text-center mb-2">Free:</p>
          <p className="text-center mb-2 fw-bold">1. Pondokkan</p>
          <p className="text-center fw-bold">2. Menu Sarapan Setelah Akad 50 Porsi</p>
          <p className="text-center text-danger">* Menu di tabel hanya contoh, bisa diganti sesuai selera</p>
          <div className="row d-flex justify-content-center mb-3">
            <div className="col-md-4">
              <CardPricing category="Lebih dari 100 porsi" price="40,000" desc="Cocok untuk acara sunatan, lamaran, dll.">
                <BenefitPricing benefit={"Nasi"} />
                <BenefitPricing benefit={"Ayam Rica-rica"} />
                <BenefitPricing benefit={"Balado Telur"} />
                <BenefitPricing benefit={"Soup Ayam Bakso"} />
                <BenefitPricing benefit={"Kering Kentang Wijen"} />
                <BenefitPricing benefit={"Kerupuk Udang"} />
                <BenefitPricing benefit={"Buah Nampan"} />
                <BenefitPricing benefit={"Air Mineral"} />
                <BenefitPricing benefit={"Menu Pondokkan"} />
              </CardPricing>
            </div>
            <div className="col-md-4">
              <CardPricing category="Lebih dari 200 porsi" price="45,000" desc="Cocok untuk acara sunatan, lamaran, dll.">
                <BenefitPricing benefit={"Nasi"} />
                <BenefitPricing benefit={"Ayam Lada Hitam"} />
                <BenefitPricing benefit={"Rendang"} />
                <BenefitPricing benefit={"Soup Jagung"} />
                <BenefitPricing benefit={"Capcay Komplit"} />
                <BenefitPricing benefit={"Kering Kentang Wijen"} />
                <BenefitPricing benefit={"Kerupuk Udang"} />
                <BenefitPricing benefit={"Buah Nampan"} />
                <BenefitPricing benefit={"Air Mineral"} />
                <BenefitPricing benefit={"Menu Pondokkan"} />
              </CardPricing>
            </div>
            <div className="col-md-4">
              <CardPricing category="Lebih dari 100 porsi" price="50,000" desc="Cocok untuk acara sunatan, lamaran, dll.">
                <BenefitPricing benefit={"Nasi"} />
                <BenefitPricing benefit={"Ayam Goreng Serundeng"} />
                <BenefitPricing benefit={"Rolade Daging"} />
                <BenefitPricing benefit={"Gurame Asam Manis"} />
                <BenefitPricing benefit={"Soup Macaroni Sosis"} />
                <BenefitPricing benefit={"Salad Buah"} />
                <BenefitPricing benefit={"Kering Kentang Telur Puyuh"} />
                <BenefitPricing benefit={"Kerupuk Udang"} />
                <BenefitPricing benefit={"Buah Nampan"} />
                <BenefitPricing benefit={"Air Mineral"} />
                <BenefitPricing benefit={"Menu Pondokkan"} />
              </CardPricing>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingPages;

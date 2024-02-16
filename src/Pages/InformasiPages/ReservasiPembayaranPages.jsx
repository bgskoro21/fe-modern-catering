import React from "react";

const ReservasiPembayaranPages = () => {
  return (
    <section className="p-5">
      <div className="container">
        <h4 className="mb-4">Reservasi dan Pembayaran</h4>
        <div className="cara-pesan">
          <span className="fw-bold">Bagaimana saya dapat melakukan reservasi di Modern Catering</span>
          <ol>
            <li>Buat Akun Pelanggan</li>
            <li>Pilih Paket atau Menu di Halaman Belanja</li>
            <li>Masukkan paket atau menu ke keranjang</li>
            <li>Pilih paket atau menu dalam keranjang yang ingin di pesan</li>
            <li>Isi form reservasi</li>
            <li>Menunggu Persetujuan Admin</li>
          </ol>
        </div>
        <div className="cara-pesan">
          <span className="fw-bold">Bagaimana saya tahu pesanan saya sudah disetujui</span>
          <br />
          <span>
            Setelah melakukan pembayaran DP, anda akan menerima notifikasi melalui WhatsAPP bahwa detail pesanan anda telah masuk beserta nomor ordernya. Setelah status pesanan sudah menjadi Booked, kami akan mengirimkan test food ke rumah
            anda jika yang dipesan adalah paket prasmanan.
          </span>
        </div>
      </div>
    </section>
  );
};

export default ReservasiPembayaranPages;

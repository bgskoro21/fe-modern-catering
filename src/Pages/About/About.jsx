import React from "react";
import { AboutComponent, FolksComponent } from "../../Component";
import "./About.css";
import { Abi } from "../../assets";

const About = () => {
  return (
    <>
      <section id="hero">
        <div className="title d-flex justify-content-center align-items-center h-100">
          <h1 className="text-white text-title">Tentang Modern Catering</h1>
        </div>
      </section>
      <section id="about" className="bg-white p-5">
        <div className="container">
          <div className="row d-flex">
            <AboutComponent icon="fa-solid fa-puzzle-piece" title="Oktober 2019" desc="Modern Catering Berdiri" />
            <AboutComponent icon="fa-solid fa-house" title="Melayani Sekitar" desc="Bandar Lampung, Lampung Selatan, Pringsewu, Pesawaran, Metro" />
            <AboutComponent icon="fa-solid fa-hand-holding-dollar" title="Garansi Uang Kembali" desc="Jika makanan testing tidak enak dijamin uang kembali!" />
          </div>
          <div className="spacing" />
          <hr className="text-danger divider" />
          <div className="spacing" />
          <div className="row d-flex">
            <div className="col-md-6">
              <h2 className="text-center mb-4 text-danger fw-bold">Visi & Misi</h2>
              <div className="visi mb-4">
                <p className="fs-4">Visi</p>
                <ul>
                  <li>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus tempora tenetur voluptatibus nulla amet odit adipisci vitae nam tempore cupiditate explicabo delectus accusantium eveniet, dolorum quis impedit
                    exercitationem voluptatem consequatur autem ab deserunt voluptatum iste. Fugit dolores animi, tempore iure dolore quibusdam eius nulla quidem doloremque inventore blanditiis quia praesentium!
                  </li>
                </ul>
              </div>
              <div className="misi">
                <p className="fs-4">Misi</p>
                <ul>
                  <li>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus tempora tenetur voluptatibus nulla amet odit adipisci vitae nam tempore cupiditate explicabo delectus accusantium eveniet, dolorum quis impedit
                    exercitationem voluptatem consequatur autem ab deserunt voluptatum iste. Fugit dolores animi, tempore iure dolore quibusdam eius nulla quidem doloremque inventore blanditiis quia praesentium!
                  </li>
                  <li>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus tempora tenetur voluptatibus nulla amet odit adipisci vitae nam tempore cupiditate explicabo delectus accusantium eveniet, dolorum quis impedit
                    exercitationem voluptatem consequatur autem ab deserunt voluptatum iste. Fugit dolores animi, tempore iure dolore quibusdam eius nulla quidem doloremque inventore blanditiis quia praesentium!
                  </li>
                  <li>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus tempora tenetur voluptatibus nulla amet odit adipisci vitae nam tempore cupiditate explicabo delectus accusantium eveniet, dolorum quis impedit
                    exercitationem voluptatem consequatur autem ab deserunt voluptatum iste. Fugit dolores animi, tempore iure dolore quibusdam eius nulla quidem doloremque inventore blanditiis quia praesentium!
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="text-center text-danger fw-bold mb-5">
                Orang Dibelakang <br /> Modern Catering
              </h2>
              <div className="row d-flex mb-5">
                <FolksComponent img={Abi} nama="Chandra Husada A.N" />
                <p className="text-center">Owner</p>
              </div>
              <div className="cultures">
                <h2 className="text-center text-danger mb-3 fw-bold">Motto Kami</h2>
                <p className="text-center">Kesuksesan Acara Anda adalah Keberkahan Bagi Usaha Kami</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

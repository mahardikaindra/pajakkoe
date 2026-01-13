"use client";
import Footer from "@/src/components/layout/Footer";
import {
  Rocket,
  Target,
  CheckCircle,
  Shield,
  Clock,
  Award,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const SiteHeader = ({
  scrolled,
  onConsult,
  menu,
}: {
  scrolled: boolean;
  onConsult: (type: string) => void;
  menu: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-lg py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="shrink-0 flex items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white mr-3 transition-all duration-300 ${scrolled ? "bg-[#2c4f40]" : "bg-transparent backdrop-blur"}`}
            >
              <Image
                src={"/images/logo-white.png"}
                alt="Pajak!Koe Logo"
                width={100}
                height={100}
                className="w-8 h-8"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <span
              className={`font-black text-2xl tracking-tighter ${scrolled ? "text-[#2c4f40]" : "text-white"}`}
            >
              PAJAK!KOE
            </span>
          </div>

          <div className="hidden md:flex space-x-10">
            {menu.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`${scrolled ? "text-slate-600 hover:text-green-700" : "text-slate-200 hover:text-white"} transition-all duration-300 font-bold text-sm tracking-tight`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onConsult("Umum")}
              className={`hidden md:block px-7 py-3 rounded-2xl font-black transition-all duration-300 shadow-xl text-xs uppercase tracking-widest ${scrolled ? "bg-[#2c4f40] text-white hover:bg-black" : "bg-white text-[#2c4f40] hover:bg-green-50"}`}
            >
              Konsultasi
            </button>
            <button
              className={`${scrolled ? "text-slate-700" : "text-white"} md:hidden`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const SiteAbout = () => {
  return (
    <>
      <SiteHeader
        scrolled={true}
        onConsult={() => {}}
        menu={["Layanan", "Paket", "Blog", "FAQ"]}
      />
      <section className="bg-white min-h-screen pt-32 pb-24 antialiased">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Hero */}
          <div className="text-center mb-24">
            <span className="text-green-600 font-black tracking-[0.3em] uppercase text-[10px] mb-6 block">
              Kisah Kami
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
              Mendigitalisasi <br /> Kepatuhan Pajak.
            </h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
              Pajak!Koe lahir dari keresahan masyarakat akan rumitnya birokrasi
              perpajakan. Kami hadir untuk menjadi jembatan antara teknologi dan
              regulasi, memberikan kemudahan akses bagi setiap warga negara
              untuk taat pajak.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
            <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#2c4f40] rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl">
                <Target size={40} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
                Visi
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Menjadi platform layanan perpajakan berbasis teknologi nomor
                satu di Indonesia yang terpercaya, transparan, dan dapat diakses
                oleh semua kalangan.
              </p>
            </div>
            <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl">
                <Rocket size={40} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
                Misi
              </h3>
              <ul className="text-slate-600 font-medium leading-relaxed space-y-4 text-left">
                <li className="flex gap-3">
                  <CheckCircle
                    size={20}
                    className="text-green-500 shrink-0 mt-1"
                  />{" "}
                  Menyederhanakan proses administrasi pajak menjadi lebih
                  instan.
                </li>
                <li className="flex gap-3">
                  <CheckCircle
                    size={20}
                    className="text-green-500 shrink-0 mt-1"
                  />{" "}
                  Memberikan edukasi berkelanjutan mengenai pentingnya pajak.
                </li>
                <li className="flex gap-3">
                  <CheckCircle
                    size={20}
                    className="text-green-500 shrink-0 mt-1"
                  />{" "}
                  Menjamin keamanan dan kerahasiaan data klien dengan standar
                  tinggi.
                </li>
              </ul>
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black text-slate-900 mb-12 tracking-tight">
              Nilai-Nilai Kami
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield size={32} />
                </div>
                <h4 className="font-black text-xl mb-4">Integritas</h4>
                <p className="text-slate-500 text-sm font-medium">
                  Kami bekerja dengan kejujuran penuh dan kepatuhan terhadap
                  hukum yang berlaku.
                </p>
              </div>
              <div className="p-8">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock size={32} />
                </div>
                <h4 className="font-black text-xl mb-4">Kecepatan</h4>
                <p className="text-slate-500 text-sm font-medium">
                  Waktu Anda berharga. Kami berkomitmen memberikan layanan
                  tercepat di kelasnya.
                </p>
              </div>
              <div className="p-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award size={32} />
                </div>
                <h4 className="font-black text-xl mb-4">Kepuasan Klien</h4>
                <p className="text-slate-500 text-sm font-medium">
                  Setiap klien adalah prioritas. Kami memastikan pengalaman
                  terbaik dari awal hingga akhir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SiteAbout;

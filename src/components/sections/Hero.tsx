// src/components/sections/Hero.tsx

import React from "react";
import Image from "next/image";
import { Check, Clock, Shield, ShieldCheck, Wallet } from "lucide-react";
import WhatsAppMockup from "../ui/WhatsAppMockup";
import { handlePesanWA } from "../../lib/utils";
import WhatsAppIcon from "../ui/WhatsAppIcon";

interface HeroProps {
  banner: string;
  type: string;
  ctaText?: string;
  ctaLink?: string;
}

const Hero: React.FC<HeroProps> = ({ banner, type, ctaText, ctaLink }) => {
  if (type === "pengukuhan-pkp") {
    return (
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src={banner}
            alt="Background Santai"
            layout="fill"
            objectFit="cover"
          />
          {/* Overlay Gradient (Darker on left to make text readable) */}
          <div className="absolute inset-0 bg-linear-to-r from-[#2C4F40]/95 via-[#2C4F40]/70 to-[#2C4F40]/30"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content (Text) */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#2c4f40] px-4 py-2 rounded-full text-sm font-bold mb-6">
                <ShieldCheck className="text-green-500 w-4 h-4" /> Solusi PKP
                Omzet Di Atas Rp4,8 Miliar
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Legalitas PKP{" "}
                <span className="text-green-500">Mudah & Cepat</span>
                <br /> untuk Bisnis Anda!
              </h1>
              <p className="text-lg text-white mb-10 max-w-2xl mx-auto">
                Hindari risiko sanksi administrasi dan pidana. Kami membantu
                proses Pengukuhan Kena Pajak (PKP) baik secara{" "}
                <strong>Wajib</strong> maupun <strong>Sukarela</strong> dengan
                jaminan transparansi.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() =>
                    document
                      .getElementById("paket")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 border border-green-400"
                >
                  Lihat Paket Harga
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("keunggulan")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition"
                >
                  Informasi
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock className="text-orange-400 w-4 h-4" /> Proses Cepat
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="text-green-400 w-4 h-4" /> Privasi
                  Aman
                </div>
                <div className="flex items-center gap-1.5">
                  <Wallet className="text-blue-400 w-4 h-4" /> Bayar Belakangan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else if (type === "lapor-spt") {
    return (
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src={banner}
            alt="Background Santai"
            layout="fill"
            objectFit="cover"
          />
          {/* Overlay Gradient (Darker on left to make text readable) */}
          <div className="absolute inset-0 bg-linear-to-r from-[#2C4F40]/95 via-[#2C4F40]/70 to-[#2C4F40]/30"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content (Text) */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#2c4f40] px-4 py-2 rounded-full text-sm font-bold mb-6">
                <i className="fas fa-shield-alt"></i> Konsultan Pajak Berlisensi
                & Terpercaya
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Lapor SPT <span className="text-green-500">Tanpa Ribet</span>,
                <br />
                Hindari Denda Administrasi!
              </h1>
              <p className="text-lg text-white mb-10 max-w-2xl mx-auto">
                Kami membantu urusan perpajakan Anda dengan tim ahli yang
                berpengalaman. Cepat, aman, dan harga transparan untuk individu
                maupun badan usaha.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => handlePesanWA("Paket Kilat 50rb")}
                  className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 border border-green-400"
                >
                  Lihat Paket Harga
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("info")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition"
                >
                  Informasi
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock className="text-orange-400 w-4 h-4" /> 30 Menit Jadi
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="text-green-400 w-4 h-4" /> Privasi
                  Aman
                </div>
                <div className="flex items-center gap-1.5">
                  <Wallet className="text-blue-400 w-4 h-4" /> Bayar Belakangan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src={banner}
            alt="Background Santai"
            layout="fill"
            objectFit="cover"
          />
          {/* Overlay Gradient (Darker on left to make text readable) */}
          <div className="absolute inset-0 bg-linear-to-r from-[#2C4F40]/95 via-[#2C4F40]/70 to-[#2C4F40]/30"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content (Text) */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <span className="inline-flex items-center gap-2 bg-[#2c4f40] text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-green-500/30 shadow-lg">
                <Check size={14} className="text-green-400" /> Bayar Setelah
                Dokumen Jadi
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
                Bikin NPWP Cuma{" "}
                <span className="text-green-400">30 Menit.</span> <br />
                Tanpa Bangun, <br />
                <span className="relative inline-block">
                  Tanpa Ribet.
                  <svg
                    className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300 -z-10"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 10 100 5"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      opacity="0.6"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-lg text-slate-200 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0 drop-shadow-md">
                Hanya <strong>Rp 100.000</strong> sudah termasuk email resmi,
                aktivasi akun, dan kartu digital. Data aman tanpa perlu kirim
                foto dokumen utuh.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => handlePesanWA("Paket Kilat 50rb")}
                  className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 border border-green-400"
                >
                  <WhatsAppIcon className="w-5 h-5" /> Pesan Sekarang (50rb)
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("keunggulan")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition"
                >
                  Lihat Info
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock className="text-orange-400 w-4 h-4" /> 30 Menit Jadi
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="text-green-400 w-4 h-4" /> Privasi
                  Aman
                </div>
                <div className="flex items-center gap-1.5">
                  <Wallet className="text-blue-400 w-4 h-4" /> Bayar Belakangan
                </div>
              </div>
            </div>

            {/* Right Visual (Interactive WA Mockup Only) */}
            <div className="order-1 md:order-2 relative flex justify-center items-center h-[500px]">
              <div className="relative w-full max-w-sm flex justify-center items-center">
                {/* When Mobile dont showing Floating WA Mockup */}
                <div className="md:block hidden z-20 transform md:scale-100 animate-float drop-shadow-2xl">
                  <WhatsAppMockup />
                </div>
                {/* <div className="z-20 transform md:scale-100 animate-float drop-shadow-2xl">
                   <WhatsAppMockup /> 
                </div>                 */}
                {/* Float Badge 2 (Fast Service) */}
                <div className="absolute -right-4 bottom-1/4 bg-white/90 backdrop-blur p-3 rounded-xl shadow-xl border border-white/50 flex items-center gap-3 animate-bounce hidden md:flex z-30">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                    <Clock size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold">
                      Waktu Proses
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      30 Menit Jadi!
                    </p>
                  </div>
                </div>

                {/* Float Badge 1 (Status) */}
                <div className="absolute -left-4 top-1/3 bg-white/90 backdrop-blur p-3 rounded-xl shadow-xl border border-white/50 flex items-center gap-3 animate-bounce hidden md:flex z-30">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold">Status</p>
                    <p className="text-sm font-bold text-slate-900">
                      Aktif & Resmi!
                    </p>
                  </div>
                </div>

                {/* Decorative Blob */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-500 rounded-full blur-[100px] opacity-20 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Hero;

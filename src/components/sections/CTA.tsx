// src/components/sections/CTA.tsx

import React from "react";
import { Phone, CheckCircle } from "lucide-react";
import { handlePesanWA } from "../../lib/utils";

const primaryGreen = "#2C4F40";

interface CTAProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

const CTA: React.FC<CTAProps> = ({ title, subtitle, ctaText, ctaLink }) => {
  return (
    <section
      className="py-24 px-4 text-white text-center relative overflow-hidden"
      style={{ backgroundColor: primaryGreen }}
    >
      {/* Animated Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse delay-700"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
          Urus PKP Anda Sekarang <br /> Sebelum Terlambat
        </h2>
        <p className="text-xl text-green-100/80 mb-12 max-w-2xl mx-auto">
          Jangan biarkan bisnis Anda terhambat oleh masalah administrasi
          perpajakan. Konsultasikan status wajib PKP Anda hari ini.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={() => handlePesanWA("Umum")}
            className="px-12 py-6 bg-white text-green-950 font-black text-lg rounded-3xl shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
          >
            <Phone size={24} className="fill-green-900" /> WhatsApp Kami
            Sekarang
          </button>
        </div>
        <div className="mt-12 flex justify-center items-center gap-8 text-sm font-bold text-green-200/50">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} /> Data Aman & Rahasia
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} /> Proses 100% Legal
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} /> Konsultasi Gratis
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

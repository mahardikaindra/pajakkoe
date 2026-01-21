/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Info from "../../components/sections/Info";
import Hero from "../../components/sections/Hero";
import WhatsAppIcon from "../../components/ui/WhatsAppIcon";
import { handlePesanWA } from "../../lib/utils";
import Educations from "../../components/sections/Educations";
import Pricing from "../../components/sections/Pricing";
import Testimonials from "../../components/sections/Testimonials";
import FAQ from "../../components/sections/FAQ";
import CTA from "@/src/components/sections/CTA";
import NIBBanner from "@/src/components/sections/NIBBanner";

interface LaporSPTPageProps {
  children: React.ReactNode;
}

const LaporSPTPage: React.FC<LaporSPTPageProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans text-slate-700 selection:bg-brand-blue selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; letter-spacing: -0.02em; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-30px); } }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .bg-grid { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px); }
      `}</style>
      <Header
        scrolled={scrolled}
        onConsult={() => handlePesanWA("Umum")}
        menu={["Informasi", "Manfaat & Resiko", "Paket"]}
      />
      <Hero banner="/images/lapor-spt-banner.png" type="lapor-spt" />
      <Info />
      <Educations type="spt" />
      <Pricing id="paket" type="spt" />
      <FAQ id="faq" />
      <NIBBanner />
      <CTA id="cta" />
      <Footer />
      <button
        onClick={() => handlePesanWA("Tanya-tanya")}
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition duration-300 pulse-ring flex items-center justify-center"
        aria-label="Chat WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8" />
      </button>
    </div>
  );
};

export default LaporSPTPage;

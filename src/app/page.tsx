"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Menu,
  X,
  FileText,
  Check,
  ShieldCheck,
  Star,
  CheckCircle,
  Lock,
  Building2,
  ArrowRight,
  MessageSquare,
  Zap,
  Handshake,
  BarChart3,
  Headphones,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, cubicBezier, AnimatePresence } from "framer-motion";

interface ArtikelPageProps {
  id: string;
  authorId: string;
  backlinkUrl: string;
  backlinkText: string;
  category: string;
  content: string;
  seoScore: number;
  slug: string;
  title: string;
  updateAt: string;
  isFeatured: boolean;
  likes: number;
  metaDescription: string;
  imageUrl: string;
  focusedKeyword: string;
  createdAt: string;
}

import Reveal from "../components/ui/Reveal";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const CAROUSEL_ITEMS = [
  {
    id: "npwp",
    title: "Mengenai NPWP",
    subtitle: "Pendaftaran Pribadi & Badan",
    desc: "Panduan lengkap dan jasa pendaftaran NPWP secara instan melalui sistem Coretax terbaru. 30 menit langsung aktif.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800",
    icon: <FileText size={40} className="text-green-500" />,
    cta: "Pelajari NPWP",
  },
  {
    id: "artikel",
    title: "Baca Artikel Pajak",
    subtitle: "Wawasan & Regulasi 2025",
    desc: "Update informasi harian mengenai kebijakan fiskal, cara pemulihan akun pajak, dan tips mengelola pajak bisnis.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800",
    icon: <BookOpen size={40} className="text-green-500" />,
    cta: "Buka Artikel",
  },
  {
    id: "spt-pkp",
    title: "Pelaporan SPT & PKP",
    subtitle: "Kepatuhan & Legalitas",
    desc: "Layanan penyusunan laporan SPT Tahunan dan pengurusan Pengukuhan Pengusaha Kena Pajak (PKP) tanpa ribet.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
    icon: <ShieldCheck size={40} className="text-green-500" />,
    cta: "Urus Sekarang",
  },
];

const partnerAdvantages = [
  {
    title: "Jalur Prioritas",
    desc: "Antrian khusus untuk semua berkas dari mitra. Selesai lebih cepat dari layanan reguler.",
    icon: <Zap className="text-[#ffcd0c]" />,
  },
  {
    title: "Harga Khusus Notaris",
    desc: "Harga khusus yang kompetitif memungkinkan Anda memiliki margin keuntungan lebih besar.",
    icon: <Handshake className="text-[#ffcd0c]" />,
  },
  {
    title: "Laporan Real-time",
    desc: "Dashboard progres berkas yang transparan untuk memudahkan Anda update ke klien.",
    icon: <BarChart3 className="text-[#ffcd0c]" />,
  },
  {
    title: "Konsultasi Teknis",
    desc: "Akses langsung ke tim ahli untuk bedah kasus OSS yang rumit secara gratis.",
    icon: <Headphones className="text-[#ffcd0c]" />,
  },
];

import { handlePesanWA } from "../lib/utils";
import WhatsAppIcon from "../components/ui/WhatsAppIcon";

// --- SECTIONS ---

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
            className="flex flex-col cursor-pointer group shrink-0 items-center"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 p-2 rounded-xl flex items-center justify-center text-white mr-3 transition-all duration-300 ${scrolled ? "bg-[#2c4f40]" : "bg-transparent backdrop-blur"}`}
              >
                <Image
                  src={"/images/logo-white.png"}
                  alt="Pajak!Koe Logo"
                  width={120}
                  height={120}
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

            <span
              className={`text-[8px] font-black ${scrolled ? "text-[#2c4f40]" : "text-white"} uppercase tracking-widest ml-28 -mt-2 group-hover:text-[#2c4f40] transition-colors`}
            >
              Part of PT Koe Group Indonesia
            </span>
          </div>

          <div className="hidden md:flex space-x-10">
            {menu.map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === "Artikel") {
                    window.location.href = "/artikel";
                  } else {
                    scrollTo(item.toLowerCase());
                  }
                }}
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

import WhatsAppMockup from "../components/ui/WhatsAppMockup";

const SiteHero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#2C4F40]">
      <div className="absolute inset-0 z-0">
        <Image
          src={"/images/model.png"}
          alt="Background Santai"
          layout="fill"
          objectFit="cover"
        />
        {/* Overlay Gradient (Darker on left to make text readable) */}
        <div className="absolute inset-0 bg-linear-to-r from-[#2C4F40]/95 via-[#2C4F40]/70 to-[#2C4F40]/30"></div>
      </div>
      <div className="absolute top-0 right-0 w-full h-[850px] bg-green-400/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="text-center lg:text-left">
            <Reveal animation="slide-left" delay={100}>
              <span className="inline-flex items-center gap-2 bg-yellow-400/10 backdrop-blur-2xl text-yellow-400 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-yellow-400/20 shadow-2xl">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>{" "}
                Bayar di Akhir - 100% Tanpa DP
              </span>
            </Reveal>

            <Reveal animation="fade-up" delay={300}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1] mb-8 tracking-tighter">
                SOLUSI ANDALAN URUSAN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">
                  NPWP & CORETAX
                </span>
              </h1>
            </Reveal>

            <Reveal animation="fade-up" delay={500}>
              <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                NPWP TERDAFTAR, CORETAX AKTIF, SPT TERLAPOR & PKP DISETUJUI!
                <br className="hidden md:block" />
                {/* oleh tim ahli kami. <br className="hidden md:block" /> */}
                <span className="text-white font-bold">
                  Bayar hanya setelah dokumen Anda terbit!
                </span>
              </p>
            </Reveal>

            <Reveal
              animation="fade-up"
              delay={700}
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
            >
              <button
                onClick={() => handlePesanWA("Umum")}
                className="bg-green-500 text-white px-10 py-5 rounded-2xl font-black hover:bg-green-600 transition-all duration-300 shadow-[0_20px_50px_rgba(34,197,94,0.4)] transform hover:-translate-y-2 flex items-center justify-center gap-3 border border-green-400 text-lg tracking-tight"
              >
                <WhatsAppIcon className="w-6 h-6" /> Konsultasi Gratis
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("layanan")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-10 py-5 rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 text-lg tracking-tight"
              >
                Cek Layanan
              </button>
            </Reveal>
          </div>

          <Reveal
            animation="scale-up"
            delay={400}
            className="relative flex justify-center items-center"
          >
            <div className="relative animate-float">
              <WhatsAppMockup />
              <div className="absolute z-10 -right-12 bottom-20 bg-white/95 backdrop-blur-2xl p-6 rounded-4xl shadow-2xl border border-white/50 flex items-center gap-4 animate-bounce hidden lg:flex">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                  <CheckCircle size={24} strokeWidth={3} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                    Validasi
                  </p>
                  <p className="text-base font-black text-slate-900 tracking-tighter">
                    100% Terpercaya
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const ServiceSelector = () => {
  const services = [
    { title: "Pendaftaran NPWP", icon: <FileText size={24} /> },
    { title: "Pemulihan Akun Coretax", icon: <Lock size={24} /> },
    { title: "Pendaftaran PKP", icon: <Building2 size={24} /> },
    { title: "Laporan SPT", icon: <ShieldCheck size={24} /> },
    { title: "Konsultasi Coretax", icon: <MessageSquare size={24} /> },
  ];

  return (
    <section id="layanan" className="py-20 bg-slate-50 relative z-20 -mt-10">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal animation="fade-up">
          <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-wrap justify-center gap-4">
            {services.map((s, i) => (
              <button
                key={i}
                onClick={() => handlePesanWA(s.title)}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl hover:bg-green-500 hover:text-white transition-all duration-300 group"
              >
                <div className="text-green-500 group-hover:text-white">
                  {s.icon}
                </div>
                <span className="font-bold text-sm tracking-tight">
                  {s.title}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const NotarisBanner = () => (
  <>
    <section className="py-10 bg-yellow-400">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center text-black">
            <Star size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-black tracking-tighter uppercase">
              Promo Spesial Notaris
            </h3>
            <p className="text-black/70 font-bold uppercase tracking-widest text-[10px]">
              Dapatkan Potongan Langsung
            </p>
          </div>
        </div>
        <div className="text-center md:text-right">
          <span className="text-5xl font-black text-black block leading-none">
            DISKON 15%
          </span>
          <p className="text-black font-bold uppercase text-xs mt-2">
            *Berlaku untuk semua notaris yang menjadi rekanan Koe Legali
            Indonesia
          </p>
        </div>
        <button
          onClick={() => handlePesanWA("Diskon Notaris 15%")}
          className="bg-black text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all"
        >
          Klaim Diskon
        </button>
      </div>
    </section>
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-[#2C4F40] uppercase hero-title leading-none">
            MANFAAT NOTARIS <br />
            <span className="text-white stroke-text-white bg-[#2C4F40]">
              JADI MITRA PAJAK!KOE
            </span>
          </h2>
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] mt-4 text-[10px] md:text-xs">
            Solusi Sinergis bagi Notaris
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {partnerAdvantages.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-[#2C4F40] p-8 rounded-[25px] border border-white/10 shadow-xl relative overflow-hidden flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {React.cloneElement(item.icon, { size: 24 })}
              </div>
              <h4 className="text-base font-black text-[#ffcd0c] uppercase tracking-tight mb-3">
                {item.title}
              </h4>
              <p className="text-white/70 text-[11px] font-medium leading-relaxed italic">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  </>
);

const PricingSection = () => (
  <section id="paket" className="py-40 bg-slate-50">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-24">
        <Reveal animation="fade-up">
          <span className="text-green-600 font-black tracking-[0.3em] uppercase text-[10px] mb-6 block">
            Pricing Plans
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter">
            Biaya Transparan.
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Semua paket Tanpa DP & Bayar di Akhir
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <Reveal animation="fade-up" delay={200}>
          <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 text-left hover:shadow-2xl transition-all group">
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-2">
              Penerbitan NPWP Pribadi
            </h3>
            <p className="text-slate-400 text-xs font-bold uppercase mb-8 tracking-widest">
              Via Coretax
            </p>
            <div className="mb-10">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">
                Rp 100.000
              </span>
              <span className="text-slate-400 text-sm font-bold uppercase ml-2 tracking-widest">
                / Dokumen
              </span>
            </div>
            <ul className="space-y-4 mb-10">
              {[
                "Kartu Digital Coretax",
                "Surat Keterangan Terdaftar",
                "Aktivasi Aplikasi Coretax",
                "Email Gratis (Opsi)",
                "Passphrase Setting",
              ].map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-bold text-slate-600"
                >
                  <Check className="text-green-500" size={18} /> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePesanWA("Paket NPWP 95rb")}
              className="w-full py-5 bg-green-500 text-white rounded-2xl font-black tracking-widest uppercase text-xs hover:bg-black transition-all"
            >
              Pesan Sekarang
            </button>
          </div>
        </Reveal>

        <Reveal animation="fade-up" delay={400}>
          <div className="bg-[#2c4f40] p-12 rounded-[3rem] shadow-2xl border border-white/10 text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-yellow-400 text-black font-black text-[10px] px-6 py-2 uppercase tracking-widest rounded-bl-2xl">
              Terpopuler
            </div>
            <h3 className="text-2xl font-black text-white tracking-tighter mb-2">
              Penerbitan NPWP Badan Usaha
            </h3>
            <p className="text-white/40 text-xs font-bold uppercase mb-8 tracking-widest">
              Via Coretax
            </p>
            <div className="mb-10">
              <span className="text-5xl font-black text-white tracking-tighter">
                Rp 145.000
              </span>
              <span className="text-white/40 text-sm font-bold uppercase ml-2 tracking-widest">
                / Berkas
              </span>
            </div>
            <ul className="space-y-4 mb-10">
              {[
                "Kartu Digital Coretax",
                "Surat Keterangan Terdaftar",
                "Aktivasi Aplikasi Coretax",
                "Email Gratis (Opsi)",
                "Passphrase Setting",
              ].map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-bold text-white/80"
                >
                  <Check className="text-green-400" size={18} /> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePesanWA("Paket PKP 345rb")}
              className="w-full py-5 bg-white text-[#2c4f40] rounded-2xl font-black tracking-widest uppercase text-xs hover:bg-green-400 transition-all"
            >
              Konsultasi Paket
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

import Footer from "../components/layout/Footer";
import axios from "axios";
import CTA from "../components/sections/CTA";
import FAQ from "../components/sections/FAQ";
import NIBBanner from "../components/sections/NIBBanner";
import { PHONE_NUMBER } from "../lib/constants";

const InteractiveCarousel = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
  const prev = () =>
    setIndex(
      (prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length,
    );

  return (
    <section
      id="layanan-utama"
      className="py-32 bg-white overflow-hidden antialiased"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <Reveal className="text-left">
            <span className="text-green-600 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">
              Pusat Informasi
            </span>
            <h2 className="text-5xl font-black tracking-tighter text-slate-900 leading-tight">
              Layanan Prioritas <br /> Pajak!Koe.
            </h2>
          </Reveal>
          <div className="flex gap-4 mb-2">
            <button
              onClick={prev}
              className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center hover:bg-[#2c4f40] hover:text-white transition-all shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center hover:bg-[#2c4f40] hover:text-white transition-all shadow-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative min-h-[500px] md:min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-slate-50 rounded-[4rem] p-10 md:p-16 border border-slate-100"
            >
              <div className="order-2 lg:order-1 text-left">
                <div className="mb-8">{CAROUSEL_ITEMS[index].icon}</div>
                <h4 className="text-sm font-black text-green-600 uppercase tracking-widest mb-4">
                  {CAROUSEL_ITEMS[index].subtitle}
                </h4>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
                  {CAROUSEL_ITEMS[index].title}
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium max-w-md">
                  {CAROUSEL_ITEMS[index].desc}
                </p>
                <button
                  onClick={() => {
                    if (CAROUSEL_ITEMS[index].id === "artikel") return;
                    else handlePesanWA(CAROUSEL_ITEMS[index].title);
                  }}
                  className="bg-[#2c4f40] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center gap-3 shadow-xl"
                >
                  {CAROUSEL_ITEMS[index].cta} <ArrowRight size={16} />
                </button>
              </div>

              <div className="order-1 lg:order-2 h-72 lg:h-[400px] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src={CAROUSEL_ITEMS[index].image}
                  alt={CAROUSEL_ITEMS[index].title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicator */}
        <div className="flex justify-center gap-3 mt-12">
          {CAROUSEL_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${index === i ? "w-12 bg-green-500" : "w-3 bg-slate-200"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const LandingArticlesSection = ({
  blogs,
  loading,
}: {
  blogs: ArtikelPageProps[];
  loading: boolean;
}) => {
  if (loading) {
    return (
      <section id="artikel" className="py-40 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="text-left">
              <span className="text-green-600 font-black tracking-[0.3em] uppercase text-[10px] mb-6 block">
                Wawasan & Blog
              </span>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                Edukasi Perpajakan <br /> Untuk Anda.
              </h2>
            </div>
            <div className="h-6 w-48 bg-slate-200 rounded-full animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="h-[600px] bg-slate-200 rounded-[3.5rem] animate-pulse"></div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex flex-col">
                  <div className="h-48 bg-slate-200 rounded-[2.5rem] mb-6 animate-pulse"></div>
                  <div className="h-6 w-32 bg-slate-200 rounded-full mb-3 animate-pulse"></div>
                  <div className="h-8 bg-slate-200 rounded-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="artikel" className="py-40 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <Reveal className="text-left">
            <span className="text-green-600 font-black tracking-[0.3em] uppercase text-[10px] mb-6 block">
              Wawasan & Blog
            </span>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
              Edukasi Perpajakan <br /> Untuk Anda.
            </h2>
          </Reveal>
          <button
            onClick={() => (window.location.href = "/artikel")}
            className="flex items-center gap-3 font-black uppercase tracking-widest text-xs text-green-600 hover:translate-x-2 transition-all"
          >
            Lihat Seluruh Artikel <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Featured Article (1 large item) */}
          <div className="lg:col-span-7">
            <Reveal animation="fade-up">
              <div
                className="group cursor-pointer relative h-[600px] rounded-[3.5rem] overflow-hidden shadow-2xl"
                onClick={() => {}}
              >
                <Image
                  src={blogs[0].imageUrl}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                  alt="Featured"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent p-12 flex flex-col justify-end text-left">
                  <span className="bg-green-500 text-white font-black text-[10px] uppercase tracking-widest px-5 py-2 rounded-full w-fit mb-6">
                    {blogs[0].category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter leading-tight">
                    {blogs[0].title}
                  </h3>
                  <p className="text-slate-300 font-medium mb-8 max-w-lg line-clamp-2">
                    {blogs[0].content.replace(/<[^>]+>/g, "").slice(0, 200)}...
                  </p>
                  <div className="flex items-center gap-4 text-white font-black text-xs uppercase tracking-widest">
                    Baca Artikel <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Grid Articles (4 small items) */}
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.slice(1, 5).map((art, i) => (
              <Reveal key={art.id} animation="fade-up" delay={i * 150}>
                <div
                  className="group cursor-pointer flex flex-col text-left"
                  onClick={() => {}}
                >
                  <div className="h-48 bg-slate-100 rounded-[2.5rem] mb-6 overflow-hidden shadow-md">
                    <Image
                      src={art.imageUrl}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                      alt={art.title}
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-green-600 font-black text-[9px] uppercase tracking-widest">
                      {art.category}
                    </span>
                    <span className="text-slate-300 font-bold text-[9px]">
                      {new Date(art.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 tracking-tight leading-snug group-hover:text-green-600 transition-colors line-clamp-2">
                    {art.title}
                  </h4>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- APP COMPONENT ---

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [blogs, setBlogs] = useState<ArtikelPageProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          "https://www.koegroupindonesia.id/api/articles",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          },
        );
        // filter only isPublished true articles and sort by createdAt desc
        const publishedArticles = res.data
          .filter((article: ArtikelPageProps) => article.isFeatured)
          .sort(
            (a: ArtikelPageProps, b: ArtikelPageProps) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
        setBlogs(publishedArticles);
      } catch (err) {
        console.error("❌ Fetch articles error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="font-sans text-slate-700 selection:bg-green-500 selection:text-white scroll-smooth bg-white antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; letter-spacing: -0.02em; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-30px); } }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .bg-grid { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px); }
      `}</style>

      <SiteHeader
        scrolled={scrolled}
        onConsult={() => handlePesanWA("Konsultasi Umum")}
        menu={["Layanan", "Paket", "Artikel", "FAQ"]}
      />

      <main className="bg-grid">
        <SiteHero />
        <ServiceSelector />
        <NotarisBanner />
        {/* <StatsSection /> */}

        {/* Konsultasi Banner (Sticky Style CTA) */}
        <section className="bg-[#2c4f40] py-12">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8">
            <h4 className="text-white text-xl font-black tracking-tight">
              Punya pertanyaan spesifik?
            </h4>
            <button
              onClick={() => handlePesanWA("Konsultasi Cepat")}
              className="bg-white text-[#2c4f40] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-green-400 transition-all"
            >
              Konsultasi dengan CS Kami Sekarang
            </button>
          </div>
        </section>

        <PricingSection />
        <InteractiveCarousel />

        {/* SECTION ARTIKEL UTAMA (5 ITEMS) */}
        <LandingArticlesSection blogs={blogs} loading={loading} />
        <FAQ id="faq" />
        <NIBBanner />
        <CTA id="cta" />
      </main>

      <Footer />

      {/* Floating Button with WhatsApp Number tooltips */}
      <div className="fixed bottom-10 right-10 z-50 group flex flex-col items-end gap-3">
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl mb-2 translate-y-4 group-hover:translate-y-0">
          WhatsApp: {PHONE_NUMBER}
        </div>
        <button
          onClick={() => handlePesanWA("Tanya-tanya CS")}
          className="bg-green-500 text-white p-6 rounded-[2.5rem] shadow-2xl hover:scale-110 active:scale-95 transition-all duration-500 flex items-center justify-center"
        >
          <WhatsAppIcon className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

export default App;

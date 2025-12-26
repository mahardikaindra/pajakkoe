"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Menu,
  X,
  FileText,
  Check,
  ShieldCheck,
  Star,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Phone,
  Lock,
  Building2,
  ArrowRight,
  MessageSquare,
} from "lucide-react";

// --- ANIMATION HOOK ---
const useIntersectionObserver = (
  options = {},
): [React.RefObject<HTMLDivElement | null>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true); // Cast options to a more specific type if triggerOnce is always expected
        if (options && (options as { triggerOnce?: boolean }).triggerOnce)
          observer.unobserve(entry.target);
      }
    }, options as IntersectionObserverInit);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isIntersecting];
};

// --- REUSABLE REVEAL COMPONENT ---
import { ReactNode } from "react";

const Reveal = ({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  animation?: string;
  delay?: number;
  className?: string;
}) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animations = {
    "fade-up": "translate-y-12 opacity-0",
    "fade-in": "opacity-0",
    "slide-left": "-translate-x-12 opacity-0",
    "slide-right": "translate-x-12 opacity-0",
    "scale-up": "scale-95 opacity-0",
  };

  const activeClasses = isVisible
    ? "translate-y-0 translate-x-0 opacity-100 scale-100"
    : animations[animation as keyof typeof animations];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeClasses} ${className}`}
    >
      {children}
    </div>
  );
};

// --- DATA ---
const FAQS_DATA = [
  {
    question: "Apakah benar tanpa DP?",
    answer:
      "Ya, benar. Kami memproses dokumen Anda terlebih dahulu. Setelah dokumen terbit dan Anda cek validitasnya, baru Anda melakukan pembayaran.",
  },
  {
    question: "Apa itu Pemulihan Akun Coretax?",
    answer:
      "Layanan untuk memulihkan akses akun pajak Anda di sistem Coretax terbaru agar bisa kembali melakukan pelaporan rutin.",
  },
  {
    question: "Berapa lama proses NPWP?",
    answer:
      "Rata-rata selesai dalam 15-30 menit setelah data kami terima dengan lengkap.",
  },
  {
    question: "Apakah melayani seluruh Indonesia?",
    answer:
      "Ya, layanan kami berbasis online dan mencakup seluruh wilayah kerja DJP di Indonesia.",
  },
];

const ARTICLES_DATA = [
  {
    id: 1,
    title: "Panduan Lengkap Aktivasi Coretax 2025",
    date: "24 Des 2025",
    category: "Tutorial",
    excerpt:
      "Segala hal yang perlu Anda ketahui tentang sistem perpajakan terbaru di Indonesia.",
  },
  {
    id: 2,
    title: "Risiko Tidak Lapor SPT Tahunan",
    date: "20 Des 2025",
    category: "Edukasi",
    excerpt:
      "Pahami sanksi administrasi hingga pemblokiran akses perbankan jika Anda lalai.",
  },
  {
    id: 3,
    title: "Cara Mudah Daftar PKP untuk UMKM",
    date: "15 Des 2025",
    category: "Bisnis",
    excerpt:
      "Tingkatkan kredibilitas bisnis Anda dengan status Pengusaha Kena Pajak.",
  },
];

const handlePesanWA = (type: string) => {
  const message = `Halo CS Pajak!Koe, saya tertarik dengan layanan ${type}. Bagaimana prosedurnya?`;
  window.open(
    `https://wa.me/6285797946263?text=${encodeURIComponent(message)}`,
    "_blank",
  );
};

// --- UI COMPONENTS ---

const WhatsAppIcon = ({ className }: { className: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
                SOLUSI PAJAK <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">
                  MODERN & CEPAT.
                </span>
              </h1>
            </Reveal>

            <Reveal animation="fade-up" delay={500}>
              <p className="text-lg text-slate-300 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Pendaftaran NPWP, PKP, hingga Laporan SPT. Semua diproses instan
                oleh tim ahli kami. <br className="hidden md:block" />
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
              <div className="absolute z-10 -right-12 bottom-20 bg-white/95 backdrop-blur-2xl p-6 rounded-[2rem] shadow-2xl border border-white/50 flex items-center gap-4 animate-bounce hidden lg:flex">
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
          *Berlaku untuk semua notaris yang menjadi rekanan Koe Legali Indonesia
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
);

const StatsSection = () => {
  const stats = [
    { value: "15,000+", label: "NPWP Terbit", sub: "Seluruh Indonesia" },
    { value: "1.300+", label: "SPT Terlapor", sub: "Individu & Badan" },
    { value: "880", label: "PKP Disetujui", sub: "Aktivasi Lancar" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {stats.map((s, i) => (
          <Reveal key={i} animation="scale-up" delay={i * 200}>
            <div className="text-center p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all">
              <div className="text-5xl font-black text-[#2c4f40] mb-3 tracking-tighter">
                {s.value}
              </div>
              <div className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">
                {s.label}
              </div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
                {s.sub}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

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
              Paket Kilat NPWP
            </h3>
            <p className="text-slate-400 text-xs font-bold uppercase mb-8 tracking-widest">
              30 Menit Langsung Jadi
            </p>
            <div className="mb-10">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">
                Rp 95.000
              </span>
              <span className="text-slate-400 text-sm font-bold uppercase ml-2 tracking-widest">
                / Dokumen
              </span>
            </div>
            <ul className="space-y-4 mb-10">
              {[
                "NPWP Digital Aktif",
                "Aktivasi E-Reg",
                "Panduan Lengkap",
                "Support 24/7",
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
              Paket Badan / PKP
            </h3>
            <p className="text-white/40 text-xs font-bold uppercase mb-8 tracking-widest">
              Pengurusan Legalitas PT/CV
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
                "NPWP Badan Usaha",
                "Aktivasi Akun PKP",
                "Sertifikat Elektronik",
                "Konsultasi Coretax",
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

const ArticleSection = () => (
  <section id="artikel" className="py-40 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <Reveal animation="fade-up">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="text-left">
            <span className="text-green-600 font-black tracking-[0.3em] uppercase text-[10px] mb-6 block">
              Wawasan & Blog
            </span>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
              Berita & Artikel <br /> Terbaru.
            </h2>
          </div>
          {/* <button className="flex items-center gap-3 font-black uppercase tracking-widest text-xs text-[#2c4f40] hover:translate-x-2 transition-all">
            Lihat Seluruh Blog <ArrowRight size={18} />
          </button> */}
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {ARTICLES_DATA.map((art, i) => (
          <Reveal key={art.id} animation="fade-up" delay={i * 200}>
            <div className="group cursor-pointer">
              <div className="h-64 bg-slate-100 rounded-[2rem] mb-8 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <img
                  src={`https://picsum.photos/seed/${art.id}/600/400`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-80"
                  alt={art.title}
                />
                <span className="absolute bottom-6 left-6 bg-white text-black font-black text-[8px] uppercase tracking-widest px-4 py-2 rounded-full">
                  {art.category}
                </span>
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                {art.date}
              </p>
              <h4 className="text-xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-green-600 transition-colors">
                {art.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                {art.excerpt}
              </p>
              <span className="font-black text-[10px] uppercase tracking-[0.2em] border-b-2 border-green-500 pb-1">
                Baca Selengkapnya
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const NIBBanner = () => (
  <section className="py-20 bg-slate-900 text-white">
    <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-10">
      <div className="flex items-center gap-8">
        <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-green-400">
          <Building2 size={40} />
        </div>
        <div className="text-left">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
            Layanan NIB OSS RBA - 1 Hari Beres
          </p>
          <h3 className="text-4xl font-black tracking-tighter leading-none mb-2">
            Butuh NIB Badan?
          </h3>
        </div>
      </div>
      <button
        onClick={() => handlePesanWA("Pengurusan NIB Badan")}
        className="bg-green-500 hover:bg-white hover:text-black text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl"
      >
        Klik Disini Juga
      </button>
    </div>
  </section>
);

const FAQSection = () => (
  <section id="faq" className="py-40 bg-slate-50">
    <div className="max-w-3xl mx-auto px-4">
      <div className="text-center mb-24">
        <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
          Pertanyaan Populer.
        </h2>
        <p className="text-slate-500 mt-4 font-bold uppercase tracking-widest text-[10px]">
          Cek sebelum Anda melakukan pemesanan
        </p>
      </div>
      <div className="space-y-6">
        {FAQS_DATA.map((faq, idx) => (
          <FAQItem key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-40 bg-white relative overflow-hidden">
    <div className="absolute inset-0 bg-grid opacity-20"></div>
    <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
      <Reveal animation="scale-up">
        <div className="max-w-4xl mx-auto bg-[#2c4f40] p-20 rounded-[4rem] shadow-[0_50px_100px_rgba(44,79,64,0.3)]">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-10 leading-tight">
            Tunggu Apa Lagi? <br /> Pajak Jadi Mudah.
          </h2>
          <p className="text-green-200/60 font-black uppercase tracking-[0.3em] text-xs mb-12">
            Tanpa DP • Cepat • Terjamin
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button
              onClick={() => handlePesanWA("Urgent")}
              className="bg-green-500 text-white px-12 py-6 rounded-3xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
            >
              Hubungi CS Kami
            </button>
            <div className="flex items-center justify-center gap-4 bg-white/5 px-8 py-6 rounded-3xl border border-white/10">
              <Phone className="text-green-400" size={24} />
              <span className="text-white font-black text-xl tracking-tighter">
                0857-9794-6263
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

import Footer from "../components/layout/Footer";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 text-left flex justify-between items-center focus:outline-none"
      >
        <span className="font-black text-lg text-slate-900 tracking-tight">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="text-slate-400" />
        ) : (
          <ChevronDown className="text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-8 pb-8 text-slate-600 leading-relaxed font-medium text-sm border-t border-slate-50 pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
          {answer}
        </div>
      )}
    </div>
  );
};

// --- APP COMPONENT ---

const App = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        <StatsSection />

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
        <ArticleSection />
        <FAQSection />
        <NIBBanner />
        <FinalCTA />
      </main>

      <Footer />

      {/* Floating Button with WhatsApp Number tooltips */}
      <div className="fixed bottom-10 right-10 z-50 group flex flex-col items-end gap-3">
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl mb-2 translate-y-4 group-hover:translate-y-0">
          WhatsApp: 0857-9794-6263
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

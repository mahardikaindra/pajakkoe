// src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Features from "../../components/sections/Features";
import Hero from "../../components/sections/Hero";
import WhatsAppIcon from "../../components/ui/WhatsAppIcon";
import { handlePesanWA } from "../../lib/utils";
import Educations from "../../components/sections/Educations";
import Pricing from "../../components/sections/Pricing";
import CTA from "@/src/components/sections/CTA";
import FAQ from "@/src/components/sections/FAQ";
import {
  AlertTriangle,
  CheckCircle,
  Globe,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

interface PengukuhanPKPPageProps {
  children: React.ReactNode;
}

// Data Dokumen
const documents = [
  {
    title: "Legalitas Perusahaan",
    items: ["Akta Pendirian & Perubahan", "SK Kemenkumham", "NIB (OSS RBA)"],
  },
  {
    title: "Identitas Pengurus",
    items: [
      "KTP Direktur",
      "NPWP Pribadi (Status Valid)",
      "E-mail & No. HP Aktif",
    ],
  },
  {
    title: "Bukti Lokasi",
    items: [
      "PBB/Sertifikat/Perjanjian Sewa",
      "Foto Kantor (Tampak Depan & Dalam)",
      "Denah Lokasi Usaha",
    ],
  },
  {
    title: "Dokumen Pajak",
    items: [
      "SPT Tahunan Terakhir",
      "Bukti Pembayaran Pajak",
      "Daftar Inventaris Kantor",
    ],
  },
];

const procedures = [
  {
    id: 1,
    title: "Konsultasi & Review",
    desc: "Tim ahli kami memeriksa kelengkapan berkas Anda untuk meminimalisir penolakan.",
  },
  {
    id: 2,
    title: "Pendaftaran Online",
    desc: "Proses input data melalui sistem e-Registration DJP secara akurat.",
  },
  {
    id: 3,
    title: "Verifikasi Lapangan",
    desc: "Pendampingan saat petugas pajak melakukan kunjungan survei ke lokasi usaha.",
  },
  {
    id: 4,
    title: "Aktivasi & E-Faktur",
    desc: "Aktivasi Sertifikat Elektronik dan akun e-Faktur hingga siap digunakan.",
  },
];

const PengukuhanPKPPage: React.FC<PengukuhanPKPPageProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans text-slate-700 selection:bg-brand-blue selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gainst:wght@300;400;600;700&display=swap');
        
        body { font-family: 'Gainst', sans-serif; }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        .pulse-ring {
          animation: pulse-ring 2s infinite;
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
      `}</style>
      <Header
        scrolled={scrolled}
        onConsult={() => handlePesanWA("Umum")}
        menu={["Keunggulan", "Kriteria", "Syarat", "Paket", "FAQ"]}
      />
      <Hero banner="/images/pkp-banner.png" type="pengukuhan-pkp" />
      {/* Mandatory Notification */}
      <section className="bg-amber-50 py-10 px-4 border-b border-amber-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h4 className="font-bold text-amber-900">
                Perhatian Bagi Pemilik Bisnis
              </h4>
              <p className="text-amber-700 text-sm">
                Omzet usaha Anda mencapai <strong>Rp4,8 Miliar/tahun</strong>?
                Segera ajukan PKP untuk menghindari sanksi perpajakan.
              </p>
            </div>
          </div>
          <a
            href="#kriteria"
            className="text-amber-800 font-bold border-b-2 border-amber-300 hover:border-amber-600 transition"
          >
            Pelajari Aturannya &rarr;
          </a>
        </div>
      </section>
      {/* Who Needs PKP Section */}
      <section id="kriteria" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight"
                style={{ color: "#2C4F40" }}
              >
                Siapa Saja yang Membutuhkan Status PKP?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 transition hover:border-green-200">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-700 shrink-0">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">Pengusaha Omzet Tinggi</h5>
                    <p className="text-sm text-slate-600">
                      Wajib bagi pengusaha dengan omzet di atas Rp4,8 Miliar per
                      tahun.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 transition hover:border-green-200">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-700 shrink-0">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">Importir & Eksportir</h5>
                    <p className="text-sm text-slate-600">
                      Pengusaha yang melakukan impor atau ekspor barang/jasa
                      kena pajak.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 transition hover:border-green-200">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-700 shrink-0">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">PKP Sukarela</h5>
                    <p className="text-sm text-slate-600">
                      Bagi Anda yang ingin meningkatkan kredibilitas meski omzet
                      belum Rp4,8 Miliar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-3xl p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-200/50 rounded-full blur-3xl"></div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="text-green-600" /> Kenapa Bisnis Anda
                Harus PKP?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white shrink-0 mt-1">
                    <CheckCircle size={12} />
                  </div>
                  <p className="text-slate-700">
                    <strong>Kredit PPN:</strong> Anda dapat mengkreditkan PPN
                    atas pembelian barang/jasa bisnis.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white shrink-0 mt-1">
                    <CheckCircle size={12} />
                  </div>
                  <p className="text-slate-700">
                    <strong>Penerbitan Faktur:</strong> Hak resmi memungut PPN
                    atas penjualan kepada klien.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white shrink-0 mt-1">
                    <CheckCircle size={12} />
                  </div>
                  <p className="text-slate-700">
                    <strong>Kredibilitas:</strong> Syarat utama mengikuti lelang
                    besar dan kerja sama korporasi.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section id="dokumen" className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#2C4F40" }}
            >
              Syarat & Dokumen Pengajuan
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Berdasarkan regulasi DJP terbaru, pastikan Anda menyiapkan berkas
              berikut agar pengajuan tidak ditolak.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                <h4
                  className="font-bold text-lg mb-6 flex items-center gap-3"
                  style={{ color: "#2C4F40" }}
                >
                  <div
                    className="w-1.5 h-8 rounded-full"
                    style={{ backgroundColor: "#2C4F40" }}
                  ></div>
                  {doc.title}
                </h4>
                <ul className="space-y-4">
                  {doc.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <div className="mt-1 w-4 h-4 rounded bg-green-50 flex items-center justify-center">
                        <CheckCircle size={14} className="text-green-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Educations type="pkp" />

      {/* Procedure Section */}
      <section id="prosedur" className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#2C4F40" }}
            >
              Alur Proses PKP
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Proses transparan mulai dari pendaftaran hingga aktivasi E-Faktur.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
              {procedures.map((step) => (
                <div key={step.id} className="text-center group">
                  <div
                    className="w-20 h-20 rounded-3xl bg-white border-2 mx-auto mb-8 flex items-center justify-center text-3xl font-black transition-all group-hover:bg-green-50 group-hover:scale-110 shadow-lg"
                    style={{ borderColor: "#2C4F40", color: "#2C4F40" }}
                  >
                    {step.id}
                  </div>
                  <h4 className="font-extrabold text-xl mb-3">{step.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed px-4">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Pricing type="pkp" />
      <CTA />
      <FAQ type="pkp" />
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

export default PengukuhanPKPPage;

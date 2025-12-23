/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/layout/Footer.tsx
import React from "react";
import Image from "next/image";
import { Instagram, Twitter, Facebook, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Image
              src={"/images/logo-white.png"}
              alt="Pajak!Koe Logo"
              width={100}
              height={100}
              className="w-8 h-8"
              onError={(e: any) => {
                e.target.style.display = "none";
              }}
            />
            <span className="font-bold text-2xl text-white">PAJAK!KOE</span>
          </div>
          <p className="text-slate-400 mb-8 max-w-sm leading-relaxed">
            Part of PT Koe Group Indonesia
            <br />
            SK AHU No: AHU-069446.AH.01.30.Tahun 2025
            <br />
            Solusi NPWP instan 30 menit. Bayar setelah jadi, privasi aman.
          </p>
          {/* Location */}
          <div className="flex items-start mb-6 gap-3">
            <MapPin className="w-5 h-5 text-slate-400" />
            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed">
              HQuarters Lantai 20 Jl Asia Afrika No 158, Kota Bandung
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Ikuti Kami</h4>
          </div>
          <div className="flex space-x-6">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="https://www.instagram.com/pajakkoe_id"
                className="hover:text-white transition-colors"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 text-lg">Layanan</h4>
          <ul className="space-y-4 text-slate-400">
            <li>
              <a href="#paket" className="hover:text-brand-blue transition">
                Paket Kilat (30 Menit)
              </a>
            </li>
            <li>
              <a href="#paket" className="hover:text-brand-blue transition">
                NPWP Badan
              </a>
            </li>
            <li>
              <a
                href="/pelaporan-spt"
                className="hover:text-brand-blue transition"
              >
                Lapor SPT Tahunan
              </a>
            </li>
            <li>
              <a
                href="/pengukuhan-pkp"
                className="hover:text-brand-blue transition"
              >
                Pengukuhan PKP
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 text-lg">Kontak</h4>
          <ul className="space-y-4 text-slate-400">
            <li className="flex items-center gap-3">
              {/* <WhatsAppIcon className="w-5 h-5" /> */} 0857-9794-6263
            </li>
            <li className="flex items-center gap-3">
              {/* <Mail className="w-5 h-5" /> */} marketing@pajakkoe.co.id
            </li>
            <li className="flex items-center gap-3">
              {/* <Clock className="w-5 h-5" /> */} Senin - Jumat, 08.00 - 17.00
            </li>
          </ul>
        </div>
      </div>
      {/* Copyright & Legal Links */}
      <div className="max-w-6xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Pajak!Koe All rights reserved.</p>
        <div className="flex gap-6 text-white">
          <a
            href="/terms-conditions"
            target="_top"
            rel="noopener noreferrer"
            className="hover:text-brand-blue transition"
          >
            Syarat & Ketentuan
          </a>
          <a
            href="/privacy-police"
            target="_top"
            rel="noopener noreferrer"
            className="hover:text-brand-blue transition"
          >
            Kebijakan Privasi
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

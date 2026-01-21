/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/layout/Footer.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "../ui/WhatsAppIcon";
import {
  Instagram,
  Twitter,
  Facebook,
  MapPin,
  Mail,
  Clock,
} from "lucide-react";
import { handlePesanWA } from "../../lib/utils";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 py-16 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-20">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white">
              <Image
                src="/images/logo-white.png"
                alt="Pajak!Koe Logo"
                width={50}
                height={50}
              />
            </div>
            <span className="font-black text-3xl text-white tracking-tighter">
              PAJAK!KOE
            </span>
          </div>
          <p className="text-slate-400 mb-12 max-w-sm leading-relaxed font-medium">
            Part of PT Koe Legali Indonesia. <br /> SK AHU No:
            AHU-069446.AH.01.30.Tahun 2025. <br />
            Konsultasi Pajak Terpercaya di Indonesia.
          </p>
          <div className="flex items-start mb-10 gap-5">
            <div className="p-3 bg-white/5 rounded-xl text-green-500 shrink-0">
              <MapPin size={22} />
            </div>
            <p className="text-slate-400 leading-relaxed text-sm font-medium">
              HQuarters Lantai 20
              <br />
              Jl Asia Afrika No 158, Kota Bandung
            </p>
          </div>
          <div className="flex space-x-6">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="https://www.instagram.com/pajakkoe_id"
                className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-green-500 transition-all border border-white/5"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-black text-white mb-10 text-lg tracking-tight uppercase tracking-widest text-xs opacity-50">
            Layanan Kami
          </h4>
          <ul className="space-y-5 text-slate-400 text-sm font-medium">
            <li>
              <Link href="/" className="hover:text-green-500 transition-colors">
                Pendaftaran NPWP
              </Link>
            </li>
            <li>
              <a
                href="/pengukuhan-pkp"
                className="hover:text-green-500 transition-colors"
              >
                Pengukuhan PKP
              </a>
            </li>
            <li>
              <a
                href="/pelaporan-spt"
                className="hover:text-green-500 transition-colors"
              >
                Lapor SPT Tahunan
              </a>
            </li>
            <li>
              <button
                onClick={() => handlePesanWA("NIB Badan")}
                className="hover:text-green-500 transition-colors text-left"
              >
                Pengurusan NIB Badan
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-white text-lg tracking-tight gap-3 mb-10">
            Hubungi Kami
          </h4>
          <ul className="space-y-5 text-slate-400 text-sm font-medium">
            <li className="flex items-center gap-3">
              <WhatsAppIcon className="w-5 h-5 text-green-500" /> 0857-9794-6263
            </li>
            <li className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-green-500" />
              Senin - Jumat, 08.00 - 17.00
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-green-500" />{" "}
              info@koegroupindonesia.id
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-10 pt-10 border-t border-white/5 text-[10px] uppercase font-black tracking-widest text-slate-600 flex justify-between">
        <p>&copy; {new Date().getFullYear()} KOE LEGALI INDONESIA</p>
        <div className="flex gap-10">
          <span>
            <a href="/terms-conditions" className="hover:text-green-500">
              Terms
            </a>
          </span>
          <span>
            <a href="/privacy-police" className="hover:text-green-500">
              Privacy
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

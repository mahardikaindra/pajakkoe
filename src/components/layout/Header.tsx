/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/layout/Header.tsx
import React from "react";
import Image from "next/image";
import { Menu, X, FileText } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onConsult: (type: string) => void;
  scrolled: boolean;
  menu: any;
}

const Header: React.FC<HeaderProps> = ({ onConsult, scrolled, menu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: any) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-sm py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="shrink-0 flex items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Image
              src={scrolled ? "/images/logo.png" : "/images/logo-white.png"}
              alt="Pajak!Koe Logo"
              width={100}
              height={100}
              className="w-8 h-8"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {/* Fallback Icon if logo missing */}
            <div
              className="w-8 h-8 bg-[#2c4f40] rounded flex items-center justify-center text-white ml-0"
              style={{ display: "none" }}
            >
              <FileText size={18} />
            </div>
            {/* Warna teks logo berubah tergantung background/scroll */}
            <span
              className={`ml-2 font-bold text-xl ${scrolled ? "text-[#2c4f40]" : "text-white"}`}
            >
              PAJAK!KOE
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menu.map((item: any) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`${scrolled ? "text-slate-600 hover:text-brand-blue" : "text-slate-200 hover:text-white"} transition font-medium`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onConsult("Umum")}
              className={`hidden md:block px-5 py-2 rounded-full font-semibold transition shadow-lg text-sm ${scrolled ? "bg-[#2c4f40] text-white hover:bg-[#223d32]" : "bg-white text-[#2c4f40] hover:bg-slate-100"}`}
            >
              Konsultasi Gratis
            </button>
            <button
              className={`${scrolled ? "text-slate-700" : "text-white"} md:hidden`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {["Keunggulan", "Paket", "FAQ"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="block w-full text-left px-3 py-3 text-slate-600 hover:bg-blue-50 hover:text-brand-blue rounded-md font-medium"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                onConsult("Umum");
              }}
              className="w-full mt-4 bg-brand-blue text-white px-5 py-3 rounded-lg font-semibold text-center"
            >
              Konsultasi Gratis
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;

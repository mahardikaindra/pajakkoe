/* eslint-disable react-hooks/immutability */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { handlePesanWA } from "../../lib/utils";

interface SiteHeaderProps {
  forceScrolled?: boolean;
}

const SiteHeader = ({ forceScrolled = false }: SiteHeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isScrolled = forceScrolled || scrolled;
  const menuItems = ["Layanan", "Paket", "Artikel", "FAQ"];

  const onConsult = (type: string) => handlePesanWA(type);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    if (id === "artikel") {
      window.location.href = "/artikel";
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex flex-col cursor-pointer group shrink-0 items-center"
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                window.location.pathname === "/"
              ) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                window.location.href = "/";
              }
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 p-2 rounded-xl flex items-center justify-center text-white mr-3 transition-all duration-300 ${
                  isScrolled ? "bg-[#2c4f40]" : "bg-transparent backdrop-blur"
                }`}
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
                className={`font-black text-2xl tracking-tighter ${
                  isScrolled ? "text-[#2c4f40]" : "text-white"
                }`}
              >
                PAJAK!KOE
              </span>
            </div>

            <span
              className={`text-[8px] font-black ${
                isScrolled ? "text-[#2c4f40]" : "text-white"
              } uppercase tracking-widest ml-28 -mt-2 group-hover:text-[#2c4f40] transition-colors`}
            >
              Part of PT Koe Group Indonesia
            </span>
          </div>

          <div className="hidden md:flex space-x-10">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === "Artikel") {
                    window.location.href = "/artikel";
                  } else {
                    scrollTo(item.toLowerCase());
                  }
                }}
                className={`${
                  isScrolled
                    ? "text-slate-600 hover:text-green-700"
                    : "text-slate-200 hover:text-white"
                } transition-all duration-300 font-bold text-sm tracking-tight`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onConsult("Umum")}
              className={`hidden md:block px-7 py-3 rounded-2xl font-black transition-all duration-300 shadow-xl text-xs uppercase tracking-widest ${
                isScrolled
                  ? "bg-[#2c4f40] text-white hover:bg-black"
                  : "bg-white text-[#2c4f40] hover:bg-green-50"
              }`}
            >
              Konsultasi
            </button>
            <button
              className={`${isScrolled ? "text-slate-700" : "text-white"} md:hidden`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col gap-4 border-t border-gray-100">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === "Artikel") {
                  window.location.href = "/artikel";
                } else {
                  scrollTo(item.toLowerCase());
                }
              }}
              className="text-slate-600 font-bold text-sm text-left py-2 border-b border-gray-50 last:border-0"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => onConsult("Umum")}
            className="bg-[#2c4f40] text-white px-7 py-4 rounded-2xl font-black text-xs uppercase tracking-widest w-full mt-2"
          >
            Konsultasi
          </button>
        </div>
      )}
    </nav>
  );
};

export default SiteHeader;

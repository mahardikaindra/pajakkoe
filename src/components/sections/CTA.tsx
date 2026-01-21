/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/sections/CTA.tsx

import React from "react";
import { Phone, CheckCircle } from "lucide-react";
import { handlePesanWA } from "../../lib/utils";
import Reveal from "../ui/Reveal";

const primaryGreen = "#2C4F40";

interface CTAProps {
  id: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

const CTA: React.FC<CTAProps> = ({ id, title, subtitle, ctaText, ctaLink }) => {
  return (
    <section id={id} className="py-40 bg-white relative overflow-hidden">
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
};

export default CTA;

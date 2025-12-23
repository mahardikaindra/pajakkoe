/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/sections/Features.tsx

import React from "react";
import FeatureCard from "../ui/FeatureCard";
import { Wallet, Lock, Clock } from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

const Features: React.FC<FeaturesProps> = ({ title, subtitle, features }) => {
  return (
    <section id="keunggulan" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Kenapa Harus Kami?
          </h2>
          <p className="text-slate-600 text-lg">
            Solusi paling aman dan nyaman buat kamu yang mager birokrasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Wallet className="w-8 h-8 text-brand-blue" />}
            bgIcon="bg-blue-100"
            title="Bayar Setelah Jadi"
            desc="Gak perlu takut ketipu. Dokumen kami urus dulu sampai beres, kamu cek validasinya, baru kamu bayar. Fair kan?"
          />
          <FeatureCard
            icon={<Lock className="w-8 h-8 text-yellow-600" />}
            bgIcon="bg-yellow-100"
            title="Data Lebih Aman"
            desc="Kami menjamin privasi. Kamu TIDAK PERLU menyerahkan foto dokumen pribadi secara utuh. Cukup data yang diperlukan saja."
          />
          <FeatureCard
            icon={<Clock className="w-8 h-8 text-green-600" />}
            bgIcon="bg-green-100"
            title="30 Menit Beres"
            desc="Lagi butuh urgent buat lamar kerja? Tinggal chat, tunggu sebentar sambil scroll TikTok, tau-tau NPWP udah jadi."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;

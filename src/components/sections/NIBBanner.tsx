import { Building2 } from "lucide-react";
import { handlePesanWA } from "../../lib/utils";

const NIBBanner = () => (
  <section className="py-20 bg-slate-900 text-white">
    <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-10">
      <div className="flex items-center gap-8">
        <div className="w-20 h-20 bg-white/5 rounded-4xl flex items-center justify-center text-green-400">
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

export default NIBBanner;

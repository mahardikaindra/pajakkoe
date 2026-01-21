import { PACKAGES, PACKAGES_PKP, PACKAGES_SPT } from "../../lib/constants";
import PricingCard from "../ui/PricingCard";
import { handlePesanWA } from "../../lib/utils";
import Reveal from "../ui/Reveal";

interface PricingProps {
  id: string;
  type?: "npwp" | "pkp" | "spt";
}
const Pricing = ({ id, type = "npwp" }: PricingProps) => {
  const packages =
    type === "pkp" ? PACKAGES_PKP : type === "spt" ? PACKAGES_SPT : PACKAGES;
  return (
    <section id={id} className="py-40 bg-slate-50">
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

        <div
          className={`grid grid-cols-1 md:grid-cols-${packages.length % 2 === 0 ? 2 : 3} gap-6 items-start`}
        >
          {packages.map((pkg) => (
            <PricingCard key={pkg.id} data={pkg} onSelect={handlePesanWA} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

import { PACKAGES, PACKAGES_PKP, PACKAGES_SPT } from "../../lib/constants";
import PricingCard from "../ui/PricingCard";
import { handlePesanWA } from "../../lib/utils";

interface PricingProps {
  type?: "npwp" | "pkp" | "spt";
  title?: string;
  subtitle?: string;
}
const Pricing = ({ type = "npwp", title, subtitle }: PricingProps) => {
  const packages =
    type === "pkp" ? PACKAGES_PKP : type === "spt" ? PACKAGES_SPT : PACKAGES;
  return (
    <section id="paket" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-blue font-bold tracking-wider uppercase text-sm bg-blue-100 px-3 py-1 rounded-full">
            {title || "Pilihan Paket Layanan"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">
            {subtitle || "Pilih paket yang sesuai dengan kebutuhan Anda"}
          </h2>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-${packages.length % 2 === 0 ? 2 : 3} gap-8 items-start`}
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

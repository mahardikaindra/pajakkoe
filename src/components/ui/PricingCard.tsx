/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check } from "lucide-react";
import { PACKAGES } from "../../lib/constants";
import WhatsAppIcon from "./WhatsAppIcon";

const PricingCard = ({
  data,
  onSelect,
}: {
  data: (typeof PACKAGES)[number];
  onSelect: (cta: string) => void;
}) => (
  <div
    className={`bg-white rounded-2xl shadow-sm hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col border relative ${data.borderColor} ${data.popular ? "border-2 md:-translate-y-4 border-yellow-500" : "border border-slate-100"}`}
  >
    {data.popular && (
      <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm z-10">
        PALING LARIS
      </div>
    )}
    <div className="p-8 grow">
      <h3 className="text-xl font-bold text-slate-800">{data.name}</h3>
      <p className="text-sm text-slate-500 mt-2 min-h-10">{data.target}</p>
      <div className="my-8">
        <span className="text-3xl font-bold text-slate-900">
          Rp {data.price}
        </span>
        <span className="text-slate-400 text-sm">{data.unit}</span>
      </div>
      <ul className="space-y-4 text-slate-600 text-sm mb-8">
        {data.features.map((feat: any, i: number) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="text-green-500 w-5 h-5 shrink-0" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="p-4 bg-slate-50 border-t border-slate-100">
      <button
        onClick={() => onSelect(data.cta)}
        className={`w-full py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-sm ${data.buttonStyle}`}
      >
        <WhatsAppIcon className="w-5 h-5" /> Pesan Sekarang
      </button>
    </div>
  </div>
);

export default PricingCard;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

const PricingCard = ({
  data,
  onSelect,
}: {
  data: any;
  onSelect: (cta: any) => void;
}) => (
  <div
    className={`bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden flex flex-col border relative ${data.borderColor} ${data.popular ? "border-3 md:-translate-y-4 border-yellow-500" : "border border-slate-100"}`}
  >
    {data.popular && (
      <div className="absolute top-0 right-0 bg-yellow-400 text-black font-black text-[10px] px-6 py-2 uppercase tracking-widest rounded-bl-2xl">
        Terpopuler
      </div>
    )}
    <div className="p-8 grow">
      <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-2">
        {data.name}
      </h3>
      <p className="text-slate-400 text-xs font-bold uppercase mb-8 tracking-widest">
        {data.target}
      </p>
      <div className="mb-10">
        <span className="text-5xl font-black text-slate-900 tracking-tighter">
          Rp {data.price}
        </span>
        <span className="text-slate-400 text-sm font-bold uppercase ml-2 tracking-widest">
          {data.unit}
        </span>
      </div>
      {data.price2 && (
        <div className="mb-10">
          <span className="text-5xl font-black text-slate-900 tracking-tighter">
            Rp {data.price2}
          </span>
          <span className="text-slate-400 text-sm font-bold uppercase ml-2 tracking-widest">
            {data.unit2}
          </span>
        </div>
      )}
      <ul className="space-y-4 mb-10">
        {data.features.map((feat: string, i: number) => (
          <li
            key={i}
            className="flex items-center gap-3 text-sm font-bold text-slate-700"
          >
            <Check className="text-green-400" size={18} />
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

/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/sections/Testimonials.tsx

import React from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../lib/constants";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({
  title,
  subtitle,
  testimonials,
}) => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">
          Kata Mereka
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testi, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-slate-100 hover:shadow-lg transition duration-300"
            >
              <div className="flex text-yellow-400 mb-4 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 italic leading-relaxed">
                {testi.content}
              </p>
              <div className="border-t border-slate-200 pt-4">
                <div className="font-bold text-slate-800">{testi.name}</div>
                <div className="text-sm text-brand-blue">{testi.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

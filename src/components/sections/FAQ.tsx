/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/sections/FAQ.tsx

import React from "react";
import { FAQS, FAQS_PKP } from "../../lib/constants";
import FAQItem from "../ui/FAQItem";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  id: string;
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
  type?: "npwp" | "pkp" | "spt";
}

const FAQ: React.FC<FAQProps> = ({ id, title, subtitle, items, type }) => {
  const faqs = type === "pkp" ? FAQS_PKP : FAQS;
  return (
    <section id={id} className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
          Pertanyaan Sering Diajukan
        </h2>
        <div className="space-y-4">
          {faqs.map(
            (
              faq: { question: string; answer: string },
              idx: React.Key | null | undefined,
            ) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

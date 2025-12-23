// src/components/ui/FAQItem.tsx

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
      >
        <span className="font-bold text-lg text-slate-800">{question}</span>
        {isOpen ? (
          <ChevronUp className="text-slate-400" />
        ) : (
          <ChevronDown className="text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
};
export default FAQItem;

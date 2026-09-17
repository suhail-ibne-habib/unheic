"use client";

import { useState } from "react";
import { faqs } from "@/lib/faq";

export function FaqList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
      <p className="text-center text-[11px] font-semibold tracking-[0.22em] text-blue-600 uppercase">
        Knowledge base
      </p>
      <h2 className="mt-3 text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Frequently Asked Questions
      </h2>
      <div className="mt-8 space-y-3">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question}
              className="rounded-2xl border border-slate-100 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="text-sm font-semibold text-slate-800">
                  {item.question}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path
                      d="M5 8l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-panel-${index}`}
                role="region"
                className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm leading-6 text-slate-500">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

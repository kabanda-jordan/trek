"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/page-header";

const faqs = [
  { q: "How do I book a safari?", a: "Navigate to the Safaris page, select your preferred experience, choose your dates and group size, then complete the booking form. You will receive a confirmation email with your booking reference." },
  { q: "What is the cancellation policy?", a: "Most experiences offer free cancellation up to 48 hours before the scheduled date. Some experiences, particularly gorilla trekking permits, have stricter cancellation terms due to limited availability." },
  { q: "Do I need a visa to visit Rwanda?", a: "Most nationalities can obtain a visa on arrival or apply for an e-Visa before travel. Citizens of East African Community member states do not need a visa. Check the Rwanda Immigration website for current requirements." },
  { q: "What should I pack for a gorilla trek?", a: "Essential items include sturdy hiking boots, long trousers, a rain jacket, garden gloves, a hat, sunscreen, and a daypack. Your tour operator will provide a detailed packing list upon booking confirmation." },
  { q: "Is Rwanda safe for tourists?", a: "Rwanda is one of the safest countries in Africa. The country has low crime rates and a strong focus on tourism security. Park rangers accompany all wildlife experiences." },
  { q: "How do I hire a vehicle?", a: "Visit the Vehicles page to browse available options. You can filter by vehicle type, seating capacity, and price range. Vehicles can be hired with or without a driver." },
  { q: "Can I customize my itinerary?", a: "Yes. Contact our team directly or use the booking form to specify your preferences. We work with operators who can tailor experiences to your requirements." },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-600 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          TrekRwanda
        </span>
        <PageHeader
          title="Frequently Asked Questions"
          description="Common questions about booking, travel, and our platform."
        />
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`rounded-xl bg-white ring-1 shadow-sm transition ${isOpen ? "ring-emerald-500/40" : "ring-slate-200"}`}>
              <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                <span className={`font-semibold ${isOpen ? "text-slate-900" : "text-slate-800"}`}>{faq.q}</span>
                <span className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition ${isOpen ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                  <svg className={`h-4 w-4 transition-transform ${isOpen ? "rotate-45" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 -mt-1">
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl bg-slate-900 text-white p-6 md:p-8 text-center">
        <h3 className="text-lg font-semibold">Still have questions?</h3>
        <p className="text-sm text-slate-300 mt-1 mb-4">Our team is happy to help you plan your perfect trip.</p>
        <a href="/contact" className="inline-block rounded-lg bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-emerald-400 transition-colors">
          Contact us
        </a>
      </div>
    </div>
  );
}

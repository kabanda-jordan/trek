export default function FAQPage() {
  const faqs = [
    { q: "How do I book a safari?", a: "Navigate to the Safaris page, select your preferred experience, choose your dates and group size, then complete the booking form. You will receive a confirmation email with your booking reference." },
    { q: "What is the cancellation policy?", a: "Most experiences offer free cancellation up to 48 hours before the scheduled date. Some experiences, particularly gorilla trekking permits, have stricter cancellation terms due to limited availability." },
    { q: "Do I need a visa to visit Rwanda?", a: "Most nationalities can obtain a visa on arrival or apply for an e-Visa before travel. Citizens of East African Community member states do not need a visa. Check the Rwanda Immigration website for current requirements." },
    { q: "What should I pack for a gorilla trek?", a: "Essential items include sturdy hiking boots, long trousers, a rain jacket, garden gloves, a hat, sunscreen, and a daypack. Your tour operator will provide a detailed packing list upon booking confirmation." },
    { q: "Is Rwanda safe for tourists?", a: "Rwanda is one of the safest countries in Africa. The country has low crime rates and a strong focus on tourism security. Park rangers accompany all wildlife experiences." },
    { q: "How do I hire a vehicle?", a: "Visit the Vehicles page to browse available options. You can filter by vehicle type, seating capacity, and price range. Vehicles can be hired with or without a driver." },
    { q: "Can I customize my itinerary?", a: "Yes. Contact our team directly or use the booking form to specify your preferences. We work with operators who can tailor experiences to your requirements." },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h1>
      <p className="mt-2 text-sm text-slate-500">Common questions about booking, travel, and our platform.</p>

      <div className="mt-10 space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-slate-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-slate-900">{faq.q}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import PageHeader from "@/components/ui/page-header";

const values = [
  {
    title: "Curated Excellence",
    description: "Every experience is handpicked and vetted by local experts to ensure authenticity and quality.",
  },
  {
    title: "Transparent Pricing",
    description: "Clear, honest pricing with no hidden charges — what you see is what you pay.",
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer support throughout your entire journey in Rwanda.",
  },
  {
    title: "Sustainable Travel",
    description: "We support local communities and promote responsible, sustainable tourism.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader
        title="About TrekRwanda"
        description="Our mission is to connect travellers with Rwanda's extraordinary landscapes, wildlife, and culture."
      />

      <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm p-6 md:p-10 overflow-hidden">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-10">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Who We Are</h2>
            <p className="text-slate-600 leading-relaxed">
              TrekRwanda is a comprehensive tourism platform built to showcase the very best of Rwanda — the Land of a Thousand Hills. From the mist-covered Virunga volcanoes where mountain gorillas roam, to the golden savannahs of Akagera and the ancient canopy forests of Nyungwe, we curate experiences that are both authentic and unforgettable.
            </p>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              We believe that travel should be seamless, transparent, and enriching. Our platform brings together verified tour operators, luxury vehicles, and handpicked experiences so that every traveller can explore Rwanda with confidence.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&h=600&fit=crop" alt="Rwanda landscape" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 text-center">What Sets Us Apart</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl bg-slate-50 p-5 border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-1.5">{v.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-slate-900 p-6 md:p-8 text-white">
          <h2 className="text-xl font-semibold mb-3">Our Partners</h2>
          <p className="text-slate-300 leading-relaxed">
            We work exclusively with licensed, Rwanda Tourism Board-accredited operators and vehicle providers. Every partner on our platform undergoes rigorous quality checks to ensure the highest standards of safety, comfort, and service delivery.
          </p>
        </section>
      </div>
    </div>
  );
}

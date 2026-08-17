export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">About TrekRwanda</h1>
      <p className="mt-2 text-sm text-slate-500">Our mission is to connect travellers with Rwanda's extraordinary landscapes, wildlife, and culture.</p>

      <div className="mt-10 space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Who We Are</h2>
          <p>TrekRwanda is a comprehensive tourism platform built to showcase the very best of Rwanda — the Land of a Thousand Hills. From the mist-covered Virunga volcanoes where mountain gorillas roam, to the golden savannahs of Akagera and the ancient canopy forests of Nyungwe, we curate experiences that are both authentic and unforgettable.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Our Mission</h2>
          <p>We believe that travel should be seamless, transparent, and enriching. Our platform brings together verified tour operators, luxury vehicles, and handpicked experiences so that every traveller — from solo adventurers to high-profile groups — can explore Rwanda with confidence.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">What Sets Us Apart</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Curated experiences vetted by local experts</li>
            <li>Transparent pricing with no hidden charges</li>
            <li>24/7 customer support throughout your journey</li>
            <li>Flexible cancellation policies on most bookings</li>
            <li>Sustainable tourism practices that benefit local communities</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Our Partners</h2>
          <p>We work exclusively with licensed, Rwanda Tourism Board-accredited operators and vehicle providers. Every partner on our platform undergoes rigorous quality checks to ensure the highest standards of safety, comfort, and service delivery.</p>
        </section>
      </div>
    </div>
  );
}

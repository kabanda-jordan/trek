export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: August 2026</p>

      <div className="mt-10 space-y-8 text-sm text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>By accessing or using TrekRwanda, you agree to these Terms of Service. If you do not agree, please do not use our platform.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-2">2. Bookings and Payments</h2>
          <p>All bookings are subject to availability and confirmation. Prices are displayed in USD and include applicable taxes unless stated otherwise. Payment is required at the time of booking.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-2">3. Cancellation Policy</h2>
          <p>Free cancellation is available up to 48 hours before the scheduled experience. Cancellations within 48 hours may incur a fee. No-shows are non-refundable.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-2">4. User Responsibilities</h2>
          <p>Users must provide accurate information when booking, arrive at designated meeting points on time, and comply with all local laws and park regulations during their experiences.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-2">5. Limitation of Liability</h2>
          <p>TrekRwanda acts as a booking platform connecting travellers with service providers. We are not liable for the acts or omissions of tour operators, vehicle providers, or third-party services.</p>
        </section>
      </div>
    </div>
  );
}

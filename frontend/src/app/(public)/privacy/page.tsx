export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: August 2026</p>

      <div className="mt-10 space-y-8 text-sm text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-2">1. Information We Collect</h2>
          <p>We collect information you provide directly: name, email, phone number, and payment details when you make a booking. We also collect usage data including device information, IP addresses, and browsing patterns on our platform.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-2">2. How We Use Your Information</h2>
          <p>Your information is used to process bookings, communicate about your reservations, improve our services, send marketing communications (with your consent), and ensure platform security.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-2">3. Information Sharing</h2>
          <p>We share your booking details with confirmed tour operators and vehicle providers to fulfil your reservations. We do not sell your personal information to third parties.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-2">4. Data Security</h2>
          <p>We implement industry-standard encryption and security measures to protect your data. All payment transactions are processed through secure, PCI-compliant channels.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-slate-900 mb-2">5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time by contacting us at privacy@trekrwanda.com.</p>
        </section>
      </div>
    </div>
  );
}

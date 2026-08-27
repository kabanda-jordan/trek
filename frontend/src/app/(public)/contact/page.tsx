import PageHeader from "@/components/ui/page-header";

const contactDetails = [
  {
    title: "General Inquiries",
    email: "info@trekrwanda.com",
    phone: "+250 788 000 000",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
  },
  {
    title: "Booking Support",
    email: "bookings@trekrwanda.com",
    phone: "+250 788 000 001",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
  },
  {
    title: "Office",
    email: "KN 5 Ave, Kigali, Rwanda",
    phone: "",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    ),
  },
  {
    title: "Hours",
    email: "Mon–Fri 8AM–6PM · Sat 9AM–1PM",
    phone: "Emergency support: 24/7",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader
        title="Contact Us"
        description="Get in touch with our team for bookings, inquiries, or support. We usually respond within 24 hours."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {contactDetails.map((c) => (
            <div key={c.title} className="flex gap-4 rounded-2xl bg-white ring-1 ring-slate-200 p-5 shadow-sm">
              <div className="h-11 w-11 shrink-0 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                {c.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">{c.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{c.email}</p>
                {c.phone && <p className="text-sm text-slate-600">{c.phone}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 md:p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-5">Send a Message</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input type="text" className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <input type="text" className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea rows={5} className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-emerald-500 px-4 py-3 text-sm font-bold text-slate-900 hover:bg-emerald-400 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

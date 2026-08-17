export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Contact Us</h1>
      <p className="mt-2 text-sm text-slate-500">Get in touch with our team for bookings, inquiries, or support.</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">General Inquiries</h3>
            <p className="text-sm text-slate-600">info@trekrwanda.com</p>
            <p className="text-sm text-slate-600">+250 788 000 000</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Booking Support</h3>
            <p className="text-sm text-slate-600">bookings@trekrwanda.com</p>
            <p className="text-sm text-slate-600">+250 788 000 001</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Office</h3>
            <p className="text-sm text-slate-600">KN 5 Ave, Kigali<br />Kigali, Rwanda</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Hours</h3>
            <p className="text-sm text-slate-600">Monday - Friday: 8:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 1:00 PM<br />Emergency support: 24/7</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Send a Message</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea rows={4} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900" />
            </div>
            <button type="submit" className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

interface BookingConfirmationProps {
  bookingRef: string;
}

export default function BookingConfirmation({ bookingRef }: BookingConfirmationProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
        <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Booking Submitted</h1>
      <p className="mt-4 text-slate-600 max-w-md mx-auto">
        Your booking request has been received. We will confirm your reservation via email shortly.
      </p>
      <p className="mt-3 text-sm text-slate-500">
        Reference: <span className="font-mono font-bold text-slate-900">{bookingRef}</span>
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

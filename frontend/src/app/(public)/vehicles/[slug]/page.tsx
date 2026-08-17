import { use } from "react";
import Link from "next/link";

export default function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/vehicles" className="hover:text-slate-900">Vehicles</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">{name}</span>
      </nav>
      <div className="rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 aspect-[21/9] flex items-center justify-center mb-8">
        <svg className="h-20 w-20 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75m-7.5-3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{name}</h1>
          <p className="text-slate-500 mt-1 text-sm">Connect to backend for full vehicle details.</p>
        </div>
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-slate-200 p-6 sticky top-20">
            <p className="text-center text-sm text-slate-500">Booking details will appear here once the backend is connected.</p>
            <Link href="/booking" className="mt-4 block w-full rounded-lg bg-slate-900 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
              Book This Vehicle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

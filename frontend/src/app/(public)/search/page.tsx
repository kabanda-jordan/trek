"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Search</h1>
      <form className="mt-6 mb-8 flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, safaris, vehicles..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none" />
        </div>
        <button type="submit" className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
          Search
        </button>
      </form>
      {q && (
        <p className="text-slate-500 text-sm">Results for &ldquo;{q}&rdquo; — connect to backend API to show real results.</p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-500">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}

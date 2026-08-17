"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import HeroSlideshow from "@/components/HeroSlideshow";

const popularDestinations = [
  { name: "Volcanoes National Park", slug: "volcanoes-national-park", region: "Northern Province", tagline: "Mountain gorillas & volcanic peaks" },
  { name: "Akagera National Park", slug: "akagera-national-park", region: "Eastern Province", tagline: "Big Five savannah safari" },
  { name: "Nyungwe National Park", slug: "nyungwe-national-park", region: "Western Province", tagline: "Ancient rainforest & canopy walk" },
  { name: "Lake Kivu", slug: "lake-kivu", region: "Western Province", tagline: "Lakeside relaxation & adventure" },
  { name: "Kigali", slug: "kigali", region: "Kigali", tagline: "Culture, history & innovation" },
  { name: "Musanze", slug: "musanze", region: "Northern Province", tagline: "Caves, hikes & gorilla gateway" },
];

const topSafaris = [
  { name: "Gorilla Trekking", slug: "gorilla-trekking", days: 3, price: 1500, rating: 4.9, reviews: 342, tag: "Bestseller" },
  { name: "Akagera Big Five Safari", slug: "akagera-safari", days: 2, price: 450, rating: 4.7, reviews: 186, tag: null },
  { name: "Nyungwe Canopy Walk", slug: "nyungwe-canopy-walk", days: 1, price: 200, rating: 4.8, reviews: 224, tag: "Top Rated" },
  { name: "Lake Kivu Adventure", slug: "lake-kivu-adventure", days: 3, price: 350, rating: 4.6, reviews: 98, tag: null },
  { name: "Rwanda Cultural Immersion", slug: "cultural-immersion", days: 5, price: 800, rating: 4.8, reviews: 156, tag: "New" },
  { name: "Golden Monkey Trek", slug: "golden-monkey-trek", days: 1, price: 250, rating: 4.7, reviews: 134, tag: null },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`h-3.5 w-3.5 ${i <= Math.round(rating) ? "text-amber-400" : "text-slate-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const destIcons: Record<string, React.ReactNode> = {
  volcanoes: <svg className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21l7.5-7.5L15 21M10.5 13.5L18 6l3 3-7.5 7.5" /></svg>,
  akagera: <svg className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
  nyungwe: <svg className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
  kivu: <svg className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
  kigali: <svg className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21" /></svg>,
  musanze: <svg className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21l7.5-7.5L15 21M10.5 13.5L18 6l3 3-7.5 7.5" /></svg>,
};

function getDestIcon(slug: string) {
  if (slug.includes("volcanoes")) return destIcons.volcanoes;
  if (slug.includes("akagera")) return destIcons.akagera;
  if (slug.includes("nyungwe")) return destIcons.nyungwe;
  if (slug.includes("kivu")) return destIcons.kivu;
  if (slug.includes("kigali")) return destIcons.kigali;
  return destIcons.musanze;
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  }

  return (
    <>
      <HeroSlideshow />

      {/* Search Bar */}
      <section className="relative -mt-8 z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations, safaris, experiences..."
                className="w-full pl-10 pr-4 py-3.5 rounded-lg text-sm text-slate-900 bg-white shadow-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent" />
            </div>
            <button type="submit" className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-lg transition-colors text-sm shrink-0">
              Search
            </button>
          </div>
        </form>
        <div className="mt-4 flex flex-wrap justify-center gap-5 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Free cancellation
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            24/7 support
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
            Trusted by thousands
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Popular Destinations</h2>
            <p className="mt-1 text-sm text-slate-500">Explore Rwanda&apos;s most stunning locations</p>
          </div>
          <Link href="/destinations" className="text-sm font-medium text-emerald-700 hover:text-emerald-800 hidden sm:block">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularDestinations.map((d) => (
            <Link key={d.slug} href={`/destinations/${d.slug}`}
              className="group relative rounded-xl overflow-hidden bg-slate-100 aspect-[4/3] flex items-end">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent group-hover:from-emerald-900/80 transition-all duration-300" />
              <div className="absolute top-4 left-4">{getDestIcon(d.slug)}</div>
              <div className="relative p-5 w-full">
                <p className="text-xs font-medium text-emerald-300 uppercase tracking-wide">{d.region}</p>
                <h3 className="text-lg font-bold text-white mt-1">{d.name}</h3>
                <p className="text-sm text-gray-300 mt-0.5">{d.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link href="/destinations" className="text-sm font-medium text-emerald-700">View all destinations</Link>
        </div>
      </section>

      {/* Top Safaris */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Top Safaris & Experiences</h2>
              <p className="mt-1 text-sm text-slate-500">Book unforgettable adventures in the heart of Africa</p>
            </div>
            <Link href="/safaris" className="text-sm font-medium text-emerald-700 hover:text-emerald-800 hidden sm:block">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topSafaris.map((s) => (
              <Link key={s.slug} href={`/safaris/${s.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-100 to-slate-200">
                  {s.tag && (
                    <span className="absolute top-3 left-3 bg-slate-900 text-white text-xs font-medium px-2.5 py-1 rounded">{s.tag}</span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Stars rating={s.rating} />
                    <span className="text-xs text-slate-500">{s.rating} ({s.reviews})</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{s.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{s.days} {s.days === 1 ? "day" : "days"}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-slate-900">${s.price.toLocaleString()}</span>
                      <span className="text-xs text-slate-500 ml-1">/ person</span>
                    </div>
                    <span className="text-sm font-medium text-emerald-700 group-hover:underline">Details</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trek Rwanda */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Why Trek Rwanda</h2>
          <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">Everything you need for a seamless Rwanda experience</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>, title: "Expert Local Guides", desc: "Knowledgeable guides who bring Rwanda's wildlife and culture to life." },
            { icon: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>, title: "Best Price Guarantee", desc: "Competitive prices with no hidden fees. What you see is what you pay." },
            { icon: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" /></svg>, title: "Flexible Booking", desc: "Free cancellation on most experiences. Reserve now, pay later options available." },
          ].map((item) => (
            <div key={item.title} className="text-center p-6">
              <div className="h-14 w-14 rounded-xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-4">{item.icon}</div>
              <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-xl bg-slate-900 px-8 py-14 md:px-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 60%)"}} />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Ready to Explore Rwanda?</h2>
            <p className="mt-3 text-slate-400 max-w-lg mx-auto">
              Book your safari, find the perfect vehicle, and create memories that last a lifetime.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/booking" className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-colors">
                Book a Safari
              </Link>
              <Link href="/vehicles" className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-7 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
                Find a Vehicle
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

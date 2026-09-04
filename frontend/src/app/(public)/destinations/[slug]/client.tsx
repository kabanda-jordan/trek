"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { cloudinaryCard } from "@/lib/cloudinary";
import MapEmbed from "@/components/ui/map";

interface DestinationDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  location: string;
  district: string;
  province: string;
  coverImageUrl: string;
  openingHours: string;
  thingsToKnow: string;
  images: { id: string; imageUrl: string; caption: string }[];
  activities: { id: string; name: string }[];
}

const wikiSlugs: Record<string, string> = {
  "volcanoes-national-park": "Volcanoes_National_Park",
  "akagera-national-park": "Akagera_National_Park",
  "nyungwe-forest-national-park": "Nyungwe_Forest",
  "lake-kivu": "Lake_Kivu",
  "kigali-city": "Kigali",
  "musanze-caves": "Musanze",
  "inema-arts-center": "Kigali",
  "royal-palace-huye": "Nyanza_District",
};

function wikipediaUrl(slug: string, name: string): string {
  const known = wikiSlugs[slug];
  const page = known || name.replace(/\s+/g, "_");
  return `https://en.wikipedia.org/wiki/${page}`;
}

const fallbackImages: Record<string, string> = {
  "volcanoes-national-park": "https://images.unsplash.com/photo-1722291731448-3afe029611a6?w=1200&h=600&fit=crop",
  "akagera-national-park": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&h=600&fit=crop",
  "nyungwe-forest-national-park": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=600&fit=crop",
  "lake-kivu": "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&h=600&fit=crop",
  "kigali-city": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=600&fit=crop",
  "musanze-caves": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=600&fit=crop",
  "inema-arts-center": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=600&fit=crop",
  "royal-palace-huye": "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1200&h=600&fit=crop",
};

export default function DestinationDetailClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [dest, setDest] = useState<DestinationDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<DestinationDetail>(`/destinations/${slug}`)
      .then(setDest)
      .catch(() => setDest(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const heroImg = dest?.coverImageUrl
    ? cloudinaryCard(dest.coverImageUrl)
    : fallbackImages[slug] || "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=600&fit=crop";

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-4 bg-slate-200 rounded w-48" />
          <div className="rounded-2xl bg-slate-200 aspect-[16/9] md:aspect-[21/9]" />
          <div className="h-8 bg-slate-200 rounded w-64" />
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (!dest) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Destination not found</h1>
        <Link href="/destinations" className="mt-4 inline-block text-emerald-700 hover:text-emerald-800 font-medium">Back to destinations</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/destinations" className="hover:text-emerald-700">Destinations</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium truncate">{dest.name}</span>
      </nav>

      <div className="rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-slate-100 relative">
        <img src={heroImg} alt={dest.name} className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{dest.name}</h1>
          <p className="mt-1 text-gray-500">{dest.location}{dest.province ? `, ${dest.province} Province` : ""}</p>

          {dest.description && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-gray-600 leading-relaxed">{dest.description}</p>
              <a
                href={wikipediaUrl(slug, dest.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                Read more on Wikipedia
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Map & Directions</h2>
            <MapEmbed destinationName={dest.name} location={dest.location} height="h-72" />
          </div>

          {dest.activities && dest.activities.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Activities</h2>
              <div className="flex flex-wrap gap-2">
                {dest.activities.map(a => (
                  <span key={a.id} className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium">{a.name}</span>
                ))}
              </div>
            </div>
          )}

          {dest.thingsToKnow && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Things to Know</h2>
              <p className="text-gray-600 leading-relaxed">{dest.thingsToKnow}</p>
            </div>
          )}

          {dest.images && dest.images.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dest.images.map(img => (
                  <div key={img.id} className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100">
                    <img src={img.imageUrl} alt={img.caption || dest.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 p-6 lg:sticky lg:top-20">
            <h3 className="font-semibold text-gray-900 mb-4">Visitor Information</h3>
            <div className="space-y-3 text-sm">
              {dest.openingHours && (
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <div><p className="font-medium text-gray-900">Opening Hours</p><p className="text-gray-500">{dest.openingHours}</p></div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                <div><p className="font-medium text-gray-900">Location</p><p className="text-gray-500">{dest.location}</p></div>
              </div>
              {dest.district && (
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  <div><p className="font-medium text-gray-900">District</p><p className="text-gray-500">{dest.district}</p></div>
                </div>
              )}
            </div>
            <div className="mt-5">
              <MapEmbed destinationName={dest.name} location={dest.location} height="h-40" showDirections={false} />
            </div>
            <div className="mt-5">
              <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Learn More</h4>
              <div className="space-y-2">
                <a
                  href={wikipediaUrl(slug, dest.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-colors"
                >
                  <svg className="h-4 w-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm5 8h-2v-3h-2v-2h2v-3h2v3h2v2h-2v3z" transform="scale(0.85) translate(2 2)" /></svg>
                  Wikipedia
                  <svg className="h-3.5 w-3.5 ml-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(dest.name + " Rwanda")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-colors"
                >
                  <svg className="h-4 w-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  Search the web
                  <svg className="h-3.5 w-3.5 ml-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            </div>
            <Link href="/booking" className="mt-6 block w-full rounded-xl bg-emerald-700 py-3 text-center text-sm font-bold text-white hover:bg-emerald-800 transition-colors">
              Book a Safari
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

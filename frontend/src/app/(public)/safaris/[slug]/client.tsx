"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { cloudinaryCard } from "@/lib/cloudinary";
import { formatPrice, getDifficultyLabel } from "@/lib/utils";

interface SafariDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  durationDays: number;
  durationNights: number;
  price: number;
  currency: string;
  maxParticipants: number;
  difficultyLevel: string;
  coverImageUrl: string;
  includedItems: string;
  excludedItems: string;
  itinerary: string;
  averageRating: number;
  totalReviews: number;
  activities: { id: string; name: string }[];
}

const fallbackImages: Record<string, string> = {
  "gorilla-trekking": "https://images.unsplash.com/photo-1605559911928-e03606ea0dc0?w=1200&h=600&fit=crop",
  "akagera-safari": "https://images.unsplash.com/photo-1546422737-ac2ae13984ba?w=1200&h=600&fit=crop",
  "nyungwe-canopy": "https://images.unsplash.com/photo-1761744361365-a62439c36665?w=1200&h=600&fit=crop",
  "lake-kivu-adventure": "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1200&h=600&fit=crop",
  "cultural-immersion": "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&h=600&fit=crop",
  "golden-monkey-trek": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=600&fit=crop",
};

export default function SafariDetailClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [safari, setSafari] = useState<SafariDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<SafariDetail>(`/safaris/${slug}`)
      .then(setSafari)
      .catch(() => setSafari(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const heroImg = safari?.coverImageUrl
    ? cloudinaryCard(safari.coverImageUrl)
    : fallbackImages[slug] || "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=600&fit=crop";

  const included = safari?.includedItems ? safari.includedItems.split("\n").filter(Boolean) : [];
  const excluded = safari?.excludedItems ? safari.excludedItems.split("\n").filter(Boolean) : [];

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-4 bg-slate-200 rounded w-48" />
          <div className="rounded-2xl bg-slate-200 aspect-[16/9] md:aspect-[21/9]" />
          <div className="h-8 bg-slate-200 rounded w-64" />
          <div className="h-4 bg-slate-200 rounded w-full" />
        </div>
      </div>
    );
  }

  if (!safari) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Safari not found</h1>
        <Link href="/safaris" className="mt-4 inline-block text-emerald-700 hover:text-emerald-800 font-medium">Back to safaris</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/safaris" className="hover:text-emerald-700">Safaris</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium truncate">{safari.name}</span>
      </nav>

      <div className="rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-slate-100 relative">
        <img src={heroImg} alt={safari.name} className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">{getDifficultyLabel(safari.difficultyLevel)}</span>
            <span className="text-sm text-gray-500">{safari.durationDays} days / {safari.durationNights} nights</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{safari.name}</h1>
          {safari.averageRating > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <svg key={i} className={`h-4 w-4 ${i <= Math.round(safari.averageRating) ? "text-amber-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
              <span className="text-sm text-gray-500">{safari.averageRating} ({safari.totalReviews} reviews)</span>
            </div>
          )}

          {safari.description && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Overview</h2>
              <p className="text-gray-600 leading-relaxed">{safari.description}</p>
            </div>
          )}

          {safari.itinerary && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Itinerary</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{safari.itinerary}</p>
            </div>
          )}

          {(included.length > 0 || excluded.length > 0) && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {included.length > 0 && (
                <div className="rounded-xl bg-emerald-50 p-4">
                  <h3 className="text-sm font-semibold text-emerald-800 mb-2">What&apos;s Included</h3>
                  <ul className="space-y-1.5">
                    {included.map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-emerald-700">
                        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {excluded.length > 0 && (
                <div className="rounded-xl bg-red-50 p-4">
                  <h3 className="text-sm font-semibold text-red-800 mb-2">What&apos;s Not Included</h3>
                  <ul className="space-y-1.5">
                    {excluded.map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-red-700">
                        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {safari.activities && safari.activities.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Activities</h2>
              <div className="flex flex-wrap gap-2">
                {safari.activities.map(a => (
                  <span key={a.id} className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium">{a.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 p-6 lg:sticky lg:top-20">
            <div className="text-center">
              <p className="text-sm text-gray-500">From</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{formatPrice(safari.price, safari.currency)}</p>
              <p className="text-sm text-gray-500">per person</p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between"><span>Duration</span><span className="font-medium">{safari.durationDays} days / {safari.durationNights} nights</span></div>
              <div className="flex justify-between"><span>Max group</span><span className="font-medium">{safari.maxParticipants} people</span></div>
              <div className="flex justify-between"><span>Difficulty</span><span className="font-medium">{getDifficultyLabel(safari.difficultyLevel)}</span></div>
            </div>
            <Link href="/booking" className="mt-6 block w-full rounded-xl bg-emerald-700 py-3.5 text-center text-sm font-bold text-white hover:bg-emerald-800 transition-colors shadow-lg">
              Book This Safari
            </Link>
            <p className="mt-3 text-center text-xs text-gray-500">Free cancellation up to 24 hours before</p>
          </div>
        </div>
      </div>
    </div>
  );
}

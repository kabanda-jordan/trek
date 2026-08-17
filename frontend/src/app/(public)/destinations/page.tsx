"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/ui/page-header";
import { api } from "@/lib/api";
import { cloudinaryCard } from "@/lib/cloudinary";

interface DestSummary {
  id: string;
  name: string;
  slug: string;
  location: string;
  province: string;
  shortDesc: string;
  coverImageUrl: string;
}

const fallbackImages: Record<string, string> = {
  "volcanoes-national-park": "https://images.unsplash.com/photo-1722291731448-3afe029611a6?w=800&h=600&fit=crop",
  "akagera-national-park": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=600&fit=crop",
  "nyungwe-forest-national-park": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop",
  "lake-kivu": "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
  "kigali-city": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
  "musanze-caves": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
  "inema-arts-center": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop",
  "royal-palace-huye": "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=600&fit=crop",
  "_default": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop",
};

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<DestSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<{ content: DestSummary[] }>("/destinations", { page: "0", size: "20" })
      .then((res) => setDestinations(res.content || []))
      .catch(() => setDestinations([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <PageHeader title="Destinations" description="Explore Rwanda's national parks, lakes, and cultural landmarks" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-slate-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
                <div className="h-3 bg-slate-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <PageHeader title="Destinations" description="Explore Rwanda's national parks, lakes, and cultural landmarks" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {destinations.map((d) => {
          const img = d.coverImageUrl || fallbackImages[d.slug] || fallbackImages["_default"];
          return (
            <Link key={d.slug} href={`/destinations/${d.slug}`}
              className="group block rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative aspect-[4/3] bg-slate-100">
                <img src={img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 text-xs bg-white/90 text-slate-600 px-2.5 py-1 rounded font-medium shadow-sm border border-slate-100">{d.province || d.location}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{d.name}</h3>
                <p className="mt-0.5 text-xs text-slate-400">{d.location}</p>
                {d.shortDesc && <p className="mt-2 text-sm text-slate-600 line-clamp-2">{d.shortDesc}</p>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { cloudinaryCard } from "@/lib/cloudinary";
import { formatPrice, getVehicleTypeLabel } from "@/lib/utils";

interface VehicleDetail {
  id: string;
  name: string;
  slug: string;
  type: string;
  brand: string;
  model: string;
  year: number;
  seats: number;
  transmission: string;
  fuelType: string;
  features: string;
  pricePerDay: number;
  currency: string;
  coverImageUrl: string;
  isAvailable: boolean;
  company: { name: string; phone: string; email: string };
}

export default function VehicleDetailClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [vehicle, setVehicle] = useState<VehicleDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<VehicleDetail>(`/vehicles/${slug}`)
      .then(setVehicle)
      .catch(() => setVehicle(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const heroImg = vehicle?.coverImageUrl
    ? cloudinaryCard(vehicle.coverImageUrl)
    : "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=600&fit=crop";

  const features = vehicle?.features ? vehicle.features.split(",").map(f => f.trim()).filter(Boolean) : [];

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-4 bg-slate-200 rounded w-48" />
          <div className="rounded-2xl bg-slate-200 aspect-[21/9]" />
          <div className="h-8 bg-slate-200 rounded w-64" />
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Vehicle not found</h1>
        <Link href="/vehicles" className="mt-4 inline-block text-emerald-700 hover:text-emerald-800 font-medium">Back to vehicles</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/vehicles" className="hover:text-emerald-700">Vehicles</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">{vehicle.name}</span>
      </nav>

      <div className="rounded-2xl overflow-hidden aspect-[21/9] bg-slate-100 relative">
        <img src={heroImg} alt={vehicle.name} className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full">{getVehicleTypeLabel(vehicle.type)}</span>
            {!vehicle.isAvailable && <span className="bg-red-50 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">Unavailable</span>}
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{vehicle.name}</h1>
          <p className="text-slate-500 mt-1">{vehicle.company?.name || "Rental Partner"}</p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {vehicle.brand && (
              <div className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="text-xs text-slate-500">Brand</p>
                <p className="font-semibold text-slate-900">{vehicle.brand}</p>
              </div>
            )}
            {vehicle.model && (
              <div className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="text-xs text-slate-500">Model</p>
                <p className="font-semibold text-slate-900">{vehicle.model}</p>
              </div>
            )}
            {vehicle.year && (
              <div className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="text-xs text-slate-500">Year</p>
                <p className="font-semibold text-slate-900">{vehicle.year}</p>
              </div>
            )}
            <div className="rounded-xl bg-slate-50 p-4 text-center">
              <p className="text-xs text-slate-500">Seats</p>
              <p className="font-semibold text-slate-900">{vehicle.seats}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500 mb-1">Transmission</p>
              <p className="font-semibold text-slate-900">{vehicle.transmission}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500 mb-1">Fuel Type</p>
              <p className="font-semibold text-slate-900">{vehicle.fuelType}</p>
            </div>
          </div>

          {features.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Features</h2>
              <div className="flex flex-wrap gap-2">
                {features.map(f => (
                  <span key={f} className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium">{f}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-slate-200 p-6 sticky top-20">
            <div className="text-center">
              <p className="text-sm text-slate-500">From</p>
              <p className="text-3xl font-bold text-slate-900">{formatPrice(vehicle.pricePerDay, vehicle.currency)}/day</p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex justify-between"><span>Type</span><span className="font-medium">{getVehicleTypeLabel(vehicle.type)}</span></div>
              <div className="flex justify-between"><span>Seats</span><span className="font-medium">{vehicle.seats}</span></div>
              <div className="flex justify-between"><span>Transmission</span><span className="font-medium">{vehicle.transmission}</span></div>
            </div>
            <Link href="/booking" className="mt-6 block w-full rounded-xl bg-emerald-700 py-3.5 text-center text-sm font-bold text-white hover:bg-emerald-800 transition-colors shadow-lg">
              Book This Vehicle
            </Link>
            <p className="mt-3 text-center text-xs text-slate-500">Free cancellation up to 24 hours before</p>
          </div>
        </div>
      </div>
    </div>
  );
}

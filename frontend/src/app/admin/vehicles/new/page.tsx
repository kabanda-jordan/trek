"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import PageHeader from "@/components/ui/page-header";
import Card, { CardContent } from "@/components/ui/card";
import CloudinaryUpload, { ImagePreview } from "@/components/ui/cloudinary-upload";

export default function AdminVehiclesNewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "SUV",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    seats: 5,
    transmission: "AUTOMATIC",
    fuelType: "DIESEL",
    pricePerDay: "",
    features: "",
    coverImageUrl: "",
  });

  const set = (field: string, value: string | number) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.pricePerDay) return alert("Name and price are required");
    setSaving(true);
    try {
      await api.post("/admin/vehicles", {
        ...form,
        pricePerDay: Number(form.pricePerDay),
      });
      router.push("/admin/vehicles");
    } catch (err: any) {
      alert(err.message || "Failed to create vehicle");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="Add Vehicle" description="Add a new vehicle to the platform" />
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Toyota Land Cruiser" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select value={form.type} onChange={(e) => set("type", e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="CAR">Car</option>
                  <option value="SUV">SUV</option>
                  <option value="SAFARI_VEHICLE">Safari Vehicle</option>
                  <option value="VAN">Van</option>
                  <option value="MINIBUS">Minibus</option>
                  <option value="LUXURY">Luxury</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Brand</label>
                <input type="text" value={form.brand} onChange={(e) => set("brand", e.target.value)} placeholder="e.g. Toyota" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                <input type="text" value={form.model} onChange={(e) => set("model", e.target.value)} placeholder="e.g. Land Cruiser" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
                <input type="number" min={2000} max={2030} value={form.year} onChange={(e) => set("year", Number(e.target.value))} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Seats</label>
                <input type="number" min={1} value={form.seats} onChange={(e) => set("seats", Number(e.target.value))} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Transmission</label>
                <select value={form.transmission} onChange={(e) => set("transmission", e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="AUTOMATIC">Automatic</option>
                  <option value="MANUAL">Manual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Fuel Type</label>
                <select value={form.fuelType} onChange={(e) => set("fuelType", e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="DIESEL">Diesel</option>
                  <option value="PETROL">Petrol</option>
                  <option value="HYBRID">Hybrid</option>
                  <option value="ELECTRIC">Electric</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price/Day (USD) *</label>
                <input type="number" min={0} value={form.pricePerDay} onChange={(e) => set("pricePerDay", e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Features</label>
                <textarea rows={3} value={form.features} onChange={(e) => set("features", e.target.value)} placeholder="AC, GPS, 4WD, etc." className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image</label>
                {form.coverImageUrl ? (
                  <ImagePreview url={form.coverImageUrl} onRemove={() => set("coverImageUrl", "")} />
                ) : (
                  <CloudinaryUpload
                    cloudName="t99lwcej"
                    uploadPreset="trek-rwanda"
                    folder="vehicles"
                    onUpload={(url) => set("coverImageUrl", url)}
                    label="Upload Cover Image"
                  />
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
                {saving ? "Creating..." : "Create Vehicle"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

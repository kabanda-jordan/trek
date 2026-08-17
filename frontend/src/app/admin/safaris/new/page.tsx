"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import PageHeader from "@/components/ui/page-header";
import Card, { CardContent } from "@/components/ui/card";
import CloudinaryUpload, { ImagePreview } from "@/components/ui/cloudinary-upload";

export default function AdminSafarisNewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    shortDesc: "",
    durationDays: 1,
    durationNights: 0,
    price: "",
    maxParticipants: 10,
    difficultyLevel: "MODERATE",
    includedItems: "",
    excludedItems: "",
    itinerary: "",
    coverImageUrl: "",
  });

  const set = (field: string, value: string | number) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return alert("Name and price are required");
    setSaving(true);
    try {
      await api.post("/admin/safaris", {
        ...form,
        price: Number(form.price),
      });
      router.push("/admin/safaris");
    } catch (err: any) {
      alert(err.message || "Failed to create safari");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="Add Safari" description="Create a new safari experience" />
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
              <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Gorilla Trekking Experience" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
              <input type="text" value={form.shortDesc} onChange={(e) => set("shortDesc", e.target.value)} placeholder="Brief one-liner" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea rows={5} value={form.description} onChange={(e) => set("description", e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Duration (Days) *</label>
                <input type="number" min={1} value={form.durationDays} onChange={(e) => set("durationDays", Number(e.target.value))} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nights</label>
                <input type="number" min={0} value={form.durationNights} onChange={(e) => set("durationNights", Number(e.target.value))} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price (USD) *</label>
                <input type="number" min={0} value={form.price} onChange={(e) => set("price", e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Max Group</label>
                <input type="number" min={1} value={form.maxParticipants} onChange={(e) => set("maxParticipants", Number(e.target.value))} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Difficulty</label>
                <select value={form.difficultyLevel} onChange={(e) => set("difficultyLevel", e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="EASY">Easy</option>
                  <option value="MODERATE">Moderate</option>
                  <option value="CHALLENGING">Challenging</option>
                  <option value="STRENUOUS">Strenuous</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image</label>
                {form.coverImageUrl ? (
                  <ImagePreview url={form.coverImageUrl} onRemove={() => set("coverImageUrl", "")} />
                ) : (
                  <CloudinaryUpload
                    cloudName="t99lwcej"
                    uploadPreset="trek-rwanda"
                    folder="safaris"
                    onUpload={(url) => set("coverImageUrl", url)}
                    label="Upload Cover Image"
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Itinerary</label>
              <textarea rows={4} value={form.itinerary} onChange={(e) => set("itinerary", e.target.value)} placeholder="Day-by-day schedule..." className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Included Items</label>
                <textarea rows={3} value={form.includedItems} onChange={(e) => set("includedItems", e.target.value)} placeholder="One per line..." className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Excluded Items</label>
                <textarea rows={3} value={form.excludedItems} onChange={(e) => set("excludedItems", e.target.value)} placeholder="One per line..." className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
                {saving ? "Creating..." : "Create Safari"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

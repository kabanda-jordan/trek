"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import PageHeader from "@/components/ui/page-header";
import Card, { CardContent } from "@/components/ui/card";
import CloudinaryUpload, { ImagePreview } from "@/components/ui/cloudinary-upload";

export default function AdminDestinationsNewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    shortDesc: "",
    location: "",
    district: "",
    province: "",
    openingHours: "",
    thingsToKnow: "",
    coverImageUrl: "",
  });

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Name is required");
    setSaving(true);
    try {
      await api.post("/admin/destinations", form);
      router.push("/admin/destinations");
    } catch (err: any) {
      alert(err.message || "Failed to create destination");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="Add Destination" description="Create a new tourism destination" />
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
              <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Volcanoes National Park" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
              <input type="text" value={form.shortDesc} onChange={(e) => set("shortDesc", e.target.value)} placeholder="Brief one-liner" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea rows={5} value={form.description} onChange={(e) => set("description", e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location *</label>
                <input type="text" value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Musanze" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">District</label>
                <input type="text" value={form.district} onChange={(e) => set("district", e.target.value)} placeholder="e.g. Musanze" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Province</label>
                <input type="text" value={form.province} onChange={(e) => set("province", e.target.value)} placeholder="e.g. Northern" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Opening Hours</label>
                <input type="text" value={form.openingHours} onChange={(e) => set("openingHours", e.target.value)} placeholder="e.g. 8:00 AM - 5:00 PM" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image</label>
                {form.coverImageUrl ? (
                  <ImagePreview url={form.coverImageUrl} onRemove={() => set("coverImageUrl", "")} />
                ) : (
                  <CloudinaryUpload
                    cloudName="t99lwcej"
                    uploadPreset="trek-rwanda"
                    folder="destinations"
                    onUpload={(url) => set("coverImageUrl", url)}
                    label="Upload Cover Image"
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Things to Know</label>
              <textarea rows={3} value={form.thingsToKnow} onChange={(e) => set("thingsToKnow", e.target.value)} placeholder="Tips for visitors..." className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
                {saving ? "Creating..." : "Create Destination"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

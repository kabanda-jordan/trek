"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import PageHeader from "@/components/ui/page-header";
import Card, { CardContent } from "@/components/ui/card";

export default function AdminCompaniesNewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    phone: "",
    email: "",
    website: "",
    address: "",
  });

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Company name is required");
    setSaving(true);
    try {
      await api.post("/admin/companies", form);
      router.push("/admin/companies");
    } catch (err: any) {
      alert(err.message || "Failed to create company");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="Add Company" description="Register a new vehicle company" />
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company Name *</label>
              <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. ABC Tours Rwanda" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+250788123456" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="info@company.rw" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
                <input type="url" value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://..." className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                <input type="text" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Kigali, Rwanda" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
                {saving ? "Creating..." : "Create Company"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

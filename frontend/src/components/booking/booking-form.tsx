"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { Safari, Vehicle } from "@/types";
import { Spinner } from "@/components/admin/spinner";
import { formatPrice } from "@/lib/utils";

interface BookingFormProps {
  safaris: Safari[];
  vehicles: Vehicle[];
  onSubmitted: (ref: string) => void;
}

export default function BookingForm({ safaris, vehicles, onSubmitted }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    safariId: "",
    vehicleId: "",
    startDate: "",
    endDate: "",
    participants: 1,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    specialRequests: "",
  });

  const set = (field: string, value: string | number) => setForm((f) => ({ ...f, [field]: value }));

  const selectedSafari = safaris.find((s) => s.id === form.safariId);
  const selectedVehicle = vehicles.find((v) => v.id === form.vehicleId);

  const estimatedTotal = (selectedSafari?.price || 0) * form.participants +
    (selectedVehicle?.pricePerDay || 0) * Math.max(1, Math.ceil((new Date(form.endDate).getTime() - new Date(form.startDate).getTime()) / 86400000));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.safariId || !form.startDate || !form.endDate || !form.customerName || !form.customerEmail) {
      return alert("Please fill in all required fields");
    }
    setSubmitting(true);
    try {
      const res = await api.post<{ bookingRef: string }>("/bookings", {
        safariId: form.safariId || undefined,
        vehicleId: form.vehicleId || undefined,
        startDate: form.startDate,
        endDate: form.endDate,
        participants: form.participants,
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        specialRequests: form.specialRequests,
      });
      onSubmitted(res.bookingRef);
    } catch (err: any) {
      alert(err.message || "Failed to submit booking");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mt-8 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${s <= step ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-500"}`}>
              {s}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${s <= step ? "text-slate-900" : "text-slate-400"}`}>
              {s === 1 ? "Experience" : s === 2 ? "Dates" : "Details"}
            </span>
            {s < 3 && <div className={`flex-1 h-px ${s < step ? "bg-slate-900" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-base font-semibold text-slate-900">Select Your Experience</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Safari / Experience *</label>
              <select value={form.safariId} onChange={(e) => set("safariId", e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none">
                <option value="">Choose a safari...</option>
                {safaris.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} — {formatPrice(s.price, s.currency)}/person ({s.durationDays}d)</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Vehicle <span className="text-slate-400">(optional)</span></label>
              <select value={form.vehicleId} onChange={(e) => set("vehicleId", e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none">
                <option value="">No vehicle needed</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>{v.name} — {formatPrice(v.pricePerDay, v.currency)}/day</option>
                ))}
              </select>
            </div>
            <button onClick={() => setStep(2)} className="w-full rounded-md bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">Continue</button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="text-base font-semibold text-slate-900">Choose Dates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Start Date *</label>
                <input type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">End Date *</label>
                <input type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Participants</label>
              <input type="number" min={1} value={form.participants} onChange={(e) => set("participants", Number(e.target.value))} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 rounded-md border border-slate-300 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 rounded-md bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">Continue</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-base font-semibold text-slate-900">Your Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                <input type="text" value={form.customerName} onChange={(e) => set("customerName", e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                <input type="email" value={form.customerEmail} onChange={(e) => set("customerEmail", e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
              <input type="tel" value={form.customerPhone} onChange={(e) => set("customerPhone", e.target.value)} placeholder="+250788123456" className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Special Requests</label>
              <textarea rows={3} value={form.specialRequests} onChange={(e) => set("specialRequests", e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none" />
            </div>
            {estimatedTotal > 0 && (
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Estimated Total</span>
                  <span className="font-bold text-slate-900">{formatPrice(estimatedTotal)}</span>
                </div>
              </div>
            )}
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="flex-1 rounded-md border border-slate-300 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">Back</button>
              <button type="submit" disabled={submitting} className="flex-1 rounded-md bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting && <Spinner size="sm" className="text-white" />}
                {submitting ? "Submitting..." : "Submit Booking"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

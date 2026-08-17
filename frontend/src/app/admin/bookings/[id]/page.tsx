"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { Booking } from "@/types";
import PageHeader from "@/components/ui/page-header";
import Card, { CardContent } from "@/components/ui/card";
import { formatPrice, getStatusColor, formatDateShort } from "@/lib/utils";

const statusOptions = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

export default function AdminBookingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get<Booking>(`/admin/bookings/${id}`)
      .then((b) => {
        setBooking(b);
        setNotes(b.adminNotes || "");
      })
      .catch(() => router.push("/admin/bookings"))
      .finally(() => setLoading(false));
  }, [id, router]);

  const updateStatus = async (status: string) => {
    setSaving(true);
    await api.put(`/admin/bookings/${id}/status`, { status });
    const updated = await api.get<Booking>(`/admin/bookings/${id}`);
    setBooking(updated);
    setSaving(false);
  };

  const saveNotes = async () => {
    setSaving(true);
    await api.put(`/admin/bookings/${id}/notes`, { adminNotes: notes });
    const updated = await api.get<Booking>(`/admin/bookings/${id}`);
    setBooking(updated);
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <svg className="animate-spin h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (!booking) return null;

  return (
    <>
      <PageHeader
        title={`Booking ${booking.bookingRef}`}
        description={`${booking.customerName} - ${formatDateShort(booking.startDate)} to ${formatDateShort(booking.endDate)}`}
        actions={
          <button onClick={() => router.push("/admin/bookings")} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
            Back to Bookings
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Booking Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Status</span>
                  <div className="mt-1">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Payment</span>
                  <div className="mt-1">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Total Price</span>
                  <p className="font-semibold text-slate-900">{formatPrice(booking.totalPrice, booking.currency)}</p>
                </div>
                <div>
                  <span className="text-slate-500">Participants</span>
                  <p className="font-semibold text-slate-900">{booking.participants}</p>
                </div>
                {booking.safari && (
                  <div>
                    <span className="text-slate-500">Safari</span>
                    <p className="text-slate-900">{booking.safari.name}</p>
                  </div>
                )}
                {booking.destination && (
                  <div>
                    <span className="text-slate-500">Destination</span>
                    <p className="text-slate-900">{booking.destination.name}</p>
                  </div>
                )}
              </div>
              {booking.specialRequests && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-sm text-slate-500">Special Requests</span>
                  <p className="mt-1 text-sm text-slate-700">{booking.specialRequests}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Admin Notes</h3>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes about this booking..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button onClick={saveNotes} disabled={saving} className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
                {saving ? "Saving..." : "Save Notes"}
              </button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Customer</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-slate-500">Name</span>
                  <p className="text-slate-900 font-medium">{booking.customerName}</p>
                </div>
                <div>
                  <span className="text-slate-500">Email</span>
                  <p className="text-slate-900">{booking.customerEmail}</p>
                </div>
                {booking.customerPhone && (
                  <div>
                    <span className="text-slate-500">Phone</span>
                    <p className="text-slate-900">{booking.customerPhone}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Update Status</h3>
              <div className="space-y-2">
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(s)}
                    disabled={saving || booking.status === s}
                    className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      booking.status === s
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    } disabled:opacity-50`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

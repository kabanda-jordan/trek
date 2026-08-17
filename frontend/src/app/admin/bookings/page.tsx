"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { PageResponse, Booking } from "@/types";
import PageHeader from "@/components/ui/page-header";
import Card from "@/components/ui/card";
import { formatPrice, getStatusColor, formatDateShort } from "@/lib/utils";

const statusFilters = ["", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

export default function AdminBookingsPage() {
  const [data, setData] = useState<PageResponse<Booking> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");

  const load = (p: number, status: string) => {
    setLoading(true);
    const params: Record<string, string> = { page: String(p), size: "10" };
    if (status) params.status = status;
    api
      .get<PageResponse<Booking>>("/admin/bookings", params)
      .then(setData)
      .catch(() => setData({ content: [], totalElements: 0, totalPages: 0, currentPage: 0, size: 10 }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(page, statusFilter); }, [page, statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    await api.put(`/admin/bookings/${id}/status`, { status });
    load(page, statusFilter);
  };

  return (
    <>
      <PageHeader title="Bookings" description="Manage customer reservations" />
      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => { setStatusFilter(s); setPage(0); }}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${statusFilter === s ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            {s || "All"}
          </button>
        ))}
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-500">
                <th className="px-6 py-3 font-medium">Ref</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Dates</th>
                <th className="px-6 py-3 font-medium">Participants</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>
              ) : data?.content.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-400">No bookings found</td></tr>
              ) : (
                data?.content.map((b) => (
                  <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-xs font-medium text-slate-900">{b.bookingRef}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{b.customerName}</div>
                      <div className="text-xs text-slate-500">{b.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs">
                      {formatDateShort(b.startDate)} - {formatDateShort(b.endDate)}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{b.participants}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{formatPrice(b.totalPrice, b.currency)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a href={`/admin/bookings/view?id=${b.id}`} className="text-emerald-700 hover:text-emerald-800 font-medium text-xs">View</a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100">
            <span className="text-xs text-slate-500">{data.totalElements} total</span>
            <div className="flex gap-2">
              <button disabled={page === 0} onClick={() => setPage(page - 1)} className="rounded px-3 py-1 text-xs border border-slate-200 disabled:opacity-40 hover:bg-slate-50">Prev</button>
              <span className="px-3 py-1 text-xs text-slate-500">{page + 1} / {data.totalPages}</span>
              <button disabled={page >= data.totalPages - 1} onClick={() => setPage(page + 1)} className="rounded px-3 py-1 text-xs border border-slate-200 disabled:opacity-40 hover:bg-slate-50">Next</button>
            </div>
          </div>
        )}
      </Card>
    </>
  );
}

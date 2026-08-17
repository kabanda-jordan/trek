"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { PageResponse, Review } from "@/types";
import PageHeader from "@/components/ui/page-header";
import Card from "@/components/ui/card";
import { formatDateShort } from "@/lib/utils";

export default function AdminReviewsPage() {
  const [data, setData] = useState<PageResponse<Review> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const load = (p: number, all: boolean) => {
    setLoading(true);
    api
      .get<PageResponse<Review>>("/admin/reviews", { approved: String(all), page: String(p), size: "10" })
      .then(setData)
      .catch(() => setData({ content: [], totalElements: 0, totalPages: 0, currentPage: 0, size: 10 }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(page, showAll); }, [page, showAll]);

  const approve = async (id: string) => {
    await api.put(`/admin/reviews/${id}/approve`);
    load(page, showAll);
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    await api.delete(`/admin/reviews/${id}`);
    load(page, showAll);
  };

  return (
    <>
      <PageHeader title="Reviews" description="Moderate customer reviews" />
      <div className="flex gap-2 mb-6">
        <button onClick={() => { setShowAll(false); setPage(0); }} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${!showAll ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
          Pending
        </button>
        <button onClick={() => { setShowAll(true); setPage(0); }} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${showAll ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
          All Reviews
        </button>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-500">
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Rating</th>
                <th className="px-6 py-3 font-medium">Comment</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>
              ) : data?.content.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">No reviews found</td></tr>
              ) : (
                data?.content.map((r) => (
                  <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{r.userName}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className={`h-4 w-4 ${star <= r.rating ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{r.title ? `${r.title}: ` : ""}{r.comment}</td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{formatDateShort(r.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${r.isApproved ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {r.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {!r.isApproved && (
                        <button onClick={() => approve(r.id)} className="text-emerald-700 hover:text-emerald-800 font-medium text-xs">Approve</button>
                      )}
                      <button onClick={() => deleteReview(r.id)} className="text-red-600 hover:text-red-700 font-medium text-xs">Delete</button>
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

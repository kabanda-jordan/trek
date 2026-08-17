"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { PageResponse, Safari } from "@/types";
import PageHeader from "@/components/ui/page-header";
import Card from "@/components/ui/card";
import { formatPrice, getDifficultyLabel } from "@/lib/utils";

export default function AdminSafarisPage() {
  const router = useRouter();
  const [data, setData] = useState<PageResponse<Safari> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const load = (p: number) => {
    setLoading(true);
    api
      .get<PageResponse<Safari>>("/admin/safaris", { page: String(p), size: "10" })
      .then(setData)
      .catch(() => setData({ content: [], totalElements: 0, totalPages: 0, currentPage: 0, size: 10 }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(page); }, [page]);

  const togglePublish = async (id: string) => {
    await api.put(`/admin/safaris/${id}/publish`);
    load(page);
  };

  const deleteSafari = async (id: string) => {
    if (!confirm("Delete this safari?")) return;
    await api.delete(`/admin/safaris/${id}`);
    load(page);
  };

  return (
    <>
      <PageHeader
        title="Safaris"
        description="Manage safari experiences"
        actions={
          <button onClick={() => router.push("/admin/safaris/new")} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            + Add Safari
          </button>
        }
      />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-500">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Duration</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Difficulty</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>
              ) : data?.content.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">No safaris found</td></tr>
              ) : (
                data?.content.map((s) => (
                  <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{s.name}</td>
                    <td className="px-6 py-4 text-slate-600">{s.durationDays}d / {s.durationNights}n</td>
                    <td className="px-6 py-4 text-slate-900 font-medium">{formatPrice(s.price, s.currency)}</td>
                    <td className="px-6 py-4 text-slate-600">{getDifficultyLabel(s.difficultyLevel)}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => togglePublish(s.id)} className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer ${s.isPublished ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                        {s.isPublished ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="px-6 py-4 space-x-3">
                      <button onClick={() => router.push(`/admin/safaris/edit?id=${s.id}`)} className="text-emerald-700 hover:text-emerald-800 font-medium">Edit</button>
                      <button onClick={() => deleteSafari(s.id)} className="text-red-600 hover:text-red-700 font-medium">Delete</button>
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

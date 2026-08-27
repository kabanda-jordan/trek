"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { PageResponse, Destination } from "@/types";
import PageHeader from "@/components/ui/page-header";
import Card from "@/components/ui/card";

export default function AdminDestinationsPage() {
  const router = useRouter();
  const [data, setData] = useState<PageResponse<Destination> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const load = (p: number) => {
    setLoading(true);
    api
      .get<PageResponse<Destination>>("/admin/destinations", { page: String(p), size: "10" })
      .then(setData)
      .catch(() => setData({ content: [], totalElements: 0, totalPages: 0, currentPage: 0, size: 10 }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(page); }, [page]);

  const togglePublish = async (id: string) => {
    await api.put(`/admin/destinations/${id}/publish`);
    load(page);
  };

  const toggleFeatured = async (id: string) => {
    await api.put(`/admin/destinations/${id}/feature`);
    load(page);
  };

  const deleteDest = async (id: string) => {
    if (!confirm("Delete this destination?")) return;
    await api.delete(`/admin/destinations/${id}`);
    load(page);
  };

  return (
    <>
      <PageHeader
        title="Destinations"
        description="Manage your tourism destinations"
        actions={
          <button onClick={() => router.push("/admin/destinations/new")} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            + Add Destination
          </button>
        }
      />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-500">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Location</th>
                <th className="px-6 py-3 font-medium">Province</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Featured</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>
              ) : data?.content.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">No destinations found</td></tr>
              ) : (
                data?.content.map((d) => (
                  <tr key={d.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{d.name}</td>
                    <td className="px-6 py-4 text-slate-600">{d.location}</td>
                    <td className="px-6 py-4 text-slate-600">{d.province || d.district || "-"}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => togglePublish(d.id)} className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer ${d.isPublished ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                        {d.isPublished ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleFeatured(d.id)} title={d.isFeatured ? "Unpin from landing page" : "Pin to landing page"}
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer ${d.isFeatured ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-600"}`}>
                        <svg className="h-3.5 w-3.5" fill={d.isFeatured ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                        {d.isFeatured ? "Pinned" : "Pin"}
                      </button>
                    </td>
                    <td className="px-6 py-4 space-x-3">
                      <button onClick={() => router.push(`/admin/destinations/edit?id=${d.id}`)} className="text-emerald-700 hover:text-emerald-800 font-medium">Edit</button>
                      <button onClick={() => deleteDest(d.id)} className="text-red-600 hover:text-red-700 font-medium">Delete</button>
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

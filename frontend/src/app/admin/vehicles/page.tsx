"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { PageResponse, Vehicle } from "@/types";
import PageHeader from "@/components/ui/page-header";
import Card from "@/components/ui/card";
import { formatPrice, getVehicleTypeLabel } from "@/lib/utils";

export default function AdminVehiclesPage() {
  const router = useRouter();
  const [data, setData] = useState<PageResponse<Vehicle> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const load = (p: number) => {
    setLoading(true);
    api
      .get<PageResponse<Vehicle>>("/admin/vehicles", { page: String(p), size: "10" })
      .then(setData)
      .catch(() => setData({ content: [], totalElements: 0, totalPages: 0, currentPage: 0, size: 10 }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(page); }, [page]);

  const toggleAvailability = async (id: string) => {
    await api.put(`/admin/vehicles/${id}/availability`);
    load(page);
  };

  const deleteVehicle = async (id: string) => {
    if (!confirm("Delete this vehicle?")) return;
    await api.delete(`/admin/vehicles/${id}`);
    load(page);
  };

  return (
    <>
      <PageHeader
        title="Vehicles"
        description="Manage tourism vehicles"
        actions={
          <button onClick={() => router.push("/admin/vehicles/new")} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            + Add Vehicle
          </button>
        }
      />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-500">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Seats</th>
                <th className="px-6 py-3 font-medium">Price/Day</th>
                <th className="px-6 py-3 font-medium">Available</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>
              ) : data?.content.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">No vehicles found</td></tr>
              ) : (
                data?.content.map((v) => (
                  <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{v.name}</td>
                    <td className="px-6 py-4 text-slate-600">{getVehicleTypeLabel(v.type)}</td>
                    <td className="px-6 py-4 text-slate-600">{v.seats}</td>
                    <td className="px-6 py-4 text-slate-900 font-medium">{formatPrice(v.pricePerDay, v.currency)}/day</td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleAvailability(v.id)} className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer ${v.isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                        {v.isAvailable ? "Available" : "Unavailable"}
                      </button>
                    </td>
                    <td className="px-6 py-4 space-x-3">
                      <button onClick={() => router.push(`/admin/vehicles/edit?id=${v.id}`)} className="text-emerald-700 hover:text-emerald-800 font-medium">Edit</button>
                      <button onClick={() => deleteVehicle(v.id)} className="text-red-600 hover:text-red-700 font-medium">Delete</button>
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

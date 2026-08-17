"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { PageResponse, User } from "@/types";
import PageHeader from "@/components/ui/page-header";
import Card from "@/components/ui/card";
import { formatDateShort } from "@/lib/utils";

export default function AdminUsersPage() {
  const [data, setData] = useState<PageResponse<User> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const load = (p: number) => {
    setLoading(true);
    api
      .get<PageResponse<User>>("/admin/users", { page: String(p), size: "10" })
      .then(setData)
      .catch(() => setData({ content: [], totalElements: 0, totalPages: 0, currentPage: 0, size: 10 }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(page); }, [page]);

  const toggleBan = async (id: string, isActive: boolean) => {
    const action = isActive ? "ban" : "unban";
    if (!confirm(`Are you sure you want to ${action} this user?`)) return;
    await api.put(`/admin/users/${id}/${action}`);
    load(page);
  };

  return (
    <>
      <PageHeader title="Users" description="Manage registered users" />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-500">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Joined</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>
              ) : data?.content.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">No users found</td></tr>
              ) : (
                data?.content.map((u) => (
                  <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{u.name}</td>
                    <td className="px-6 py-4 text-slate-600">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${u.role === "ADMIN" ? "bg-violet-50 text-violet-700" : "bg-slate-100 text-slate-600"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${u.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                        {u.isActive ? "Active" : "Banned"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{formatDateShort(u.createdAt)}</td>
                    <td className="px-6 py-4">
                      {u.role !== "ADMIN" && (
                        <button onClick={() => toggleBan(u.id, u.isActive)} className={`font-medium text-xs ${u.isActive ? "text-red-600 hover:text-red-700" : "text-emerald-700 hover:text-emerald-800"}`}>
                          {u.isActive ? "Ban" : "Unban"}
                        </button>
                      )}
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

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { VehicleCompany } from "@/types";
import PageHeader from "@/components/ui/page-header";
import Card from "@/components/ui/card";

export default function AdminCompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<VehicleCompany[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .get<VehicleCompany[]>("/admin/companies")
      .then(setCompanies)
      .catch(() => setCompanies([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const deleteCompany = async (id: string) => {
    if (!confirm("Delete this company?")) return;
    await api.delete(`/admin/companies/${id}`);
    load();
  };

  return (
    <>
      <PageHeader
        title="Companies"
        description="Manage vehicle rental companies"
        actions={
          <button onClick={() => router.push("/admin/companies/new")} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            + Add Company
          </button>
        }
      />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-500">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Phone</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Website</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>
              ) : companies.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">No companies found</td></tr>
              ) : (
                companies.map((c) => (
                  <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{c.name}</td>
                    <td className="px-6 py-4 text-slate-600">{c.phone || "-"}</td>
                    <td className="px-6 py-4 text-slate-600">{c.email || "-"}</td>
                    <td className="px-6 py-4 text-slate-600">{c.website || "-"}</td>
                    <td className="px-6 py-4 space-x-3">
                      <button className="text-emerald-700 hover:text-emerald-800 font-medium">Edit</button>
                      <button onClick={() => deleteCompany(c.id)} className="text-red-600 hover:text-red-700 font-medium">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import PageHeader from "@/components/ui/page-header";
import Card, { CardContent } from "@/components/ui/card";
import { formatPrice, getStatusColor } from "@/lib/utils";

interface DashboardData {
  totalDestinations: number;
  totalSafaris: number;
  totalVehicles: number;
  totalCompanies: number;
  totalBookings: number;
  totalUsers: number;
  pendingBookings: number;
  confirmedBookings: number;
}

const statCards = [
  {
    label: "Destinations",
    key: "totalDestinations" as const,
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
    color: "bg-emerald-800",
  },
  {
    label: "Safaris",
    key: "totalSafaris" as const,
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
    color: "bg-amber-700",
  },
  {
    label: "Vehicles",
    key: "totalVehicles" as const,
    icon: "M8 7h8m-8 4h8m-6 4h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z",
    color: "bg-blue-800",
  },
  {
    label: "Bookings",
    key: "totalBookings" as const,
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    color: "bg-slate-700",
  },
  {
    label: "Companies",
    key: "totalCompanies" as const,
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    color: "bg-violet-800",
  },
  {
    label: "Users",
    key: "totalUsers" as const,
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    color: "bg-sky-800",
  },
];

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<DashboardData>("/admin/dashboard")
      .then(setData)
      .catch(() => {
        setData({
          totalDestinations: 0,
          totalSafaris: 0,
          totalVehicles: 0,
          totalCompanies: 0,
          totalBookings: 0,
          totalUsers: 0,
          pendingBookings: 0,
          confirmedBookings: 0,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <svg className="animate-spin h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="ml-3 text-sm text-slate-500">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Dashboard" description="Overview of your tourism platform" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.key}>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{data?.[stat.key] ?? 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(data?.pendingBookings ?? 0) > 0 && (
        <Card className="mb-8">
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <svg className="h-5 w-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{data?.pendingBookings ?? 0} pending bookings</p>
                <p className="text-xs text-slate-500">Review and confirm customer reservations</p>
              </div>
              <a href="/admin/bookings" className="ml-auto text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                View all
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { href: "/admin/destinations/new", label: "Add Destination", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
              { href: "/admin/safaris/new", label: "Add Safari", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" },
              { href: "/admin/vehicles/new", label: "Add Vehicle", icon: "M8 7h8m-8 4h8m-6 4h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" },
              { href: "/admin/companies/new", label: "Add Company", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" },
            ].map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="rounded-lg border border-slate-200 p-4 text-center hover:bg-slate-50 transition-colors"
              >
                <div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={action.icon} />
                  </svg>
                </div>
                <div className="text-sm font-medium text-slate-700">{action.label}</div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

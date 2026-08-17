"use client";

import { useState } from "react";
import AdminSidebar from "@/components/layout/admin-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/api/auth/login");
    }
  }, [user, isAdmin, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 h-14 md:h-16 bg-white border-b border-gray-200 flex items-center px-4 md:px-6 gap-3">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1.5 -ml-1.5 rounded-lg hover:bg-gray-100">
            <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <h2 className="text-sm font-semibold text-gray-700">Admin Dashboard</h2>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

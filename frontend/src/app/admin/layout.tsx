"use client";

import AdminSidebar from "@/components/layout/admin-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();

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
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center px-6">
          <h2 className="text-sm font-semibold text-gray-700">Admin Dashboard</h2>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

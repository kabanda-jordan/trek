"use client";

import AuthCard from "@/components/auth/auth-card";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <AuthCard initialTab="signup" />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

type Tab = "login" | "signup";

export default function AuthCard({ initialTab }: { initialTab?: Tab }) {
  const { login, register } = useAuth();
  const router = useRouter();

  const [tab, setTab] = useState<Tab>(initialTab || "login");
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function switchTab(t: Tab) {
    setTab(t);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (tab === "login") {
        await login(email, password);
      } else {
        await register(name, email, password, phone || undefined);
      }
      const token = localStorage.getItem("token");
      router.refresh();
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          router.push(payload.role === "ADMIN" ? "/admin" : "/");
          return;
        } catch {}
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message || (tab === "login" ? "Login failed" : "Registration failed"));
    } finally {
      setLoading(false);
    }
  }

  const inputBase =
    "w-full rounded-lg border border-slate-300 pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition";

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <svg className="h-8 w-8 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xl font-bold text-slate-900">Trek<span className="text-emerald-600">Rwanda</span></span>
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          {tab === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {tab === "login" ? "Explore Rwanda&apos;s greatest adventures" : "Join thousands of happy travellers"}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
        {/* Tabs */}
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1 mb-6">
          <button
            onClick={() => switchTab("login")}
            className={`rounded-lg py-2.5 text-sm font-semibold transition ${tab === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Sign In
          </button>
          <button
            onClick={() => switchTab("signup")}
            className={`rounded-lg py-2.5 text-sm font-semibold transition ${tab === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 flex items-start gap-2">
            <svg className="h-4 w-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "signup" && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={inputBase} />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputBase} />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <input id="password" type={showPassword ? "text" : "password"} required minLength={tab === "signup" ? 6 : undefined} autoComplete={tab === "login" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={tab === "signup" ? "At least 6 characters" : "Your password"} className={`${inputBase} pr-10`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="Toggle password visibility">
                {showPassword ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                )}
              </button>
            </div>
          </div>

          {tab === "signup" && (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">Phone <span className="text-slate-400">(optional)</span></label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+250788123456" className={inputBase} />
              </div>
            </div>
          )}

          {tab === "login" && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                Remember me
              </label>
              <a href="#" className="font-medium text-slate-900 hover:text-emerald-600">Forgot password?</a>
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
            {loading && (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {loading ? (tab === "login" ? "Signing in..." : "Creating account...") : (tab === "login" ? "Sign In" : "Create Account")}
          </button>
        </form>

        {tab === "login" ? (
          <p className="mt-5 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <button onClick={() => switchTab("signup")} className="font-semibold text-slate-900 hover:text-emerald-600">Sign up free</button>
          </p>
        ) : (
          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <button onClick={() => switchTab("login")} className="font-semibold text-slate-900 hover:text-emerald-600">Sign in</button>
          </p>
        )}
      </div>
    </div>
  );
}

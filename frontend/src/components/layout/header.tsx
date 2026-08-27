"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";

const destinationLinks = [
  { href: "/destinations/volcanoes-national-park", label: "Volcanoes National Park" },
  { href: "/destinations/akagera-national-park", label: "Akagera National Park" },
  { href: "/destinations/nyungwe-national-park", label: "Nyungwe National Park" },
  { href: "/destinations/lake-kivu", label: "Lake Kivu" },
  { href: "/destinations/kigali", label: "Kigali" },
  { href: "/destinations", label: "View All Destinations" },
];

const safariLinks = [
  { href: "/safaris/gorilla-trekking", label: "Gorilla Trekking" },
  { href: "/safaris/akagera-safari", label: "Akagera Big Five" },
  { href: "/safaris/nyungwe-canopy-walk", label: "Nyungwe Canopy Walk" },
  { href: "/safaris/lake-kivu-adventure", label: "Lake Kivu Adventure" },
  { href: "/safaris", label: "View All Safaris" },
];

export default function Header() {
  const { user, logout, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const userName = user?.name || user?.email || "";
  const initials = userName ? userName.charAt(0).toUpperCase() : "?";

  function handleDropdownEnter(name: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(name);
  }

  function handleDropdownLeave() {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  }

  return (
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 md:h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-lg font-bold tracking-tight text-white">Trek<span className="text-emerald-400">Rwanda</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {/* Destinations Dropdown */}
            <div className="relative" onMouseEnter={() => handleDropdownEnter("dest")} onMouseLeave={handleDropdownLeave}>
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-md hover:bg-white/10 transition-colors">
                Destinations
                <svg className={`h-3.5 w-3.5 transition-transform ${openDropdown === "dest" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {openDropdown === "dest" && (
                <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 rounded-lg shadow-xl py-2 mt-0.5">
                  {destinationLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setOpenDropdown(null)}
                      className={`block px-4 py-2 text-sm transition-colors ${link.label === "View All Destinations" ? "text-emerald-700 font-semibold border-t border-slate-100 mt-1 pt-3" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Safaris Dropdown */}
            <div className="relative" onMouseEnter={() => handleDropdownEnter("safari")} onMouseLeave={handleDropdownLeave}>
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-md hover:bg-white/10 transition-colors">
                Safaris
                <svg className={`h-3.5 w-3.5 transition-transform ${openDropdown === "safari" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {openDropdown === "safari" && (
                <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 rounded-lg shadow-xl py-2 mt-0.5">
                  {safariLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setOpenDropdown(null)}
                      className={`block px-4 py-2 text-sm transition-colors ${link.label === "View All Safaris" ? "text-emerald-700 font-semibold border-t border-slate-100 mt-1 pt-3" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/vehicles" className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-md hover:bg-white/10 transition-colors">Vehicles</Link>
            <Link href="/booking" className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-md hover:bg-white/10 transition-colors">Book Now</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white">Admin</Link>
                )}
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">{initials}</div>
                  <span className="text-sm text-slate-200">{userName}</span>
                </div>
                <button onClick={logout} className="text-sm text-slate-400 hover:text-red-400 ml-1">Logout</button>
              </>
            ) : (
              <>
                <Link href="/api/auth/login" className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white">Sign In</Link>
                <Link href="/api/auth/signup" className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 transition-colors">Get Started</Link>
              </>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-slate-200">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 py-4 space-y-1 shadow-lg">
          <p className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Destinations</p>
          {destinationLinks.slice(0, -1).map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm text-slate-200 hover:bg-white/10 rounded-md">{link.label}</Link>
          ))}
          <p className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-2">Safaris</p>
          {safariLinks.slice(0, -1).map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm text-slate-200 hover:bg-white/10 rounded-md">{link.label}</Link>
          ))}
          <div className="border-t border-slate-800 mt-3 pt-3 space-y-1">
            <Link href="/vehicles" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-slate-200 hover:bg-white/10 rounded-md">Vehicles</Link>
            <Link href="/booking" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-slate-200 hover:bg-white/10 rounded-md">Book Now</Link>
          </div>
          {user ? (
            <div className="border-t border-slate-800 mt-3 pt-3 space-y-1">
              {isAdmin && <Link href="/admin" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-slate-200 hover:bg-white/10 rounded-md">Admin Dashboard</Link>}
              <button onClick={() => { logout(); setMobileOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-red-400">Sign Out</button>
            </div>
          ) : (
            <div className="border-t border-slate-800 mt-3 pt-3 space-y-1">
              <Link href="/api/auth/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-slate-200">Sign In</Link>
              <Link href="/api/auth/signup" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-emerald-400 font-semibold">Create Account</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

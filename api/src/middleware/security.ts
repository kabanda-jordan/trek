import type { Context, Next } from "hono";
import type { Env } from "../types";

const DEFAULT_ALLOWED_ORIGINS = [
  "https://trek-rwanda-frontend.pages.dev",
  "http://localhost:3000",
  "http://localhost:8080",
];

function isAllowedOrigin(origin: string | undefined, configured: string[]): boolean {
  if (!origin) return false;
  if (configured.includes(origin)) return true;
  // Allow Cloudflare Pages preview deployments: <hash>.trek-rwanda-frontend.pages.dev
  if (/^https:\/\/[a-z0-9-]+\.trek-rwanda-frontend\.pages\.dev$/i.test(origin)) return true;
  return false;
}

export function resolveAllowedOrigins(env?: Env): string[] {
  const configured = env?.ALLOWED_ORIGINS
    ? env.ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  return [...new Set([...DEFAULT_ALLOWED_ORIGINS, ...configured])];
}

// CORS middleware restricted to known origins.
export async function corsMiddleware(c: Context<{ Bindings: Env }>, next: Next) {
  const origin = c.req.header("Origin");
  const allowed = resolveAllowedOrigins(c.env);
  const isPreflight = c.req.method === "OPTIONS";
  const allowedOrigin = origin && isAllowedOrigin(origin, allowed) ? origin : null;

  if (isPreflight) {
    if (!allowedOrigin) {
      return c.text("Forbidden origin", 403);
    }
    c.header("Access-Control-Allow-Origin", allowedOrigin);
    c.header("Vary", "Origin");
    c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    c.header("Access-Control-Max-Age", "86400");
    return c.body(null, 204);
  }

  if (origin && !allowedOrigin) {
    return c.text("Forbidden origin", 403);
  }

  await next();

  // Handlers may return a raw Response (e.g. Response.json) which does NOT merge
  // middleware-set c.header() values, so stamp the final response directly.
  if (allowedOrigin) {
    const h = c.res.headers;
    h.set("Access-Control-Allow-Origin", allowedOrigin);
    h.set("Vary", "Origin");
    h.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    h.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }
}

// Security headers middleware (HSTS, nosniff, frame protection, referrer, permissions).
export async function securityHeaders(c: Context, next: Next) {
  await next();
  const h = c.res.headers;
  h.set("X-Content-Type-Options", "nosniff");
  h.set("X-Frame-Options", "DENY");
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");
  h.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  if (new URL(c.req.url).protocol === "https:") {
    h.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
}

// Simple in-memory sliding-window rate limiter keyed by remote IP.
// Wrinkle: Cloudflare Workers isolate memory is per-isolate; this is best-effort
// protection against brute force/abuse. Prefer Cloudflare WAF for distributed limits.
const buckets = new Map<string, number[]>();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 20;
const MAX_LOGIN_ATTEMPTS = 8;

function clientIp(c: Context): string {
  return (
    c.req.header("CF-Connecting-IP") ||
    c.req.header("X-Forwarded-For")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isThrottled(key: string, limit: number): boolean {
  const now = Date.now();
  const timestamps = (buckets.get(key) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  buckets.set(key, timestamps);
  if (timestamps.length > 2000) buckets.clear();
  return timestamps.length > limit;
}

export function rateLimit(limit = MAX_REQUESTS) {
  return async (c: Context, next: Next) => {
    const ip = clientIp(c);
    if (isThrottled(`rl:${ip}`, limit)) {
      return c.json({ success: false, error: "Too many requests", message: "Too many requests" }, 429);
    }
    return next();
  };
}

export function loginRateLimit() {
  return async (c: Context, next: Next) => {
    const ip = clientIp(c);
    if (isThrottled(`login:${ip}`, MAX_LOGIN_ATTEMPTS)) {
      return c.json({ success: false, error: "Too many login attempts. Try again in a minute.", message: "Too many login attempts. Try again in a minute." }, 429);
    }
    return next();
  };
}
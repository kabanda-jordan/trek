import { Context, Next } from "hono";
import { verifyToken, extractEmailFromToken, extractRoleFromToken } from "../lib/jwt";
import { err } from "../lib/response";
import { getDb } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import type { Env, Variables } from "../types";

export async function authMiddleware(c: Context<{ Bindings: Env; Variables: Variables }>, next: Next) {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return err("Unauthorized", 401);
  }

  const token = authHeader.substring(7);
  const env = c.env as Env;

  try {
    const payload = await verifyToken(token, env.JWT_SECRET);
    const email = extractEmailFromToken(payload);
    const db = getDb(env.DATABASE_URL);
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user || !user.isActive) {
      return err("Unauthorized", 401);
    }

    c.set("user", user);
    c.set("userEmail", email);
    c.set("userRole", user.role);
    return next();
  } catch {
    return err("Invalid token", 401);
  }
}

export async function adminMiddleware(c: Context<{ Bindings: Env; Variables: Variables }>, next: Next) {
  const role = c.get("userRole");
  if (role !== "ADMIN") {
    return err("Forbidden", 403);
  }
  return next();
}

import { Hono } from "hono";
import { hashPassword, comparePassword } from "../lib/password";
import { signToken, signRefreshToken, verifyToken, extractEmailFromToken } from "../lib/jwt";
import { ok, err } from "../lib/response";
import { getDb } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { authMiddleware } from "../middleware/auth";
import type { Env, Variables } from "../types";

const auth = new Hono<{ Bindings: Env; Variables: Variables }>();

auth.post("/register", async (c) => {
  const body = await c.req.json();
  const { name, email, password, phone } = body;

  if (!name || !email || !password) {
    return err("Name, email, and password are required");
  }
  if (password.length < 6) {
    return err("Password must be at least 6 characters");
  }

  const db = getDb(c.env.DATABASE_URL);
  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing.length > 0) {
    return err("Email already registered");
  }

  const passwordHash = await hashPassword(password);
  const [user] = await db.insert(users).values({
    name, email, passwordHash, phone: phone || null, role: "CUSTOMER", isActive: true,
  }).returning();

  const token = await signToken(user.email, user.role, c.env.JWT_SECRET);
  const refreshToken = await signRefreshToken(user.email, c.env.JWT_SECRET);

  return ok({
    id: user.id, name: user.name, email: user.email, role: user.role,
    token, refreshToken,
  }, "Registration successful");
});

auth.post("/login", async (c) => {
  const body = await c.req.json();
  const { email, password } = body;

  if (!email || !password) {
    return err("Email and password are required");
  }

  const db = getDb(c.env.DATABASE_URL);
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (!user) {
    return err("Bad credentials", 401);
  }

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) {
    return err("Bad credentials", 401);
  }

  if (!user.isActive) {
    return err("Account is deactivated", 403);
  }

  const token = await signToken(user.email, user.role, c.env.JWT_SECRET);
  const refreshToken = await signRefreshToken(user.email, c.env.JWT_SECRET);

  return ok({
    id: user.id, name: user.name, email: user.email, role: user.role,
    token, refreshToken,
  }, "Login successful");
});

auth.post("/refresh", async (c) => {
  const body = await c.req.json();
  const { refreshToken } = body;

  if (!refreshToken) {
    return err("Refresh token is required");
  }

  try {
    const payload = await verifyToken(refreshToken, c.env.JWT_SECRET);
    const email = extractEmailFromToken(payload);
    const db = getDb(c.env.DATABASE_URL);
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user || !user.isActive) {
      return err("User not found or deactivated", 401);
    }

    const token = await signToken(user.email, user.role, c.env.JWT_SECRET);
    const newRefreshToken = await signRefreshToken(user.email, c.env.JWT_SECRET);

    return ok({
      id: user.id, name: user.name, email: user.email, role: user.role,
      token, refreshToken: newRefreshToken,
    });
  } catch {
    return err("Invalid refresh token", 401);
  }
});

auth.get("/me", authMiddleware, async (c) => {
  const user = c.get("user");
  return ok({
    id: user.id, name: user.name, email: user.email,
    role: user.role, isActive: user.isActive,
  });
});

export default auth;

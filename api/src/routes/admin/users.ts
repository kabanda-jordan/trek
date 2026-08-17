import { Hono } from "hono";
import { ok, err, paginate } from "../../lib/response";
import { getDb } from "../../db";
import { users } from "../../db/schema";
import { eq, sql } from "drizzle-orm";
import { authMiddleware, adminMiddleware } from "../../middleware/auth";
import type { Env, Variables } from "../../types";

const admUser = new Hono<{ Bindings: Env; Variables: Variables }>();
admUser.use("*", authMiddleware, adminMiddleware);

admUser.get("/", async (c) => {
  const page = parseInt(c.req.query("page") || "0");
  const size = parseInt(c.req.query("size") || "20");
  const db = getDb(c.env.DATABASE_URL);

  const [countResult] = await db.select({ count: sql<number>`count(*)::int` }).from(users);
  const items = await db.select({
    id: users.id, name: users.name, email: users.email,
    phone: users.phone, role: users.role, isActive: users.isActive,
    createdAt: users.createdAt,
  }).from(users).orderBy(users.createdAt).limit(size).offset(page * size);

  return ok(paginate(items, countResult.count, page, size));
});

admUser.get("/:id", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  const [item] = await db.select({
    id: users.id, name: users.name, email: users.email,
    phone: users.phone, role: users.role, isActive: users.isActive,
    createdAt: users.createdAt,
  }).from(users).where(eq(users.id, c.req.param("id"))).limit(1);
  if (!item) return err("Not found", 404);
  return ok(item);
});

admUser.put("/:id/ban", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  const [item] = await db.update(users).set({
    isActive: false,
    updatedAt: new Date(),
  }).where(eq(users.id, c.req.param("id"))).returning();

  if (!item) return err("Not found", 404);
  return ok({ id: item.id, name: item.name, email: item.email, role: item.role, isActive: item.isActive }, "User banned");
});

admUser.put("/:id/unban", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  const [item] = await db.update(users).set({
    isActive: true,
    updatedAt: new Date(),
  }).where(eq(users.id, c.req.param("id"))).returning();

  if (!item) return err("Not found", 404);
  return ok({ id: item.id, name: item.name, email: item.email, role: item.role, isActive: item.isActive }, "User unbanned");
});

export default admUser;

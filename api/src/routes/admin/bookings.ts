import { Hono } from "hono";
import { ok, err, paginate } from "../../lib/response";
import { getDb } from "../../db";
import { bookings } from "../../db/schema";
import { eq, sql, and } from "drizzle-orm";
import { authMiddleware, adminMiddleware } from "../../middleware/auth";
import type { Env, Variables } from "../../types";

const admBooking = new Hono<{ Bindings: Env; Variables: Variables }>();
admBooking.use("*", authMiddleware, adminMiddleware);

admBooking.get("/", async (c) => {
  const page = parseInt(c.req.query("page") || "0");
  const size = parseInt(c.req.query("size") || "20");
  const status = c.req.query("status");
  const db = getDb(c.env.DATABASE_URL);

  const conditions = [];
  if (status) conditions.push(eq(bookings.status, status));
  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [countResult] = await db.select({ count: sql<number>`count(*)::int` })
    .from(bookings).where(where);

  const items = await db.select().from(bookings)
    .where(where)
    .orderBy(bookings.createdAt)
    .limit(size).offset(page * size);

  return ok(paginate(items, countResult.count, page, size));
});

admBooking.get("/:id", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  const [item] = await db.select().from(bookings).where(eq(bookings.id, c.req.param("id"))).limit(1);
  if (!item) return err("Not found", 404);
  return ok(item);
});

admBooking.put("/:id/status", async (c) => {
  const body = await c.req.json();
  const db = getDb(c.env.DATABASE_URL);
  const id = c.req.param("id");

  const [item] = await db.update(bookings).set({
    status: body.status,
    updatedAt: new Date(),
  }).where(eq(bookings.id, id)).returning();

  if (!item) return err("Not found", 404);
  return ok(item, "Status updated");
});

admBooking.put("/:id/notes", async (c) => {
  const body = await c.req.json();
  const db = getDb(c.env.DATABASE_URL);
  const id = c.req.param("id");

  const [item] = await db.update(bookings).set({
    adminNotes: body.adminNotes,
    updatedAt: new Date(),
  }).where(eq(bookings.id, id)).returning();

  if (!item) return err("Not found", 404);
  return ok(item, "Notes updated");
});

export default admBooking;

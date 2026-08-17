import { Hono } from "hono";
import { ok, err, paginate } from "../../lib/response";
import { toSlug } from "../../lib/slug";
import { getDb } from "../../db";
import { destinations } from "../../db/schema";
import { eq, sql } from "drizzle-orm";
import { authMiddleware, adminMiddleware } from "../../middleware/auth";
import type { Env, Variables } from "../../types";

const admDest = new Hono<{ Bindings: Env; Variables: Variables }>();
admDest.use("*", authMiddleware, adminMiddleware);

admDest.get("/", async (c) => {
  const page = parseInt(c.req.query("page") || "0");
  const size = parseInt(c.req.query("size") || "20");
  const db = getDb(c.env.DATABASE_URL);

  const [countResult] = await db.select({ count: sql<number>`count(*)::int` }).from(destinations);
  const items = await db.select().from(destinations)
    .orderBy(destinations.sortOrder, destinations.name)
    .limit(size).offset(page * size);

  return ok(paginate(items, countResult.count, page, size));
});

admDest.get("/:id", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  const [item] = await db.select().from(destinations).where(eq(destinations.id, c.req.param("id"))).limit(1);
  if (!item) return err("Not found", 404);
  return ok(item);
});

admDest.post("/", async (c) => {
  const body = await c.req.json();
  const db = getDb(c.env.DATABASE_URL);
  const slug = toSlug(body.name || "untitled");

  const [item] = await db.insert(destinations).values({
    name: body.name,
    slug,
    description: body.description || "",
    shortDesc: body.shortDesc || null,
    location: body.location || "",
    district: body.district || null,
    province: body.province || null,
    coverImageUrl: body.coverImageUrl || null,
    openingHours: body.openingHours || null,
    thingsToKnow: body.thingsToKnow || null,
    isPublished: body.isPublished || false,
  }).returning();

  return ok(item, "Destination created");
});

admDest.put("/:id", async (c) => {
  const body = await c.req.json();
  const db = getDb(c.env.DATABASE_URL);
  const id = c.req.param("id");

  const [existing] = await db.select().from(destinations).where(eq(destinations.id, id)).limit(1);
  if (!existing) return err("Not found", 404);

  const [item] = await db.update(destinations).set({
    name: body.name ?? existing.name,
    description: body.description ?? existing.description,
    shortDesc: body.shortDesc ?? existing.shortDesc,
    location: body.location ?? existing.location,
    district: body.district ?? existing.district,
    province: body.province ?? existing.province,
    coverImageUrl: body.coverImageUrl ?? existing.coverImageUrl,
    openingHours: body.openingHours ?? existing.openingHours,
    thingsToKnow: body.thingsToKnow ?? existing.thingsToKnow,
    isPublished: body.isPublished ?? existing.isPublished,
    updatedAt: new Date(),
  }).where(eq(destinations.id, id)).returning();

  return ok(item, "Destination updated");
});

admDest.delete("/:id", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  await db.delete(destinations).where(eq(destinations.id, c.req.param("id")));
  return ok(null, "Destination deleted");
});

admDest.put("/:id/publish", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  const id = c.req.param("id");
  const [existing] = await db.select().from(destinations).where(eq(destinations.id, id)).limit(1);
  if (!existing) return err("Not found", 404);

  const [item] = await db.update(destinations).set({
    isPublished: !existing.isPublished,
    updatedAt: new Date(),
  }).where(eq(destinations.id, id)).returning();

  return ok(item);
});

export default admDest;

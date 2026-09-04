import { Hono } from "hono";
import { ok, err, paginate, safeInt } from "../../lib/response";
import { toSlug } from "../../lib/slug";
import { getDb } from "../../db";
import { safaris } from "../../db/schema";
import { eq, sql } from "drizzle-orm";
import { authMiddleware, adminMiddleware } from "../../middleware/auth";
import type { Env, Variables } from "../../types";

const admSafari = new Hono<{ Bindings: Env; Variables: Variables }>();
admSafari.use("*", authMiddleware, adminMiddleware);

admSafari.get("/", async (c) => {
  const page = safeInt(c.req.query("page"), 0);
  const size = safeInt(c.req.query("size"), 20, 1, 50);
  const db = getDb(c.env.DATABASE_URL);

  const [countResult] = await db.select({ count: sql<number>`count(*)::int` }).from(safaris);
  const items = await db.select().from(safaris).orderBy(safaris.sortOrder).limit(size).offset(page * size);
  return ok(paginate(items, countResult.count, page, size));
});

admSafari.get("/:id", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  const [item] = await db.select().from(safaris).where(eq(safaris.id, c.req.param("id"))).limit(1);
  if (!item) return err("Not found", 404);
  return ok(item);
});

admSafari.post("/", async (c) => {
  const body = await c.req.json();
  const db = getDb(c.env.DATABASE_URL);
  const slug = toSlug(body.name || "untitled");

  const [item] = await db.insert(safaris).values({
    name: body.name,
    slug,
    description: body.description || "",
    shortDesc: body.shortDesc || null,
    durationDays: body.durationDays || 1,
    durationNights: body.durationNights || 0,
    price: body.price || 0,
    maxParticipants: body.maxParticipants || 20,
    difficultyLevel: body.difficultyLevel || "MODERATE",
    coverImageUrl: body.coverImageUrl || null,
    includedItems: body.includedItems || null,
    excludedItems: body.excludedItems || null,
    itinerary: body.itinerary || null,
    destinationId: body.destinationId || null,
    isPublished: body.isPublished || false,
  }).returning();

  return ok(item, "Safari created");
});

admSafari.put("/:id", async (c) => {
  const body = await c.req.json();
  const db = getDb(c.env.DATABASE_URL);
  const id = c.req.param("id");

  const [existing] = await db.select().from(safaris).where(eq(safaris.id, id)).limit(1);
  if (!existing) return err("Not found", 404);

  const [item] = await db.update(safaris).set({
    name: body.name ?? existing.name,
    description: body.description ?? existing.description,
    shortDesc: body.shortDesc ?? existing.shortDesc,
    durationDays: body.durationDays ?? existing.durationDays,
    durationNights: body.durationNights ?? existing.durationNights,
    price: body.price ?? existing.price,
    maxParticipants: body.maxParticipants ?? existing.maxParticipants,
    difficultyLevel: body.difficultyLevel ?? existing.difficultyLevel,
    coverImageUrl: body.coverImageUrl ?? existing.coverImageUrl,
    includedItems: body.includedItems ?? existing.includedItems,
    excludedItems: body.excludedItems ?? existing.excludedItems,
    itinerary: body.itinerary ?? existing.itinerary,
    isPublished: body.isPublished ?? existing.isPublished,
    updatedAt: new Date(),
  }).where(eq(safaris.id, id)).returning();

  return ok(item, "Safari updated");
});

admSafari.delete("/:id", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  await db.delete(safaris).where(eq(safaris.id, c.req.param("id")));
  return ok(null, "Safari deleted");
});

admSafari.put("/:id/publish", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  const id = c.req.param("id");
  const [existing] = await db.select().from(safaris).where(eq(safaris.id, id)).limit(1);
  if (!existing) return err("Not found", 404);

  const [item] = await db.update(safaris).set({
    isPublished: !existing.isPublished,
    updatedAt: new Date(),
  }).where(eq(safaris.id, id)).returning();

  return ok(item);
});

export default admSafari;

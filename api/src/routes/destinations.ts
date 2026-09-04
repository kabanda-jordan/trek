import { Hono } from "hono";
import { ok, err, paginate, safeInt } from "../lib/response";
import { getDb } from "../db";
import { destinations, destinationImages, destinationActivities, activities } from "../db/schema";
import { eq, ilike, and, sql, desc } from "drizzle-orm";
import type { Env, Variables } from "../types";

const dest = new Hono<{ Bindings: Env; Variables: Variables }>();

dest.get("/", async (c) => {
  const page = safeInt(c.req.query("page"), 0);
  const size = safeInt(c.req.query("size"), 12, 1, 50);
  const district = c.req.query("district");

  const db = getDb(c.env.DATABASE_URL);
  const conditions = [eq(destinations.isPublished, true)];
  if (district) {
    conditions.push(ilike(destinations.district, district));
  }

  const where = and(...conditions);
  const offset = page * size;

  const [countResult] = await db.select({ count: sql<number>`count(*)::int` })
    .from(destinations).where(where);

  const items = await db.select().from(destinations)
    .where(where)
    .orderBy(destinations.sortOrder, destinations.name)
    .limit(size).offset(offset);

  return ok(paginate(items, countResult.count, page, size));
});

dest.get("/search", async (c) => {
  const q = c.req.query("q");
  const page = safeInt(c.req.query("page"), 0);
  const size = safeInt(c.req.query("size"), 12, 1, 50);

  if (!q) return err("Search query 'q' is required");

  const db = getDb(c.env.DATABASE_URL);
  const where = and(
    eq(destinations.isPublished, true),
    sql`(${destinations.name} ILIKE ${`%${q}%`} OR ${destinations.description} ILIKE ${`%${q}%`} OR ${destinations.location} ILIKE ${`%${q}%`})`
  );

  const [countResult] = await db.select({ count: sql<number>`count(*)::int` })
    .from(destinations).where(where);

  const items = await db.select().from(destinations)
    .where(where)
    .orderBy(destinations.sortOrder, destinations.name)
    .limit(size).offset(page * size);

  return ok(paginate(items, countResult.count, page, size));
});

dest.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const db = getDb(c.env.DATABASE_URL);
  const [item] = await db.select().from(destinations)
    .where(and(eq(destinations.slug, slug), eq(destinations.isPublished, true)))
    .limit(1);
  if (!item) return err("Destination not found", 404);

  const images = await db.select().from(destinationImages)
    .where(eq(destinationImages.destinationId, item.id))
    .orderBy(destinationImages.sortOrder);

  const acts = await db.select({ id: activities.id, name: activities.name, slug: activities.slug, icon: activities.icon })
    .from(destinationActivities)
    .innerJoin(activities, eq(destinationActivities.activityId, activities.id))
    .where(eq(destinationActivities.destinationId, item.id));

  return ok({ ...item, images, activities: acts });
});

export default dest;

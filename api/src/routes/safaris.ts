import { Hono } from "hono";
import { ok, err, paginate, safeInt } from "../lib/response";
import { getDb } from "../db";
import { safaris, safariImages, safariActivities, activities } from "../db/schema";
import { eq, sql, and } from "drizzle-orm";
import type { Env, Variables } from "../types";

const safari = new Hono<{ Bindings: Env; Variables: Variables }>();

safari.get("/", async (c) => {
  const page = safeInt(c.req.query("page"), 0);
  const size = safeInt(c.req.query("size"), 12, 1, 50);

  const db = getDb(c.env.DATABASE_URL);
  const where = eq(safaris.isPublished, true);
  const offset = page * size;

  const [countResult] = await db.select({ count: sql<number>`count(*)::int` })
    .from(safaris).where(where);

  const items = await db.select().from(safaris)
    .where(where)
    .orderBy(safaris.sortOrder, safaris.name)
    .limit(size).offset(offset);

  return ok(paginate(items, countResult.count, page, size));
});

safari.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const db = getDb(c.env.DATABASE_URL);
  const [item] = await db.select().from(safaris)
    .where(and(eq(safaris.slug, slug), eq(safaris.isPublished, true)))
    .limit(1);
  if (!item) return err("Safari not found", 404);

  const images = await db.select().from(safariImages)
    .where(eq(safariImages.safariId, item.id))
    .orderBy(safariImages.sortOrder);

  const acts = await db.select({ id: activities.id, name: activities.name, slug: activities.slug, icon: activities.icon })
    .from(safariActivities)
    .innerJoin(activities, eq(safariActivities.activityId, activities.id))
    .where(eq(safariActivities.safariId, item.id));

  return ok({ ...item, images, activities: acts });
});

export default safari;

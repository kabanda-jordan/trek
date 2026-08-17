import { Hono } from "hono";
import { ok, err, paginate } from "../lib/response";
import { getDb } from "../db";
import { vehicles, vehicleImages } from "../db/schema";
import { eq, and, sql } from "drizzle-orm";
import type { Env, Variables } from "../types";

const veh = new Hono<{ Bindings: Env; Variables: Variables }>();

veh.get("/", async (c) => {
  const page = parseInt(c.req.query("page") || "0");
  const size = parseInt(c.req.query("size") || "12");
  const type = c.req.query("type");

  const db = getDb(c.env.DATABASE_URL);
  const conditions = [eq(vehicles.isPublished, true), eq(vehicles.isAvailable, true)];
  if (type) conditions.push(eq(vehicles.type, type));

  const where = and(...conditions);
  const offset = page * size;

  const [countResult] = await db.select({ count: sql<number>`count(*)::int` })
    .from(vehicles).where(where);

  const items = await db.select().from(vehicles)
    .where(where)
    .orderBy(vehicles.sortOrder, vehicles.name)
    .limit(size).offset(offset);

  return ok(paginate(items, countResult.count, page, size));
});

veh.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const db = getDb(c.env.DATABASE_URL);
  const [item] = await db.select().from(vehicles).where(eq(vehicles.slug, slug)).limit(1);
  if (!item) return err("Vehicle not found", 404);

  const images = await db.select().from(vehicleImages)
    .where(eq(vehicleImages.vehicleId, item.id))
    .orderBy(vehicleImages.sortOrder);

  return ok({ ...item, images });
});

export default veh;

import { Hono } from "hono";
import { ok, err, paginate } from "../../lib/response";
import { toSlug } from "../../lib/slug";
import { getDb } from "../../db";
import { vehicles } from "../../db/schema";
import { eq, sql } from "drizzle-orm";
import { authMiddleware, adminMiddleware } from "../../middleware/auth";
import type { Env, Variables } from "../../types";

const admVehicle = new Hono<{ Bindings: Env; Variables: Variables }>();
admVehicle.use("*", authMiddleware, adminMiddleware);

admVehicle.get("/", async (c) => {
  const page = parseInt(c.req.query("page") || "0");
  const size = parseInt(c.req.query("size") || "20");
  const db = getDb(c.env.DATABASE_URL);
  const [countResult] = await db.select({ count: sql<number>`count(*)::int` }).from(vehicles);
  const items = await db.select().from(vehicles).orderBy(vehicles.sortOrder).limit(size).offset(page * size);
  return ok(paginate(items, countResult.count, page, size));
});

admVehicle.get("/:id", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  const [item] = await db.select().from(vehicles).where(eq(vehicles.id, c.req.param("id"))).limit(1);
  if (!item) return err("Not found", 404);
  return ok(item);
});

admVehicle.post("/", async (c) => {
  const body = await c.req.json();
  const db = getDb(c.env.DATABASE_URL);
  const slug = toSlug(body.name || "untitled");

  const [item] = await db.insert(vehicles).values({
    companyId: body.companyId,
    name: body.name,
    slug,
    type: body.type || "SUV",
    brand: body.brand || null,
    model: body.model || null,
    year: body.year || null,
    seats: body.seats || 4,
    transmission: body.transmission || "AUTOMATIC",
    fuelType: body.fuelType || "DIESEL",
    features: body.features || null,
    pricePerDay: body.pricePerDay || 0,
    coverImageUrl: body.coverImageUrl || null,
    isAvailable: body.isAvailable ?? true,
    isPublished: body.isPublished || false,
  }).returning();

  return ok(item, "Vehicle created");
});

admVehicle.put("/:id", async (c) => {
  const body = await c.req.json();
  const db = getDb(c.env.DATABASE_URL);
  const id = c.req.param("id");
  const [existing] = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);
  if (!existing) return err("Not found", 404);

  const [item] = await db.update(vehicles).set({
    name: body.name ?? existing.name,
    type: body.type ?? existing.type,
    brand: body.brand ?? existing.brand,
    model: body.model ?? existing.model,
    year: body.year ?? existing.year,
    seats: body.seats ?? existing.seats,
    transmission: body.transmission ?? existing.transmission,
    fuelType: body.fuelType ?? existing.fuelType,
    features: body.features ?? existing.features,
    pricePerDay: body.pricePerDay ?? existing.pricePerDay,
    coverImageUrl: body.coverImageUrl ?? existing.coverImageUrl,
    isAvailable: body.isAvailable ?? existing.isAvailable,
    isPublished: body.isPublished ?? existing.isPublished,
    updatedAt: new Date(),
  }).where(eq(vehicles.id, id)).returning();

  return ok(item, "Vehicle updated");
});

admVehicle.delete("/:id", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  await db.delete(vehicles).where(eq(vehicles.id, c.req.param("id")));
  return ok(null, "Vehicle deleted");
});

admVehicle.put("/:id/availability", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  const id = c.req.param("id");
  const [existing] = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);
  if (!existing) return err("Not found", 404);

  const [item] = await db.update(vehicles).set({
    isAvailable: !existing.isAvailable,
    updatedAt: new Date(),
  }).where(eq(vehicles.id, id)).returning();

  return ok(item);
});

export default admVehicle;

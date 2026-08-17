import { Hono } from "hono";
import { ok, err } from "../../lib/response";
import { toSlug } from "../../lib/slug";
import { getDb } from "../../db";
import { vehicleCompanies } from "../../db/schema";
import { eq } from "drizzle-orm";
import { authMiddleware, adminMiddleware } from "../../middleware/auth";
import type { Env, Variables } from "../../types";

const admCompany = new Hono<{ Bindings: Env; Variables: Variables }>();
admCompany.use("*", authMiddleware, adminMiddleware);

admCompany.get("/", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  const items = await db.select().from(vehicleCompanies).orderBy(vehicleCompanies.name);
  return ok(items);
});

admCompany.get("/:id", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  const [item] = await db.select().from(vehicleCompanies).where(eq(vehicleCompanies.id, c.req.param("id"))).limit(1);
  if (!item) return err("Not found", 404);
  return ok(item);
});

admCompany.post("/", async (c) => {
  const body = await c.req.json();
  const db = getDb(c.env.DATABASE_URL);
  const slug = toSlug(body.name || "untitled");

  const [item] = await db.insert(vehicleCompanies).values({
    name: body.name,
    slug,
    description: body.description || null,
    phone: body.phone || null,
    email: body.email || null,
    website: body.website || null,
    address: body.address || null,
    logoUrl: body.logoUrl || null,
  }).returning();

  return ok(item, "Company created");
});

admCompany.put("/:id", async (c) => {
  const body = await c.req.json();
  const db = getDb(c.env.DATABASE_URL);
  const id = c.req.param("id");
  const [existing] = await db.select().from(vehicleCompanies).where(eq(vehicleCompanies.id, id)).limit(1);
  if (!existing) return err("Not found", 404);

  const [item] = await db.update(vehicleCompanies).set({
    name: body.name ?? existing.name,
    description: body.description ?? existing.description,
    phone: body.phone ?? existing.phone,
    email: body.email ?? existing.email,
    website: body.website ?? existing.website,
    address: body.address ?? existing.address,
    logoUrl: body.logoUrl ?? existing.logoUrl,
    updatedAt: new Date(),
  }).where(eq(vehicleCompanies.id, id)).returning();

  return ok(item, "Company updated");
});

admCompany.delete("/:id", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  await db.delete(vehicleCompanies).where(eq(vehicleCompanies.id, c.req.param("id")));
  return ok(null, "Company deleted");
});

export default admCompany;

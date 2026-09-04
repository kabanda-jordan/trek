import { Hono } from "hono";
import { ok, err, paginate, safeInt } from "../lib/response";
import { getDb } from "../db";
import { vehicleCompanies } from "../db/schema";
import { eq, sql } from "drizzle-orm";
import type { Env, Variables } from "../types";

const comp = new Hono<{ Bindings: Env; Variables: Variables }>();

comp.get("/", async (c) => {
  const page = safeInt(c.req.query("page"), 0);
  const size = safeInt(c.req.query("size"), 20, 1, 50);
  const db = getDb(c.env.DATABASE_URL);
  const where = eq(vehicleCompanies.isActive, true);

  const [countResult] = await db.select({ count: sql<number>`count(*)::int` })
    .from(vehicleCompanies).where(where);

  const items = await db.select().from(vehicleCompanies)
    .where(where).limit(size).offset(page * size);

  return ok(paginate(items, countResult.count, page, size));
});

comp.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const db = getDb(c.env.DATABASE_URL);
  const [item] = await db.select().from(vehicleCompanies).where(eq(vehicleCompanies.slug, slug)).limit(1);
  if (!item) return err("Company not found", 404);
  return ok(item);
});

export default comp;

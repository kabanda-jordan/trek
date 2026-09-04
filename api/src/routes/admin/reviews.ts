import { Hono } from "hono";
import { ok, err, paginate, safeInt } from "../../lib/response";
import { getDb } from "../../db";
import { reviews } from "../../db/schema";
import { eq, sql, and } from "drizzle-orm";
import { authMiddleware, adminMiddleware } from "../../middleware/auth";
import type { Env, Variables } from "../../types";

const admReview = new Hono<{ Bindings: Env; Variables: Variables }>();
admReview.use("*", authMiddleware, adminMiddleware);

admReview.get("/", async (c) => {
  const page = safeInt(c.req.query("page"), 0);
  const size = safeInt(c.req.query("size"), 20, 1, 50);
  const approved = c.req.query("approved");
  const db = getDb(c.env.DATABASE_URL);

  const conditions = [];
  if (approved !== null && approved !== undefined) {
    conditions.push(eq(reviews.isApproved, approved === "true"));
  }
  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [countResult] = await db.select({ count: sql<number>`count(*)::int` })
    .from(reviews).where(where);

  const items = await db.select().from(reviews)
    .where(where)
    .orderBy(reviews.createdAt)
    .limit(size).offset(page * size);

  return ok(paginate(items, countResult.count, page, size));
});

admReview.put("/:id/approve", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  const [item] = await db.update(reviews).set({
    isApproved: true,
    updatedAt: new Date(),
  }).where(eq(reviews.id, c.req.param("id"))).returning();

  if (!item) return err("Not found", 404);
  return ok(item, "Review approved");
});

admReview.delete("/:id", async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  await db.delete(reviews).where(eq(reviews.id, c.req.param("id")));
  return ok(null, "Review deleted");
});

export default admReview;

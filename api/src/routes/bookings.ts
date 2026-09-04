import { Hono } from "hono";
import { ok, err, paginate, safeInt } from "../lib/response";
import { getDb } from "../db";
import { bookings } from "../db/schema";
import { eq, sql, desc } from "drizzle-orm";
import { authMiddleware } from "../middleware/auth";
import type { Env, Variables } from "../types";

const bk = new Hono<{ Bindings: Env; Variables: Variables }>();

bk.use("*", authMiddleware);

bk.post("/", async (c) => {
  const user = c.get("user");
  const body = await c.req.json();
  const { safariId, vehicleId, destinationId, startDate, endDate, participants, customerName, customerEmail, customerPhone, specialRequests } = body;

  if (!startDate || !endDate || !participants || !customerName || !customerEmail) {
    return err("startDate, endDate, participants, customerName, and customerEmail are required");
  }

  const db = getDb(c.env.DATABASE_URL);
  const year = new Date().getFullYear();
  const [countResult] = await db.select({ count: sql<number>`count(*)::int` }).from(bookings);
  const seq = (countResult.count + 1).toString().padStart(4, "0");
  const bookingRef = `TR-${year}-${seq}`;

  const [booking] = await db.insert(bookings).values({
    bookingRef,
    userId: user.id,
    safariId: safariId || null,
    vehicleId: vehicleId || null,
    destinationId: destinationId || null,
    startDate,
    endDate,
    participants: parseInt(participants),
    customerName,
    customerEmail,
    customerPhone: customerPhone || null,
    specialRequests: specialRequests || null,
    status: "PENDING",
    paymentStatus: "UNPAID",
  }).returning();

  return ok(booking, "Booking created");
});

bk.get("/my", async (c) => {
  const user = c.get("user");
  const page = safeInt(c.req.query("page"), 0);
  const size = safeInt(c.req.query("size"), 10, 1, 50);

  const db = getDb(c.env.DATABASE_URL);
  const where = eq(bookings.userId, user.id);

  const [countResult] = await db.select({ count: sql<number>`count(*)::int` })
    .from(bookings).where(where);

  const items = await db.select().from(bookings)
    .where(where)
    .orderBy(desc(bookings.createdAt))
    .limit(size).offset(page * size);

  return ok(paginate(items, countResult.count, page, size));
});

export default bk;

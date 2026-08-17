import { Hono } from "hono";
import { ok, err, paginate } from "../../lib/response";
import { getDb } from "../../db";
import {
  users, destinations, safaris, vehicles, vehicleCompanies, bookings, reviews
} from "../../db/schema";
import { sql, eq } from "drizzle-orm";
import { authMiddleware, adminMiddleware } from "../../middleware/auth";
import type { Env, Variables } from "../../types";

const dash = new Hono<{ Bindings: Env; Variables: Variables }>();

dash.use("*", authMiddleware, adminMiddleware);

dash.get("/", async (c) => {
  const db = getDb(c.env.DATABASE_URL);

  const [[destCount], [safariCount], [vehicleCount], [companyCount], [userCount], [bookingCount], [pendingCount], [confirmedCount]] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(destinations),
    db.select({ count: sql<number>`count(*)::int` }).from(safaris),
    db.select({ count: sql<number>`count(*)::int` }).from(vehicles),
    db.select({ count: sql<number>`count(*)::int` }).from(vehicleCompanies),
    db.select({ count: sql<number>`count(*)::int` }).from(users),
    db.select({ count: sql<number>`count(*)::int` }).from(bookings),
    db.select({ count: sql<number>`count(*)::int` }).from(bookings).where(eq(bookings.status, "PENDING")),
    db.select({ count: sql<number>`count(*)::int` }).from(bookings).where(eq(bookings.status, "CONFIRMED")),
  ]);

  return ok({
    totalDestinations: destCount.count,
    totalSafaris: safariCount.count,
    totalVehicles: vehicleCount.count,
    totalCompanies: companyCount.count,
    totalUsers: userCount.count,
    totalBookings: bookingCount.count,
    pendingBookings: pendingCount.count,
    confirmedBookings: confirmedCount.count,
  });
});

export default dash;

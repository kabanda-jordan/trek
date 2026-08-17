import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import type { Env, Variables } from "./types";

import auth from "./routes/auth";
import destinations from "./routes/destinations";
import safaris from "./routes/safaris";
import vehicles from "./routes/vehicles";
import companies from "./routes/companies";
import bookings from "./routes/bookings";
import dash from "./routes/admin/dashboard";
import admDest from "./routes/admin/destinations";
import admSafari from "./routes/admin/safaris";
import admVehicle from "./routes/admin/vehicles";
import admCompany from "./routes/admin/companies";
import admBooking from "./routes/admin/bookings";
import admReview from "./routes/admin/reviews";
import admUser from "./routes/admin/users";

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

app.use("*", logger());
app.use("*", cors({
  origin: ["http://localhost:3000", "https://*.pages.dev", "https://*.workers.dev"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.get("/", (c) => c.json({ name: "Trek Rwanda API", version: "1.0.0", status: "ok" }));
app.get("/health", (c) => c.json({ status: "ok", timestamp: new Date().toISOString() }));

app.route("/api/auth", auth);
app.route("/api/destinations", destinations);
app.route("/api/safaris", safaris);
app.route("/api/vehicles", vehicles);
app.route("/api/companies", companies);
app.route("/api/bookings", bookings);
app.route("/api/admin/dashboard", dash);
app.route("/api/admin/destinations", admDest);
app.route("/api/admin/safaris", admSafari);
app.route("/api/admin/vehicles", admVehicle);
app.route("/api/admin/companies", admCompany);
app.route("/api/admin/bookings", admBooking);
app.route("/api/admin/reviews", admReview);
app.route("/api/admin/users", admUser);

app.notFound((c) => c.json({ success: false, error: "Not found" }, 404));

app.onError((err, c) => {
  console.error("Unhandled error:", err.message, err.stack);
  return c.json({ success: false, error: err.message || "Internal server error" }, 500);
});

export default app;

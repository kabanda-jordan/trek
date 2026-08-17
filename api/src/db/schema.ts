import {
  pgTable, uuid, varchar, text, boolean, integer,
  decimal, timestamp, date, primaryKey, index, uniqueIndex, pgEnum
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  role: varchar("role", { length: 20 }).notNull().default("CUSTOMER"),
  avatarUrl: varchar("avatar_url", { length: 500 }),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => [
  index("idx_users_email").on(t.email),
  index("idx_users_role").on(t.role),
]);

export const activities = pgTable("activities", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).unique().notNull(),
  slug: varchar("slug", { length: 120 }).unique().notNull(),
  icon: varchar("icon", { length: 50 }),
});

export const regions = pgTable("regions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).unique().notNull(),
  slug: varchar("slug", { length: 120 }).unique().notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
  sortOrder: integer("sort_order").default(0),
});

export const destinations = pgTable("destinations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 250 }).unique().notNull(),
  description: text("description").notNull(),
  shortDesc: varchar("short_desc", { length: 500 }),
  location: varchar("location", { length: 200 }).notNull(),
  district: varchar("district", { length: 100 }),
  province: varchar("province", { length: 100 }),
  coverImageUrl: varchar("cover_image_url", { length: 500 }),
  openingHours: varchar("opening_hours", { length: 200 }),
  thingsToKnow: text("things_to_know"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  isPublished: boolean("is_published").notNull().default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => [
  index("idx_destinations_slug").on(t.slug),
  index("idx_destinations_published").on(t.isPublished),
  index("idx_destinations_district").on(t.district),
]);

export const destinationImages = pgTable("destination_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  destinationId: uuid("destination_id").notNull().references(() => destinations.id, { onDelete: "cascade" }),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  altText: varchar("alt_text", { length: 255 }),
  sortOrder: integer("sort_order").default(0),
  isCover: boolean("is_cover").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => [
  index("idx_destination_images_dest").on(t.destinationId),
]);

export const destinationActivities = pgTable("destination_activities", {
  destinationId: uuid("destination_id").notNull().references(() => destinations.id, { onDelete: "cascade" }),
  activityId: uuid("activity_id").notNull().references(() => activities.id, { onDelete: "cascade" }),
}, (t) => [
  primaryKey({ columns: [t.destinationId, t.activityId] }),
]);

export const safaris = pgTable("safaris", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 250 }).unique().notNull(),
  description: text("description").notNull(),
  shortDesc: varchar("short_desc", { length: 500 }),
  durationDays: integer("duration_days").notNull(),
  durationNights: integer("duration_nights").default(0),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD"),
  maxParticipants: integer("max_participants").default(20),
  difficultyLevel: varchar("difficulty_level", { length: 20 }).default("MODERATE"),
  coverImageUrl: varchar("cover_image_url", { length: 500 }),
  includedItems: text("included_items"),
  excludedItems: text("excluded_items"),
  itinerary: text("itinerary"),
  destinationId: uuid("destination_id").references(() => destinations.id, { onDelete: "set null" }),
  isPublished: boolean("is_published").notNull().default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => [
  index("idx_safaris_slug").on(t.slug),
  index("idx_safaris_published").on(t.isPublished),
  index("idx_safaris_destination").on(t.destinationId),
]);

export const safariImages = pgTable("safari_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  safariId: uuid("safari_id").notNull().references(() => safaris.id, { onDelete: "cascade" }),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  altText: varchar("alt_text", { length: 255 }),
  sortOrder: integer("sort_order").default(0),
  isCover: boolean("is_cover").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const safariActivities = pgTable("safari_activities", {
  safariId: uuid("safari_id").notNull().references(() => safaris.id, { onDelete: "cascade" }),
  activityId: uuid("activity_id").notNull().references(() => activities.id, { onDelete: "cascade" }),
}, (t) => [
  primaryKey({ columns: [t.safariId, t.activityId] }),
]);

export const vehicleCompanies = pgTable("vehicle_companies", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 250 }).unique().notNull(),
  description: text("description"),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  website: varchar("website", { length: 255 }),
  address: varchar("address", { length: 500 }),
  logoUrl: varchar("logo_url", { length: 500 }),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => [
  index("idx_vehicle_companies_slug").on(t.slug),
]);

export const vehicles = pgTable("vehicles", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").notNull().references(() => vehicleCompanies.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 250 }).unique().notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  brand: varchar("brand", { length: 100 }),
  model: varchar("model", { length: 100 }),
  year: integer("year"),
  seats: integer("seats").notNull(),
  transmission: varchar("transmission", { length: 20 }).default("AUTOMATIC"),
  fuelType: varchar("fuel_type", { length: 20 }).default("DIESEL"),
  features: text("features"),
  pricePerDay: decimal("price_per_day", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD"),
  coverImageUrl: varchar("cover_image_url", { length: 500 }),
  isAvailable: boolean("is_available").notNull().default(true),
  isPublished: boolean("is_published").notNull().default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => [
  index("idx_vehicles_slug").on(t.slug),
  index("idx_vehicles_company").on(t.companyId),
  index("idx_vehicles_type").on(t.type),
]);

export const vehicleImages = pgTable("vehicle_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  vehicleId: uuid("vehicle_id").notNull().references(() => vehicles.id, { onDelete: "cascade" }),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  altText: varchar("alt_text", { length: 255 }),
  sortOrder: integer("sort_order").default(0),
  isCover: boolean("is_cover").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingRef: varchar("booking_ref", { length: 20 }).unique().notNull(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  safariId: uuid("safari_id").references(() => safaris.id, { onDelete: "set null" }),
  vehicleId: uuid("vehicle_id").references(() => vehicles.id, { onDelete: "set null" }),
  destinationId: uuid("destination_id").references(() => destinations.id, { onDelete: "set null" }),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  participants: integer("participants").notNull().default(1),
  totalPrice: decimal("total_price", { precision: 12, scale: 2 }),
  currency: varchar("currency", { length: 3 }).default("USD"),
  status: varchar("status", { length: 20 }).notNull().default("PENDING"),
  paymentStatus: varchar("payment_status", { length: 20 }).notNull().default("UNPAID"),
  customerName: varchar("customer_name", { length: 100 }).notNull(),
  customerEmail: varchar("customer_email", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }),
  specialRequests: text("special_requests"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => [
  index("idx_bookings_ref").on(t.bookingRef),
  index("idx_bookings_user").on(t.userId),
  index("idx_bookings_status").on(t.status),
]);

export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  destinationId: uuid("destination_id").references(() => destinations.id, { onDelete: "cascade" }),
  safariId: uuid("safari_id").references(() => safaris.id, { onDelete: "cascade" }),
  bookingId: uuid("booking_id").references(() => bookings.id, { onDelete: "set null" }),
  rating: integer("rating").notNull(),
  title: varchar("title", { length: 200 }),
  comment: text("comment").notNull(),
  isApproved: boolean("is_approved").notNull().default(false),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => [
  index("idx_reviews_destination").on(t.destinationId),
  index("idx_reviews_user").on(t.userId),
  index("idx_reviews_approved").on(t.isApproved),
]);

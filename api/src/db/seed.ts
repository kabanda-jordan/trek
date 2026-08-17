import { neon } from "@neondatabase/serverless";
import bcryptjs from "bcryptjs";

const DATABASE_URL = process.env.DATABASE_URL!;

async function seed() {
  const sql = neon(DATABASE_URL);

  console.log("Seeding users...");
  const passwordHash = await bcryptjs.hash("password", 10);

  await sql`
    INSERT INTO users (id, name, email, password_hash, role, is_active)
    VALUES
      ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Admin User', 'admin@trek.rw', ${passwordHash}, 'ADMIN', true),
      ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Demo User', 'user@trek.rw', ${passwordHash}, 'CUSTOMER', true)
    ON CONFLICT (id) DO NOTHING
  `;

  console.log("Seeding activities...");
  const activityNames = [
    "Gorilla Trekking", "Golden Monkey Trekking", "Hiking", "Bird Watching",
    "Canopy Walk", "Boat Ride", "Fishing", "Cultural Experience",
    "Photography Safari", "Game Drive", "Nature Walk", "Mountain Biking",
    "Kayaking", "Swimming", "Camping", "Helicopter Tour", "Coffee Tour", "Dian Fossey Visit"
  ];

  for (let i = 0; i < activityNames.length; i++) {
    const name = activityNames[i];
    const slug = name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/-+/g, "-");
    await sql`
      INSERT INTO activities (name, slug) VALUES (${name}, ${slug})
      ON CONFLICT (name) DO NOTHING
    `;
  }

  console.log("Seeding regions...");
  const regions = [
    { name: "Kigali", desc: "The vibrant capital city of Rwanda" },
    { name: "Northern Province", desc: "Home to Volcanoes National Park" },
    { name: "Southern Province", desc: "Rich in culture and Nyungwe Forest" },
    { name: "Eastern Province", desc: "Home to Akagera National Park" },
    { name: "Western Province", desc: "Beautiful shores of Lake Kivu" },
    { name: "Musanze", desc: "Gateway to gorilla trekking" },
    { name: "Rubavu", desc: "Lakeside city on Lake Kivu" },
    { name: "Huye", desc: "Cultural heart of Rwanda" },
  ];

  for (let i = 0; i < regions.length; i++) {
    const r = regions[i];
    const slug = r.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/-+/g, "-");
    await sql`
      INSERT INTO regions (name, slug, description, sort_order) VALUES (${r.name}, ${slug}, ${r.desc}, ${i})
      ON CONFLICT (name) DO NOTHING
    `;
  }

  console.log("Seeding destinations...");
  const destinations = [
    {
      name: "Volcanoes National Park", slug: "volcanoes-national-park",
      desc: "Home to endangered mountain gorillas and golden monkeys, this park spans the Virunga volcanic mountains.",
      shortDesc: "Trek gorillas in the misty Virunga mountains",
      location: "Musanze District, Northern Province",
      district: "Musanze", province: "Northern",
    },
    {
      name: "Akagera National Park", slug: "akagera-national-park",
      desc: "Rwanda's only savannah park, home to the Big Five and diverse wildlife along the Kagera River.",
      shortDesc: "Safari experience with the Big Five",
      location: "Eastern Province",
      district: "Kayonza", province: "Eastern",
    },
    {
      name: "Nyungwe Forest National Park", slug: "nyungwe-forest-national-park",
      desc: "One of Africa's oldest rainforests, featuring a canopy walkway, chimpanzees, and 300+ bird species.",
      shortDesc: "Ancient rainforest with canopy walk",
      location: "Southern Province",
      district: "Nyamagabe", province: "Southern",
    },
    {
      name: "Lake Kivu", slug: "lake-kivu",
      desc: "One of the African Great Lakes, offering stunning scenery, water sports, and lakeside relaxation.",
      shortDesc: "Stunning lakeside relaxation and water sports",
      location: "Western Province",
      district: "Rubavu", province: "Western",
    },
    {
      name: "Kigali City", slug: "kigali-city",
      desc: "A clean, modern capital with vibrant markets, world-class restaurants, and the Kigali Genocide Memorial.",
      shortDesc: "Modern capital with rich culture and history",
      location: "Kigali",
      district: "Kigali", province: "Kigali",
    },
    {
      name: "Musanze Caves", slug: "musanze-caves",
      desc: "Dramatic lava caves formed by volcanic activity, offering guided tours into the earth.",
      shortDesc: "Explore dramatic underground lava caves",
      location: "Musanze District",
      district: "Musanze", province: "Northern",
    },
    {
      name: "Inema Arts Center", slug: "inema-arts-center",
      desc: "A contemporary art space in Kigali showcasing Rwandan and African art, with live painting sessions.",
      shortDesc: "Contemporary Rwandan art and culture",
      location: "Kigali",
      district: "Kigali", province: "Kigali",
    },
  ];

  for (const d of destinations) {
    await sql`
      INSERT INTO destinations (name, slug, description, short_desc, location, district, province, is_published)
      VALUES (${d.name}, ${d.slug}, ${d.desc}, ${d.shortDesc}, ${d.location}, ${d.district}, ${d.province}, true)
      ON CONFLICT (slug) DO NOTHING
    `;
  }

  console.log("Seeding vehicle companies...");
  const companies = [
    { name: "Safari Express", slug: "safari-express", desc: "Premium safari vehicle rental in Rwanda", phone: "+250788123456", email: "info@safariexpress.rw" },
    { name: "Rwanda Car Rentals", slug: "rwanda-car-rentals", desc: "Affordable car hire across Rwanda", phone: "+250788654321", email: "info@rwandacarrentals.rw" },
  ];

  for (const c of companies) {
    await sql`
      INSERT INTO vehicle_companies (name, slug, description, phone, email)
      VALUES (${c.name}, ${c.slug}, ${c.desc}, ${c.phone}, ${c.email})
      ON CONFLICT (slug) DO NOTHING
    `;
  }

  console.log("Seed complete!");
}

seed().catch(console.error).finally(() => process.exit(0));

# Database Schema Design

## Trek Rwanda — PostgreSQL Database

**Database:** `trek_rwanda`  
**Engine:** PostgreSQL 17  
**ORM:** Spring Data JPA / Hibernate

---

## Entity Relationship Overview

```
users ──────────────────────┐
   │                        │
   ├── bookings ────────────┤
   │      │                 │
   │      ├── safaris ──────┤
   │      │      │          │
   │      │      └── destinations
   │      │                 │
   │      └── vehicles ─────┘
   │             │
   │             └── vehicle_companies
   │
   └── reviews
          │
          ├── destinations
          └── safaris
```

---

## Tables

### 1. users

```sql
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    phone           VARCHAR(20),
    role            VARCHAR(20) NOT NULL DEFAULT 'CUSTOMER',
    avatar_url      VARCHAR(500),
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Roles: CUSTOMER, ADMIN
-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### 2. destinations

```sql
CREATE TABLE destinations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(200) NOT NULL,
    slug            VARCHAR(250) UNIQUE NOT NULL,
    description     TEXT NOT NULL,
    short_desc      VARCHAR(500),
    location        VARCHAR(200) NOT NULL,
    district        VARCHAR(100),
    province        VARCHAR(100),
    cover_image_url VARCHAR(500),
    opening_hours   VARCHAR(200),
    things_to_know  TEXT,
    latitude        DECIMAL(10, 8),
    longitude       DECIMAL(11, 8),
    is_published    BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order      INTEGER DEFAULT 0,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_destinations_slug ON destinations(slug);
CREATE INDEX idx_destinations_published ON destinations(is_published);
CREATE INDEX idx_destinations_district ON destinations(district);
```

### 3. destination_images

```sql
CREATE TABLE destination_images (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id  UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    image_url       VARCHAR(500) NOT NULL,
    alt_text        VARCHAR(255),
    sort_order      INTEGER DEFAULT 0,
    is_cover        BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_destination_images_dest ON destination_images(destination_id);
```

### 4. activities

```sql
CREATE TABLE activities (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) UNIQUE NOT NULL,
    slug            VARCHAR(120) UNIQUE NOT NULL,
    icon            VARCHAR(50),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### 5. destination_activities (junction table)

```sql
CREATE TABLE destination_activities (
    destination_id  UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    activity_id     UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
    PRIMARY KEY (destination_id, activity_id)
);
```

### 6. safaris

```sql
CREATE TABLE safaris (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(200) NOT NULL,
    slug            VARCHAR(250) UNIQUE NOT NULL,
    description     TEXT NOT NULL,
    short_desc      VARCHAR(500),
    duration_days   INTEGER NOT NULL,
    duration_nights INTEGER DEFAULT 0,
    price           DECIMAL(12, 2) NOT NULL,
    currency        VARCHAR(3) DEFAULT 'USD',
    max_participants INTEGER DEFAULT 20,
    difficulty_level VARCHAR(20) DEFAULT 'MODERATE',
    cover_image_url VARCHAR(500),
    included_items  TEXT,
    excluded_items  TEXT,
    itinerary       TEXT,
    destination_id  UUID NOT NULL REFERENCES destinations(id) ON DELETE SET NULL,
    is_published    BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order      INTEGER DEFAULT 0,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Difficulty: EASY, MODERATE, CHALLENGING, STRENUOUS
-- Indexes
CREATE INDEX idx_safaris_slug ON safaris(slug);
CREATE INDEX idx_safaris_published ON safaris(is_published);
CREATE INDEX idx_safaris_destination ON safaris(destination_id);
CREATE INDEX idx_safaris_price ON safaris(price);
```

### 7. safari_images

```sql
CREATE TABLE safari_images (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    safari_id       UUID NOT NULL REFERENCES safaris(id) ON DELETE CASCADE,
    image_url       VARCHAR(500) NOT NULL,
    alt_text        VARCHAR(255),
    sort_order      INTEGER DEFAULT 0,
    is_cover        BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_safari_images_safari ON safari_images(safari_id);
```

### 8. safari_activities (junction table)

```sql
CREATE TABLE safari_activities (
    safari_id       UUID NOT NULL REFERENCES safaris(id) ON DELETE CASCADE,
    activity_id     UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
    PRIMARY KEY (safari_id, activity_id)
);
```

### 9. vehicle_companies

```sql
CREATE TABLE vehicle_companies (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(200) NOT NULL,
    slug            VARCHAR(250) UNIQUE NOT NULL,
    description     TEXT,
    phone           VARCHAR(20),
    email           VARCHAR(255),
    website         VARCHAR(255),
    address         VARCHAR(500),
    logo_url        VARCHAR(500),
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vehicle_companies_slug ON vehicle_companies(slug);
```

### 10. vehicles

```sql
CREATE TABLE vehicles (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id      UUID NOT NULL REFERENCES vehicle_companies(id) ON DELETE CASCADE,
    name            VARCHAR(200) NOT NULL,
    slug            VARCHAR(250) UNIQUE NOT NULL,
    type            VARCHAR(50) NOT NULL,
    model           VARCHAR(100),
    brand           VARCHAR(100),
    year            INTEGER,
    seats           INTEGER NOT NULL,
    transmission    VARCHAR(20) DEFAULT 'AUTOMATIC',
    fuel_type       VARCHAR(20) DEFAULT 'DIESEL',
    features        TEXT,
    price_per_day   DECIMAL(10, 2) NOT NULL,
    currency        VARCHAR(3) DEFAULT 'USD',
    cover_image_url VARCHAR(500),
    is_available    BOOLEAN NOT NULL DEFAULT TRUE,
    is_published    BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order      INTEGER DEFAULT 0,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Vehicle types: CAR, SUV, SAFARI_VEHICLE, VAN, MINIBUS, LUXURY
-- Transmission: AUTOMATIC, MANUAL
-- Fuel: DIESEL, PETROL, HYBRID, ELECTRIC
-- Indexes
CREATE INDEX idx_vehicles_slug ON vehicles(slug);
CREATE INDEX idx_vehicles_company ON vehicles(company_id);
CREATE INDEX idx_vehicles_type ON vehicles(type);
CREATE INDEX idx_vehicles_price ON vehicles(price_per_day);
CREATE INDEX idx_vehicles_available ON vehicles(is_available);
```

### 11. vehicle_images

```sql
CREATE TABLE vehicle_images (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id      UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    image_url       VARCHAR(500) NOT NULL,
    alt_text        VARCHAR(255),
    sort_order      INTEGER DEFAULT 0,
    is_cover        BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vehicle_images_vehicle ON vehicle_images(vehicle_id);
```

### 12. bookings

```sql
CREATE TABLE bookings (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_ref     VARCHAR(20) UNIQUE NOT NULL,
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    safari_id       UUID REFERENCES safaris(id) ON DELETE SET NULL,
    vehicle_id      UUID REFERENCES vehicles(id) ON DELETE SET NULL,
    destination_id  UUID REFERENCES destinations(id) ON DELETE SET NULL,
    start_date      DATE NOT NULL,
    end_date        DATE NOT NULL,
    participants    INTEGER NOT NULL DEFAULT 1,
    total_price     DECIMAL(12, 2),
    currency        VARCHAR(3) DEFAULT 'USD',
    status          VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    payment_status  VARCHAR(20) NOT NULL DEFAULT 'UNPAID',
    customer_name   VARCHAR(100) NOT NULL,
    customer_email  VARCHAR(255) NOT NULL,
    customer_phone  VARCHAR(20),
    special_requests TEXT,
    admin_notes     TEXT,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Status: PENDING, CONFIRMED, COMPLETED, CANCELLED
-- Payment: UNPAID, PARTIAL, PAID, REFUNDED
-- Indexes
CREATE INDEX idx_bookings_ref ON bookings(booking_ref);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);
```

### 13. reviews

```sql
CREATE TABLE reviews (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    destination_id  UUID REFERENCES destinations(id) ON DELETE CASCADE,
    safari_id       UUID REFERENCES safaris(id) ON DELETE CASCADE,
    booking_id      UUID REFERENCES bookings(id) ON DELETE SET NULL,
    rating          INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title           VARCHAR(200),
    comment         TEXT NOT NULL,
    is_approved     BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured     BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_review_target CHECK (
        (destination_id IS NOT NULL AND safari_id IS NULL) OR
        (destination_id IS NULL AND safari_id IS NOT NULL)
    )
);

-- Indexes
CREATE INDEX idx_reviews_destination ON reviews(destination_id);
CREATE INDEX idx_reviews_safari ON reviews(safari_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_approved ON reviews(is_approved);
```

### 14. regions (for organizing destinations)

```sql
CREATE TABLE regions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) UNIQUE NOT NULL,
    slug            VARCHAR(120) UNIQUE NOT NULL,
    description     TEXT,
    image_url       VARCHAR(500),
    sort_order      INTEGER DEFAULT 0,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### 15. destinations_regions (junction — a destination can appear in multiple regions)

```sql
CREATE TABLE destination_regions (
    destination_id  UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    region_id       UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
    PRIMARY KEY (destination_id, region_id)
);
```

---

## Sample Data — Pre-filled Activities

```sql
INSERT INTO activities (name, slug) VALUES
('Gorilla Trekking', 'gorilla-trekking'),
('Golden Monkey Trekking', 'golden-monkey-trekking'),
('Hiking', 'hiking'),
('Bird Watching', 'bird-watching'),
('Canopy Walk', 'canopy-walk'),
('Boat Ride', 'boat-ride'),
('Fishing', 'fishing'),
('Cultural Experience', 'cultural-experience'),
('Photography Safari', 'photography-safari'),
('Game Drive', 'game-drive'),
('Nature Walk', 'nature-walk'),
('Mountain Biking', 'mountain-biking'),
('Kayaking', 'kayaking'),
('Swimming', 'swimming'),
('Camping', 'camping'),
('Helicopter Tour', 'helicopter-tour'),
('Coffee Tour', 'coffee-tour'),
('Visoke Hike', 'visoke-hike'),
('Bisoke Hike', 'bisoke-hike'),
('Dian Fossey Visit', 'dian-fossey-visit');
```

---

## Sample Data — Pre-filled Regions

```sql
INSERT INTO regions (name, slug) VALUES
('Kigali', 'kigali'),
('Northern Province', 'northern-province'),
('Southern Province', 'southern-province'),
('Eastern Province', 'eastern-province'),
('Western Province', 'western-province'),
('Musanze', 'musanze'),
('Rubavu', 'rubavu'),
('Huye', 'huye'),
('Nyungwe', 'nyungwe'),
('Lake Kivu', 'lake-kivu');
```

---

## Migration Strategy

Use **Flyway** for database migrations in Spring Boot.

```
backend/src/main/resources/db/migration/
├── V1__create_users_table.sql
├── V2__create_destinations_table.sql
├── V3__create_activities_table.sql
├── V4__create_safaris_table.sql
├── V5__create_vehicle_companies_table.sql
├── V6__create_vehicles_table.sql
├── V7__create_bookings_table.sql
├── V8__create_reviews_table.sql
├── V9__create_regions_table.sql
└── V10__seed_initial_data.sql
```

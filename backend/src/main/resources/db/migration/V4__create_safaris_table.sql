CREATE TABLE safaris (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(250) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    short_desc VARCHAR(500),
    duration_days INTEGER NOT NULL,
    duration_nights INTEGER DEFAULT 0,
    price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    max_participants INTEGER DEFAULT 20,
    difficulty_level VARCHAR(20) DEFAULT 'MODERATE',
    cover_image_url VARCHAR(500),
    included_items TEXT,
    excluded_items TEXT,
    itinerary TEXT,
    destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_safaris_slug ON safaris(slug);
CREATE INDEX idx_safaris_published ON safaris(is_published);
CREATE INDEX idx_safaris_destination ON safaris(destination_id);

CREATE TABLE safari_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    safari_id UUID NOT NULL REFERENCES safaris(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    is_cover BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_safari_images_safari ON safari_images(safari_id);

CREATE TABLE safari_activities (
    safari_id UUID NOT NULL REFERENCES safaris(id) ON DELETE CASCADE,
    activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
    PRIMARY KEY (safari_id, activity_id)
);

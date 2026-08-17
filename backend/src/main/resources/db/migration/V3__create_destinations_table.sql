CREATE TABLE destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(250) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    short_desc VARCHAR(500),
    location VARCHAR(200) NOT NULL,
    district VARCHAR(100),
    province VARCHAR(100),
    cover_image_url VARCHAR(500),
    opening_hours VARCHAR(200),
    things_to_know TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_destinations_slug ON destinations(slug);
CREATE INDEX idx_destinations_published ON destinations(is_published);
CREATE INDEX idx_destinations_district ON destinations(district);

CREATE TABLE destination_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    is_cover BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_destination_images_dest ON destination_images(destination_id);

CREATE TABLE destination_activities (
    destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
    PRIMARY KEY (destination_id, activity_id)
);

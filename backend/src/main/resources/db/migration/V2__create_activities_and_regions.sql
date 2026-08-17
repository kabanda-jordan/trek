CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    icon VARCHAR(50)
);

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
('Dian Fossey Visit', 'dian-fossey-visit');

CREATE TABLE regions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    sort_order INTEGER DEFAULT 0
);

INSERT INTO regions (name, slug) VALUES
('Kigali', 'kigali'),
('Northern Province', 'northern-province'),
('Southern Province', 'southern-province'),
('Eastern Province', 'eastern-province'),
('Western Province', 'western-province'),
('Musanze', 'musanze'),
('Rubavu', 'rubavu'),
('Huye', 'huye');

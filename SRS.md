# Software Requirements Specification (SRS)

## Trek Rwanda — Tourism Platform

**Version:** 1.0  
**Date:** August 17, 2026  
**Status:** Draft

---

## 1. Project Vision

**Trek Rwanda** is a full-stack tourism platform focused exclusively on Rwanda's tourism ecosystem. It serves as a content management system (CMS), booking platform, and tourism vehicle marketplace — all in one system.

The platform allows a client (tourism company) to manage all tourism content through an admin dashboard without touching code, while visitors can discover destinations, browse safaris, find vehicles, and make bookings.

**Project Name:** Trek Rwanda  
**Domain Focus:** Rwanda tourism only  
**Target Users:** International tourists, local tourists, tourism operators, vehicle companies

---

## 2. User Roles

| Role | Description | Access |
|------|-------------|--------|
| **Visitor** | Unauthenticated user browsing the website | Public pages only |
| **Customer** | Registered user who can book | Browse + Book + Review |
| **Admin** | Client/staff managing the platform | Full CMS + Booking management |
| *(Future)* **Tour Operator** | Manages own safaris/tours | Own content + Bookings |
| *(Future)* **Vehicle Owner** | Manages own vehicles | Own vehicles + Availability |

---

## 3. Functional Requirements

### 3.1 Public Website (Visitor)

#### 3.1.1 Homepage
- Hero section with Rwanda photography and "Discover Rwanda" headline
- Search bar (destinations, experiences)
- Featured destinations carousel/grid
- Featured safaris section
- Featured vehicles section
- Call-to-action for booking
- Footer with links, contact info

#### 3.1.2 Destinations Page
- Grid/list view of all published destinations
- Filter by region/district
- Each destination card shows: cover image, name, location, short description
- Click → destination detail page

#### 3.1.3 Destination Detail Page
- Full cover image
- Photo gallery
- Description (rich text)
- Location/district
- Opening hours
- Activities (tags)
- Things to know
- Nearby attractions
- Reviews section
- Related safaris

#### 3.1.4 Safaris Page
- Grid/list of available safaris
- Filter by destination, duration, price range
- Each safari card: name, duration, price, destination

#### 3.1.5 Safari Detail Page
- Full description
- Duration
- Price
- Included/excluded items
- Itinerary
- Photo gallery
- Booking CTA
- Reviews

#### 3.1.6 Vehicles Page
- Grid/list of available vehicles
- Filter by type, seats, price range, company
- Each vehicle card: image, type, model, seats, price/day, company name

#### 3.1.7 Vehicle Detail Page
- Photo gallery
- Vehicle specs (type, model, seats, features)
- Company info
- Price per day
- Availability check
- Booking CTA

#### 3.1.8 Booking Flow
```
Step 1: Select destination (optional)
Step 2: Select safari
Step 3: Select vehicle (optional)
Step 4: Choose date(s)
Step 5: Enter customer info (name, email, phone, special requests)
Step 6: Review booking
Step 7: Submit → Confirmation page
```

#### 3.1.9 Reviews
- Customer can leave review after booking
- Star rating (1-5)
- Text comment
- Admin can moderate/approve

#### 3.1.10 Search
- Global search across destinations, safaris, vehicles
- Autocomplete suggestions

### 3.2 Customer Accounts

- Registration (name, email, password)
- Login/Logout
- Profile page
- View booking history
- Leave reviews on completed bookings

### 3.3 Admin Dashboard (`/admin`)

#### 3.3.1 Dashboard Overview
- Total destinations, safaris, vehicles, companies
- Recent bookings
- Revenue summary
- Recent reviews

#### 3.3.2 Destination Management (CRUD)
- List all destinations
- Create new destination
- Edit destination
- Delete/archive destination
- Upload cover image
- Upload gallery images
- Manage activities
- Toggle published/draft status

#### 3.3.3 Safari Management (CRUD)
- List all safaris
- Create new safari
- Edit safari
- Delete safari
- Upload images
- Set pricing, duration
- Link to destination

#### 3.3.4 Vehicle Management (CRUD)
- List all vehicles
- Create new vehicle
- Edit vehicle
- Delete vehicle
- Upload vehicle images
- Set pricing, specs
- Link to company

#### 3.3.5 Company Management (CRUD)
- List vehicle companies
- Create new company
- Edit company
- Delete company

#### 3.3.6 Booking Management
- List all bookings
- Filter by status, date, customer
- View booking details
- Update booking status (pending → confirmed → completed → cancelled)
- Admin notes

#### 3.3.7 Review Management
- List all reviews
- Approve/reject reviews
- Delete inappropriate reviews

#### 3.3.8 User Management
- List registered users
- View user details
- Ban/unban users

#### 3.3.9 Image Management
- Upload images (cover, gallery)
- Delete images
- Reorder gallery images

---

## 4. Non-Functional Requirements

### 4.1 Performance
- Page load < 3 seconds
- Image lazy loading
- Optimized images (WebP/AVIF)
- API response < 500ms

### 4.2 Security
- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing (bcrypt)
- CSRF protection
- Input validation and sanitization
- Rate limiting
- SQL injection prevention (via ORM)
- XSS prevention

### 4.3 SEO
- Server-side rendering (SSR) via Next.js
- Meta tags per page
- Open Graph tags
- Structured data (JSON-LD)
- Sitemap
- Clean URLs (slugs)

### 4.4 Responsive Design
- Mobile-first
- Breakpoints: 320px, 768px, 1024px, 1280px
- Touch-friendly navigation

### 4.5 Accessibility
- WCAG 2.1 AA compliance
- Alt text on all images
- Keyboard navigation
- Screen reader friendly

### 4.6 Internationalization
- English (primary)
- French (future)
- Kinyarwanda (future)

---

## 5. Technology Stack

### Frontend
```
Next.js 15 (App Router)
React 19
TypeScript 6
Tailwind CSS 4
next/image (image optimization)
next/navigation (routing)
```

### Backend
```
Spring Boot 3.x
Java 21
Spring Security (authentication/authorization)
Spring Data JPA (ORM)
Hibernate (entity mapping)
PostgreSQL 17
Maven/Gradle (build)
```

### Infrastructure
```
Docker + Docker Compose
Object storage (images) — S3-compatible
Redis (caching — future)
```

---

## 6. System Architecture

```
                         INTERNET
                            │
                            ▼
                   ┌─────────────────┐
                   │   CDN / Proxy   │
                   │  (Cloudflare)   │
                   └────────┬────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
       ┌─────────────────┐    ┌─────────────────┐
       │    Next.js      │    │   Spring Boot   │
       │   Frontend      │    │    Backend      │
       │  (Port 3000)    │◄──►│  (Port 8080)    │
       │  SSR + CSR      │REST│  REST API       │
       └─────────────────┘    └────────┬────────┘
                                       │
                             ┌─────────┼──────────┐
                             │         │          │
                             ▼         ▼          ▼
                    ┌─────────────┐ ┌───────┐ ┌─────────┐
                    │ PostgreSQL  │ │ Redis │ │ S3/MinIO│
                    │  (Port 5432)│ │(cache)│ │(images) │
                    └─────────────┘ └───────┘ └─────────┘
```

### Frontend ↔ Backend Communication
- REST API over HTTP/HTTPS
- JSON payloads
- JWT token in Authorization header
- CORS configured for frontend origin

### Image Flow
```
Admin uploads image
        ↓
Next.js API route or direct to Spring Boot
        ↓
Spring Boot processes + stores in S3/MinIO
        ↓
Returns image URL
        ↓
URL stored in PostgreSQL
        ↓
Next.js renders via next/image with optimization
```

---

## 7. Key Design Decisions

### 7.1 Monorepo vs Multi-Repo
**Decision:** Monorepo with two apps  
```
trek1/
├── frontend/          ← Next.js app
├── backend/           ← Spring Boot app
├── docker-compose.yml
├── SRS.md
├── DATABASE.md
├── API.md
└── PROJECT.md
```

### 7.2 Image Storage
**Decision:** S3-compatible object storage (MinIO for dev, AWS S3 for production)  
- Images never stored in database
- Database stores only URLs
- Next.js `next/image` handles optimization

### 7.3 Authentication
**Decision:** JWT (JSON Web Tokens)
- Stateless authentication
- Token stored in HTTP-only cookie
- Refresh token pattern for security

### 7.4 Slug-based URLs
**Decision:** All entities use slugs for URLs
- `/destinations/volcanoes-national-park`
- `/safaris/gorilla-trekking`
- `/vehicles/toyota-land-cruiser`

---

## 8. Success Criteria

1. Admin can create/edit/delete all content without touching code
2. Visitors can browse, search, and discover Rwanda tourism
3. Visitors can complete a booking flow end-to-end
4. Platform loads fast (< 3s) and is mobile-friendly
5. All images are optimized and served via CDN
6. Codebase is well-structured and maintainable
7. Deployed and accessible via public URL

---

## 9. Out of Scope (Phase 1)

- Payment processing (Mobile Money integration)
- Email notifications (booking confirmations)
- Multi-language support
- Tour operator portal
- Vehicle owner portal
- Real-time availability calendar
- Map integration (Google Maps/Mapbox)
- Analytics dashboard
- Mobile app

---

## 10. References

- Rwanda Tourism Board: https://www.visitrwanda.com
- Volcanoes National Park
- Akagera National Park
- Nyungwe National Park
- Lake Kivu

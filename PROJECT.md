# Development Roadmap

## Trek Rwanda — Phase-by-Phase Build Plan

---

## Project Structure

```
trek1/
├── frontend/                    ← Next.js app
│   ├── src/
│   │   ├── app/                 ← App Router pages
│   │   │   ├── (public)/        ← Public route group
│   │   │   │   ├── layout.tsx   ← Public layout (header/footer)
│   │   │   │   ├── page.tsx     ← Homepage
│   │   │   │   ├── destinations/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [slug]/page.tsx
│   │   │   │   ├── safaris/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [slug]/page.tsx
│   │   │   │   ├── vehicles/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [slug]/page.tsx
│   │   │   │   ├── booking/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── search/
│   │   │   │       └── page.tsx
│   │   │   ├── (auth)/          ← Auth route group
│   │   │   │   ├── login/page.tsx
│   │   │   │   └── register/page.tsx
│   │   │   ├── admin/           ← Admin dashboard
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx     ← Dashboard overview
│   │   │   │   ├── destinations/
│   │   │   │   ├── safaris/
│   │   │   │   ├── vehicles/
│   │   │   │   ├── companies/
│   │   │   │   ├── bookings/
│   │   │   │   ├── reviews/
│   │   │   │   └── users/
│   │   │   └── api/             ← Next.js API routes (if needed)
│   │   ├── components/
│   │   │   ├── ui/              ← Reusable UI components
│   │   │   ├── layout/          ← Header, Footer, Sidebar
│   │   │   ├── destinations/
│   │   │   ├── safaris/
│   │   │   ├── vehicles/
│   │   │   ├── booking/
│   │   │   └── admin/
│   │   ├── lib/
│   │   │   ├── api.ts           ← API client functions
│   │   │   ├── auth.ts          ← Auth helpers
│   │   │   └── utils.ts
│   │   ├── hooks/               ← Custom React hooks
│   │   ├── types/               ← TypeScript types
│   │   └── styles/
│   ├── public/
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                     ← Spring Boot app
│   ├── src/main/java/com/trek/rwanda/
│   │   ├── TrekRwandaApplication.java
│   │   ├── config/
│   │   │   ├── SecurityConfig.java
│   │   │   ├── CorsConfig.java
│   │   │   └── JwtConfig.java
│   │   ├── auth/
│   │   │   ├── AuthController.java
│   │   │   ├── AuthService.java
│   │   │   ├── JwtService.java
│   │   │   └── dto/
│   │   ├── user/
│   │   │   ├── User.java
│   │   │   ├── UserRepository.java
│   │   │   └── UserService.java
│   │   ├── destination/
│   │   │   ├── Destination.java
│   │   │   ├── DestinationController.java
│   │   │   ├── DestinationService.java
│   │   │   ├── DestinationRepository.java
│   │   │   └── dto/
│   │   ├── safari/
│   │   │   ├── Safari.java
│   │   │   ├── SafariController.java
│   │   │   ├── SafariService.java
│   │   │   └── dto/
│   │   ├── vehicle/
│   │   │   ├── Vehicle.java
│   │   │   ├── VehicleController.java
│   │   │   ├── VehicleService.java
│   │   │   └── dto/
│   │   ├── company/
│   │   │   ├── VehicleCompany.java
│   │   │   ├── CompanyController.java
│   │   │   └── dto/
│   │   ├── booking/
│   │   │   ├── Booking.java
│   │   │   ├── BookingController.java
│   │   │   ├── BookingService.java
│   │   │   └── dto/
│   │   ├── review/
│   │   │   ├── Review.java
│   │   │   ├── ReviewController.java
│   │   │   ├── ReviewService.java
│   │   │   └── dto/
│   │   ├── activity/
│   │   │   ├── Activity.java
│   │   │   └── ActivityRepository.java
│   │   ├── region/
│   │   │   ├── Region.java
│   │   │   └── RegionRepository.java
│   │   ├── upload/
│   │   │   ├── UploadController.java
│   │   │   └── StorageService.java
│   │   ├── common/
│   │   │   ├── ApiResponse.java
│   │   │   ├── PageResponse.java
│   │   │   └── GlobalExceptionHandler.java
│   │   └── admin/
│   │       ├── AdminDashboardController.java
│   │       └── AdminService.java
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── db/migration/
│   └── pom.xml
│
├── docker-compose.yml
├── .gitignore
├── SRS.md
├── DATABASE.md
├── API.md
└── PROJECT.md
```

---

## Phase 1 — Foundation (Week 1-2)

> Goal: Project setup, database, basic backend + frontend, authentication

### Backend Setup
- [ ] Initialize Spring Boot project with Maven
- [ ] Configure PostgreSQL connection
- [ ] Set up Flyway for migrations
- [ ] Create User entity + repository
- [ ] Implement JWT authentication (register, login, refresh)
- [ ] Configure Spring Security (role-based access)
- [ ] Create global exception handler
- [ ] Set up CORS configuration
- [ ] Create base ApiResponse/PageResponse classes

### Frontend Setup
- [ ] Initialize Next.js 15 project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up App Router structure
- [ ] Create public layout (header, footer)
- [ ] Create admin layout (sidebar, topbar)
- [ ] Create API client utility
- [ ] Create auth context/provider
- [ ] Build login page
- [ ] Build register page
- [ ] Build admin login

### Database
- [ ] Create users table migration
- [ ] Seed admin user

### Docker
- [ ] Create docker-compose.yml (PostgreSQL + MinIO)
- [ ] Verify database connection

**Deliverable:** User can register, login, access admin dashboard

---

## Phase 2 — Tourism CMS (Week 3-4)

> Goal: Destinations, activities, images — full admin CRUD

### Backend
- [ ] Create Destination entity + repository
- [ ] Create Activity entity + repository
- [ ] Create DestinationImage entity
- [ ] Create Region entity
- [ ] Create destination CRUD endpoints (public + admin)
- [ ] Create activity endpoints
- [ ] Create region endpoints
- [ ] Implement image upload (MinIO/S3)
- [ ] Create slug generation utility
- [ ] Add pagination + sorting

### Frontend — Public
- [ ] Homepage (hero, featured destinations, featured safaris)
- [ ] Destinations list page with filters
- [ ] Destination detail page (gallery, activities, reviews)

### Frontend — Admin
- [ ] Destinations list (with draft/published filter)
- [ ] Create/Edit destination form
- [ ] Image upload component
- [ ] Activity management

### Database
- [ ] Create destinations, destination_images, activities, destination_activities, regions migrations

**Deliverable:** Admin can create destinations with images, visitors can browse them

---

## Phase 3 — Safaris (Week 5)

> Goal: Safari experiences with admin management

### Backend
- [ ] Create Safari entity + repository
- [ ] Create SafariImage entity
- [ ] Create safari CRUD endpoints
- [ ] Link safaris to destinations and activities

### Frontend — Public
- [ ] Safaris list page with filters
- [ ] Safari detail page (itinerary, pricing, gallery)

### Frontend — Admin
- [ ] Safaris list
- [ ] Create/Edit safari form
- [ ] Safari image management

### Database
- [ ] Create safaris, safari_images, safari_activities migrations

**Deliverable:** Complete safari browsing and management

---

## Phase 4 — Vehicles (Week 6)

> Goal: Vehicle companies and vehicles marketplace

### Backend
- [ ] Create VehicleCompany entity
- [ ] Create Vehicle entity + images
- [ ] Create company CRUD endpoints
- [ ] Create vehicle CRUD endpoints

### Frontend — Public
- [ ] Vehicles list page with filters (type, seats, price)
- [ ] Vehicle detail page (specs, company, pricing)
- [ ] Companies list page
- [ ] Company detail page

### Frontend — Admin
- [ ] Companies management
- [ ] Vehicles management
- [ ] Vehicle image upload

### Database
- [ ] Create vehicle_companies, vehicles, vehicle_images migrations

**Deliverable:** Complete vehicle browsing and management

---

## Phase 5 — Booking System (Week 7)

> Goal: End-to-end booking flow

### Backend
- [ ] Create Booking entity
- [ ] Create booking creation endpoint
- [ ] Create booking status management
- [ ] Create booking reference generator (TR-2026-XXXX)
- [ ] Calculate total price
- [ ] Admin booking management endpoints

### Frontend — Public
- [ ] Multi-step booking form
  - [ ] Step 1: Select safari
  - [ ] Step 2: Select vehicle (optional)
  - [ ] Step 3: Choose dates
  - [ ] Step 4: Enter customer info
  - [ ] Step 5: Review + Submit
- [ ] Booking confirmation page
- [ ] My Bookings page (authenticated)

### Frontend — Admin
- [ ] Bookings list with status filters
- [ ] Booking detail view
- [ ] Update booking status
- [ ] Admin notes

### Database
- [ ] Create bookings migration

**Deliverable:** Visitors can book safaris/vehicles, admin manages bookings

---

## Phase 6 — Reviews (Week 8)

> Goal: Customer reviews and ratings

### Backend
- [ ] Create Review entity
- [ ] Create review endpoints (CRUD)
- [ ] Admin moderation endpoints
- [ ] Average rating calculation

### Frontend — Public
- [ ] Reviews section on destination/safari detail pages
- [ ] Review submission form (authenticated)

### Frontend — Admin
- [ ] Reviews moderation panel
- [ ] Approve/reject/delete reviews

### Database
- [ ] Create reviews migration

**Deliverable:** Review system with moderation

---

## Phase 7 — Search & Polish (Week 9)

> Goal: Search, SEO, performance optimization

### Search
- [ ] Global search endpoint
- [ ] Search page with results
- [ ] Autocomplete (optional)

### SEO
- [ ] Meta tags per page
- [ ] Open Graph tags
- [ ] JSON-LD structured data
- [ ] Sitemap generation
- [ ] Clean slug-based URLs

### Performance
- [ ] Image optimization (next/image)
- [ ] Lazy loading
- [ ] API response caching (Redis — future)
- [ ] Frontend code splitting

---

## Phase 8 — Production (Week 10)

> Goal: Security, deployment, monitoring

### Security
- [ ] Input validation (backend + frontend)
- [ ] Rate limiting
- [ ] CSRF protection
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] HTTPS enforcement
- [ ] Security headers

### Deployment
- [ ] Dockerfile for frontend
- [ ] Dockerfile for backend
- [ ] docker-compose.yml (full stack)
- [ ] Environment variables configuration
- [ ] Deploy to cloud (AWS/DigitalOcean)

### Monitoring
- [ ] Application logging
- [ ] Error tracking
- [ ] Health check endpoints

---

## Technology Decisions Log

| Decision | Choice | Reason |
|----------|--------|--------|
| Frontend | Next.js 15 | SSR, App Router, image optimization |
| UI | Tailwind CSS | Rapid styling, consistent design |
| Backend | Spring Boot | Enterprise Java, great ecosystem |
| Database | PostgreSQL | Relational data, JSON support |
| ORM | Spring Data JPA | Type-safe, repository pattern |
| Auth | JWT | Stateless, scalable |
| Images | MinIO (dev) / AWS S3 (prod) | S3-compatible, scalable |
| Migrations | Flyway | Version-controlled schema |
| Container | Docker Compose | Easy local dev setup |

---

## How to Work on This

1. **Always start with the backend** — define the API, entities, and endpoints
2. **Then build the frontend** — consume the API with proper UI
3. **Test with real data** — seed database with Rwanda tourism content
4. **Commit often** — small, focused commits
5. **Follow the phase order** — don't skip ahead

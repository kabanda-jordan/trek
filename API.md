# REST API Endpoint Design

## Trek Rwanda — Backend API

**Base URL:** `http://localhost:8080/api`  
**Authentication:** JWT Bearer token in `Authorization` header  
**Content-Type:** `application/json`

---

## Authentication Headers

```
# Public (no header needed)
GET /api/destinations

# Authenticated
Authorization: Bearer <jwt_token>

# Admin only
Authorization: Bearer <admin_jwt_token>
```

---

## 1. Authentication

### Register
```http
POST /api/auth/register

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "phone": "+250788123456"
}

Response 201:
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "CUSTOMER",
  "token": "jwt_token",
  "refreshToken": "refresh_token"
}
```

### Login
```http
POST /api/auth/login

{
  "email": "john@example.com",
  "password": "securepass123"
}

Response 200:
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "CUSTOMER",
  "token": "jwt_token",
  "refreshToken": "refresh_token"
}
```

### Refresh Token
```http
POST /api/auth/refresh

{
  "refreshToken": "refresh_token"
}

Response 200:
{
  "token": "new_jwt_token",
  "refreshToken": "new_refresh_token"
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>

Response 200:
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+250788123456",
  "role": "CUSTOMER",
  "avatarUrl": "url",
  "createdAt": "2026-08-17T10:00:00Z"
}
```

---

## 2. Destinations (Public)

### List Destinations
```http
GET /api/destinations?page=0&size=12&district=Kigali&sort=name,asc

Response 200:
{
  "content": [
    {
      "id": "uuid",
      "name": "Volcanoes National Park",
      "slug": "volcanoes-national-park",
      "shortDesc": "Home to mountain gorillas...",
      "location": "Musanze",
      "district": "Northern Province",
      "coverImageUrl": "url",
      "activities": ["Gorilla Trekking", "Hiking"]
    }
  ],
  "totalElements": 24,
  "totalPages": 2,
  "currentPage": 0
}
```

### Get Destination by Slug
```http
GET /api/destinations/volcanoes-national-park

Response 200:
{
  "id": "uuid",
  "name": "Volcanoes National Park",
  "slug": "volcanoes-national-park",
  "description": "Full rich text description...",
  "shortDesc": "Home to mountain gorillas...",
  "location": "Musanze",
  "district": "Northern Province",
  "coverImageUrl": "url",
  "openingHours": "8:00 AM - 5:00 PM",
  "thingsToKnow": "...",
  "latitude": -1.4833,
  "longitude": 29.5833,
  "activities": [...],
  "images": [
    { "id": "uuid", "imageUrl": "url", "altText": "...", "isCover": true }
  ],
  "reviews": {
    "averageRating": 4.7,
    "totalReviews": 42
  },
  "nearbyDestinations": [...],
  "safaris": [...]
}
```

### Search Destinations
```http
GET /api/destinations/search?q=gorilla

Response 200:
{
  "content": [...]
}
```

---

## 3. Safaris (Public)

### List Safaris
```http
GET /api/safaris?page=0&size=12&destination=volcanoes&minPrice=100&maxPrice=500&duration=3

Response 200:
{
  "content": [
    {
      "id": "uuid",
      "name": "Gorilla Trekking Experience",
      "slug": "gorilla-trekking-experience",
      "shortDesc": "3-day gorilla trek...",
      "durationDays": 3,
      "price": 1500.00,
      "currency": "USD",
      "difficultyLevel": "MODERATE",
      "coverImageUrl": "url",
      "destination": {
        "name": "Volcanoes National Park",
        "slug": "volcanoes-national-park"
      }
    }
  ],
  "totalElements": 18,
  "totalPages": 2,
  "currentPage": 0
}
```

### Get Safari by Slug
```http
GET /api/safaris/gorilla-trekking-experience

Response 200:
{
  "id": "uuid",
  "name": "Gorilla Trekking Experience",
  "slug": "gorilla-trekking-experience",
  "description": "Full description...",
  "durationDays": 3,
  "durationNights": 2,
  "price": 1500.00,
  "currency": "USD",
  "maxParticipants": 8,
  "difficultyLevel": "MODERATE",
  "includedItems": ["Guide", "Permits", "Accommodation"],
  "excludedItems": ["Flights", "Travel Insurance"],
  "itinerary": "Day 1: ...",
  "destination": {...},
  "activities": [...],
  "images": [...],
  "reviews": {
    "averageRating": 4.8,
    "totalReviews": 36
  }
}
```

---

## 4. Vehicles (Public)

### List Vehicles
```http
GET /api/vehicles?page=0&size=12&type=SUV&minPrice=50&maxPrice=200&seats=7

Response 200:
{
  "content": [
    {
      "id": "uuid",
      "name": "Toyota Land Cruiser",
      "slug": "toyota-land-cruiser",
      "type": "SUV",
      "brand": "Toyota",
      "model": "Land Cruiser",
      "seats": 7,
      "transmission": "AUTOMATIC",
      "fuelType": "DIESEL",
      "pricePerDay": 120.00,
      "currency": "USD",
      "coverImageUrl": "url",
      "company": {
        "name": "ABC Tours Rwanda",
        "slug": "abc-tours-rwanda"
      }
    }
  ],
  "totalElements": 42,
  "totalPages": 4,
  "currentPage": 0
}
```

### Get Vehicle by Slug
```http
GET /api/vehicles/toyota-land-cruiser

Response 200:
{
  "id": "uuid",
  "name": "Toyota Land Cruiser",
  "slug": "toyota-land-cruiser",
  "type": "SUV",
  "brand": "Toyota",
  "model": "Land Cruiser",
  "year": 2023,
  "seats": 7,
  "transmission": "AUTOMATIC",
  "fuelType": "DIESEL",
  "features": "AC, GPS, Roof Rack, Cooler Box",
  "pricePerDay": 120.00,
  "coverImageUrl": "url",
  "images": [...],
  "company": {
    "name": "ABC Tours Rwanda",
    "slug": "abc-tours-rwanda",
    "phone": "+250788123456",
    "email": "info@abc.rw"
  }
}
```

---

## 5. Vehicle Companies (Public)

### List Companies
```http
GET /api/companies?page=0&size=20

Response 200:
{
  "content": [...]
}
```

### Get Company by Slug
```http
GET /api/companies/abc-tours-rwanda

Response 200:
{
  "id": "uuid",
  "name": "ABC Tours Rwanda",
  "slug": "abc-tours-rwanda",
  "description": "...",
  "phone": "+250788123456",
  "email": "info@abc.rw",
  "website": "https://abc.rw",
  "logoUrl": "url",
  "vehicles": [...]
}
```

---

## 6. Bookings

### Create Booking (Authenticated)
```http
POST /api/bookings
Authorization: Bearer <token>

{
  "safariId": "uuid",
  "vehicleId": "uuid",
  "destinationId": "uuid",
  "startDate": "2026-09-15",
  "endDate": "2026-09-18",
  "participants": 2,
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+250788123456",
  "specialRequests": "Vegetarian meals preferred"
}

Response 201:
{
  "id": "uuid",
  "bookingRef": "TR-2026-0001",
  "status": "PENDING",
  "totalPrice": 3000.00,
  "startDate": "2026-09-15",
  "endDate": "2026-09-18"
}
```

### Get My Bookings (Authenticated)
```http
GET /api/bookings/my?page=0&size=10
Authorization: Bearer <token>

Response 200:
{
  "content": [
    {
      "id": "uuid",
      "bookingRef": "TR-2026-0001",
      "safari": { "name": "Gorilla Trekking" },
      "vehicle": { "name": "Toyota Land Cruiser" },
      "startDate": "2026-09-15",
      "endDate": "2026-09-18",
      "status": "CONFIRMED",
      "totalPrice": 3000.00
    }
  ]
}
```

### Get Booking Detail
```http
GET /api/bookings/TR-2026-0001
Authorization: Bearer <token>

Response 200:
{
  "id": "uuid",
  "bookingRef": "TR-2026-0001",
  "safari": {...},
  "vehicle": {...},
  "destination": {...},
  "startDate": "2026-09-15",
  "endDate": "2026-09-18",
  "participants": 2,
  "totalPrice": 3000.00,
  "status": "CONFIRMED",
  "paymentStatus": "PAID",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+250788123456",
  "specialRequests": "Vegetarian meals preferred",
  "createdAt": "2026-08-17T10:00:00Z"
}
```

### Cancel Booking
```http
PUT /api/bookings/TR-2026-0001/cancel
Authorization: Bearer <token>

Response 200:
{
  "message": "Booking cancelled successfully",
  "status": "CANCELLED"
}
```

---

## 7. Reviews

### Get Reviews for Destination
```http
GET /api/destinations/volcanoes-national-park/reviews?page=0&size=10

Response 200:
{
  "content": [
    {
      "id": "uuid",
      "rating": 5,
      "title": "Amazing experience!",
      "comment": "The gorilla trekking was incredible...",
      "userName": "John D.",
      "createdAt": "2026-08-10T14:30:00Z"
    }
  ],
  "averageRating": 4.7,
  "totalReviews": 42
}
```

### Create Review (Authenticated)
```http
POST /api/reviews
Authorization: Bearer <token>

{
  "destinationId": "uuid",
  "rating": 5,
  "title": "Amazing experience!",
  "comment": "The gorilla trekking was incredible..."
}

Response 201:
{
  "id": "uuid",
  "rating": 5,
  "status": "PENDING_APPROVAL"
}
```

---

## 8. Search

### Global Search
```http
GET /api/search?q=gorilla&page=0&size=20

Response 200:
{
  "destinations": [...],
  "safaris": [...],
  "vehicles": [...]
}
```

---

## 9. Admin Endpoints (Admin Only)

All admin endpoints require `Authorization: Bearer <admin_token>` and role = ADMIN.

### Dashboard Stats
```http
GET /api/admin/dashboard

Response 200:
{
  "totalDestinations": 24,
  "totalSafaris": 18,
  "totalVehicles": 42,
  "totalCompanies": 12,
  "totalBookings": 136,
  "totalUsers": 520,
  "recentBookings": [...],
  "recentReviews": [...],
  "monthlyRevenue": 45000.00
}
```

### Admin Destinations
```http
GET    /api/admin/destinations                    (list, includes drafts)
GET    /api/admin/destinations/{id}               (detail)
POST   /api/admin/destinations                    (create)
PUT    /api/admin/destinations/{id}               (update)
DELETE /api/admin/destinations/{id}               (delete)
PUT    /api/admin/destinations/{id}/publish        (toggle publish)
POST   /api/admin/destinations/{id}/images        (upload image)
DELETE /api/admin/destinations/{id}/images/{imgId} (delete image)
```

### Admin Safaris
```http
GET    /api/admin/safaris
GET    /api/admin/safaris/{id}
POST   /api/admin/safaris
PUT    /api/admin/safaris/{id}
DELETE /api/admin/safaris/{id}
PUT    /api/admin/safaris/{id}/publish
POST   /api/admin/safaris/{id}/images
DELETE /api/admin/safaris/{id}/images/{imgId}
```

### Admin Vehicle Companies
```http
GET    /api/admin/companies
GET    /api/admin/companies/{id}
POST   /api/admin/companies
PUT    /api/admin/companies/{id}
DELETE /api/admin/companies/{id}
```

### Admin Vehicles
```http
GET    /api/admin/vehicles
GET    /api/admin/vehicles/{id}
POST   /api/admin/vehicles
PUT    /api/admin/vehicles/{id}
DELETE /api/admin/vehicles/{id}
PUT    /api/admin/vehicles/{id}/availability
POST   /api/admin/vehicles/{id}/images
DELETE /api/admin/vehicles/{id}/images/{imgId}
```

### Admin Bookings
```http
GET    /api/admin/bookings?status=PENDING&page=0&size=20
GET    /api/admin/bookings/{id}
PUT    /api/admin/bookings/{id}/status
PUT    /api/admin/bookings/{id}/notes
```

### Admin Reviews
```http
GET    /api/admin/reviews?approved=false&page=0&size=20
PUT    /api/admin/reviews/{id}/approve
PUT    /api/admin/reviews/{id}/reject
DELETE /api/admin/reviews/{id}
```

### Admin Users
```http
GET    /api/admin/users?page=0&size=20
GET    /api/admin/users/{id}
PUT    /api/admin/users/{id}/ban
PUT    /api/admin/users/{id}/unban
```

### Admin Activities
```http
GET    /api/admin/activities
POST   /api/admin/activities
DELETE /api/admin/activities/{id}
```

### Admin Regions
```http
GET    /api/admin/regions
POST   /api/admin/regions
PUT    /api/admin/regions/{id}
DELETE /api/admin/regions/{id}
```

---

## 10. File Upload

### Upload Image
```http
POST /api/upload/image
Content-Type: multipart/form-data
Authorization: Bearer <token>

Form fields:
  file: <image_binary>
  folder: "destinations" | "safaris" | "vehicles" | "companies" | "avatars"

Response 200:
{
  "url": "https://storage.trek.rw/images/destinations/abc123.jpg",
  "filename": "abc123.jpg",
  "size": 245000,
  "contentType": "image/jpeg"
}
```

---

## API Response Standard

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "DESTINATION_NOT_FOUND",
    "message": "Destination with slug 'xyz' not found",
    "status": 404
  }
}
```

### Pagination Response
```json
{
  "content": [...],
  "totalElements": 100,
  "totalPages": 10,
  "currentPage": 0,
  "size": 12
}
```

---

## Rate Limiting

| Endpoint | Limit |
|----------|-------|
| Public GET | 100 req/min |
| Auth POST | 20 req/min |
| File Upload | 10 req/min |
| Admin | 200 req/min |

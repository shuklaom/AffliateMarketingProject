# Everyday Deals - Affiliate Product Aggregation Platform

A full-stack web application for discovering affiliate product deals. Users browse deals by category, search products, and click through affiliate links. Admin endpoints are protected by an API key.

---

## Project Structure

```
AffliateMarketingProject/
+-- frontend/                 # React 19 SPA (CSS Modules)
�   +-- src/
�       +-- components/
�       �   +-- layout/       # Layout, Header, Footer
�       �   +-- ui/           # Badge, Button, CategoryFilter, Pagination,
�       �                     #   ProductCard, SearchBar, Spinner
�       +-- config/           # api.js, constants.js
�       +-- hooks/            # useProducts.js, useDebounce.js
�       +-- pages/            # HomePage, BrowseDealsPage,
�       �                     #   ProductDetailPage, NotFoundPage
�       +-- services/         # apiClient.js, productService.js
�       +-- styles/           # global.css
�
+-- backend/                  # Spring Boot 3.3 / Java 21 / MySQL
�   +-- src/main/java/com/everydaydeals/backend/
�       +-- config/           # CorsConfig, SecurityConfig
�       +-- controller/       # ProductController
�       +-- dto/              # ProductDto, ProductRequest, PagedResponse
�       +-- exception/        # GlobalExceptionHandler
�       +-- model/            # Product
�       +-- repository/       # ProductRepository
�       +-- security/         # AdminKeyFilter
�       +-- service/          # ProductService
�
+-- README.md
```

---

## Status

| Component            | Status       | Notes                                       |
|----------------------|--------------|---------------------------------------------|
| React Frontend       | ? Complete  | Running at http://localhost:3000            |
| UI Components        | ? Complete  | 7 components, CSS Modules, responsive       |
| Product browsing     | ? Complete  | Search, category filter, pagination         |
| Spring Boot Backend  | ? Complete  | Products CRUD, paginated reads, soft-delete |
| Admin API security   | ? Complete  | X-Admin-Key header required for writes      |
| MySQL Database       | ? Ready     | 50 seeded products across 6 categories      |
| Authentication/login | ? Not planned | Browse-only, no user accounts             |
| Wishlist             | ? Not planned | Out of scope                              |
| Python Crawler       | ? Not planned | Products managed via admin API            |

---

## Getting Started

### Prerequisites
- Node.js 18+
- Java 21+ (tested with Amazon Corretto 25)
- Maven 3.9+
- MySQL 8+

### Backend

```bash
cd backend

# Seed the database (creates the schema + 50 sample products)
# mysql -u root -p < src/main/resources/db/seed.sql

# Set environment variables (or rely on defaults for local dev)
# DB_URL, DB_USERNAME, DB_PASSWORD, CORS_ALLOWED_ORIGINS, ADMIN_API_KEY

# Start
./start.sh        # Linux/Mac
start.bat         # Windows
# or:  mvn spring-boot:run
```

Server starts on **http://localhost:8080**

### Frontend

```bash
cd frontend
npm install
npm start
```

App opens at **http://localhost:3000**

Create a `.env` file in `frontend/` to override the API URL:
```
REACT_APP_API_URL=http://localhost:8080/api
```

---

## API Reference

### Public Endpoints (no auth required)

| Method | Path                                | Description                     |
|--------|-------------------------------------|---------------------------------|
| GET    | `/api/products`                     | All active products (paginated) |
| GET    | `/api/products/{id}`                | Single product                  |
| GET    | `/api/products/category/{category}` | Filter by category (paginated)  |
| GET    | `/api/products/search?q=<query>`    | Full-text search (paginated)    |
| GET    | `/actuator/health`                  | Health check                    |

Pagination parameters: `page` (default 1), `limit` (default 24, max 100).

### Admin Endpoints (require `X-Admin-Key` header)

| Method | Path                  | Description           |
|--------|-----------------------|-----------------------|
| POST   | `/api/products`       | Create a product      |
| PUT    | `/api/products/{id}`  | Update a product      |
| DELETE | `/api/products/{id}`  | Soft-delete a product |

Set `ADMIN_API_KEY` environment variable on the server. Pass the same value in the `X-Admin-Key` request header.

Example:
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -H "X-Admin-Key: your-secret-key" \
  -d '{"title":"Deal Name","price":29.99,"affiliateUrl":"https://...","category":"Electronics"}'
```

### Product Object

```json
{
  "id": 1,
  "title": "Sony WH-1000XM5 Headphones",
  "description": "Industry-leading noise cancellation...",
  "price": 279.99,
  "originalPrice": 399.99,
  "imageUrl": "https://images.unsplash.com/...",
  "affiliateUrl": "https://example.com/aff/sony-wh1000xm5",
  "retailer": "Amazon",
  "category": "Electronics",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### Categories

The seeded database contains these categories (case-insensitive in API):
`Electronics`, `Kitchen`, `Fashion`, `Books`, `Toys`, `Sports`

---

## Architecture

```
Browser
  ?  HTTP
React SPA (port 3000)
  ?  Axios (REACT_APP_API_URL)
Spring Boot REST API (port 8080)
  ?  JPA / Hibernate
MySQL (everydaydeals database)
```

### Tech Stack

| Layer    | Technology                                      | Version |
|----------|-------------------------------------------------|---------|
| Frontend | React, React Router, Axios, CSS Modules         | 19 / 7  |
| Backend  | Spring Boot, Spring Security, JPA / Hibernate   | 3.3.0   |
| Database | MySQL                                           | 8+      |
| Build    | Maven (backend), npm (frontend)                 | 3.9 / 10|

---

## Configuration

### Backend (`application.properties`)

| Property                     | Env Variable           | Default                                     |
|------------------------------|------------------------|---------------------------------------------|
| `server.port`                | `SERVER_PORT`          | `8080`                                      |
| `spring.datasource.url`      | `DB_URL`               | `jdbc:mysql://localhost:3306/everydaydeals` |
| `spring.datasource.username` | `DB_USERNAME`          | `root`                                      |
| `spring.datasource.password` | `DB_PASSWORD`          | _(empty)_                                   |
| `cors.allowed-origins`       | `CORS_ALLOWED_ORIGINS` | `http://localhost:3000`                     |
| `admin.api-key`              | `ADMIN_API_KEY`        | _(empty � writes blocked if not set)_       |

> **Important:** If `ADMIN_API_KEY` is not set, all POST/PUT/DELETE requests return `401 Unauthorized`. Set it to a strong random secret in production.

### Frontend (`.env`)

| Variable            | Default                     |
|---------------------|-----------------------------|
| `REACT_APP_API_URL` | `http://localhost:8080/api` |

---

## Security

- All GET requests are public � no authentication needed to browse deals.
- POST / PUT / DELETE require a valid `X-Admin-Key` header.
- If `ADMIN_API_KEY` is blank (unset), all write operations are blocked � fail-secure by default.
- CSRF is disabled (stateless REST API).
- Sessions are stateless (no cookies).
- CORS is restricted to `CORS_ALLOWED_ORIGINS` (defaults to localhost:3000).

---

## Troubleshooting

| Issue                             | Solution                                                              |
|-----------------------------------|-----------------------------------------------------------------------|
| `npm install` fails               | `npm cache clean --force && npm install`                              |
| Port 3000 already in use          | `PORT=3001 npm start`                                                 |
| Backend won't start               | Check MySQL is running; verify `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` |
| API calls return CORS error       | Set `CORS_ALLOWED_ORIGINS` to match your frontend origin              |
| POST/PUT/DELETE returns 401       | Set `ADMIN_API_KEY` env var and pass it as `X-Admin-Key` header       |
| Category filter returns 0 results | Use exact names: Electronics, Kitchen, Fashion, Books, Toys, Sports   |

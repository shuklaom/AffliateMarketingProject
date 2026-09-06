# Everyday Deals

Everyday Deals is a full-stack app for browsing affiliate product deals. Visitors can search products, browse by category, and follow the listed affiliate links. The backend also includes protected endpoints for managing the product catalog.

The React frontend lives in `frontend/`; the Spring Boot API lives in `backend/`.

## Features

- Paginated product browsing
- Product search and category filtering
- Affiliate links in product listings
- Admin product creation, updates, and soft deletes
- API-key protection for product write operations

## Stack

- React, React Router, Axios, and CSS Modules
- Java, Spring Boot, Spring Data JPA, and Spring Security
- MySQL 8
- Maven and npm

## Run it locally

You will need Node.js 18 or newer, Java 21 or newer, Maven 3.8 or newer, and MySQL 8.

### Database

Create a database named `everydaydeals`, then load the sample data:

```bash
mysql -u root -p everydaydeals < backend/src/main/resources/db/seed.sql
```

By default, the backend connects to MySQL on `localhost:3306`. `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` can be used to override those connection settings.

### Backend

On Windows, set the database password in the same Command Prompt before launching the backend:

```bat
set "DB_PASSWORD=your_mysql_password"
cd backend
start.bat
```

On macOS or Linux:

```bash
cd backend
DB_PASSWORD=your_mysql_password ./start.sh
```

The backend starts at `http://localhost:8080`.

### Frontend

Open a second terminal and run:

```bash
cd frontend
npm install
npm start
```

The frontend runs at `http://localhost:3000` and uses `http://localhost:8080/api` by default. Create a local `frontend/.env` file to point it somewhere else:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

## API

Public endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/products` | List active products |
| `GET` | `/api/products/{id}` | Get a product by ID |
| `GET` | `/api/products/category/{category}` | List products in a category |
| `GET` | `/api/products/search?q=...` | Search products |
| `GET` | `/actuator/health` | Check backend health |

Product lists accept `page` (default `1`) and `limit` (default `24`, maximum `100`).

Admin endpoints require the `X-Admin-Key` header:

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/products` | Add a product |
| `PUT` | `/api/products/{id}` | Update a product |
| `DELETE` | `/api/products/{id}` | Soft-delete a product |

Set `ADMIN_API_KEY` on the backend, then use that value in requests:

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -H "X-Admin-Key: your_admin_key" \
  -d '{"title":"Deal Name","price":29.99,"affiliateUrl":"https://example.com/deal","category":"Electronics"}'
```

## Configuration

| Variable | Used for | Default |
| --- | --- | --- |
| `SERVER_PORT` | Backend HTTP port | `8080` |
| `DB_URL` | MySQL JDBC URL | Local `everydaydeals` database |
| `DB_USERNAME` | MySQL user | `root` |
| `DB_PASSWORD` | MySQL password | None |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origin | `http://localhost:3000` |
| `ADMIN_API_KEY` | Key for product write requests | None |

Without `ADMIN_API_KEY`, write requests are rejected.

## Notes

Keep credentials in environment variables or local `.env` files. Do not commit them.

# ShopSmart E-commerce Platform

A modern e-commerce platform built with TypeScript (Fastify) backend and Python (FastAPI) ML service for the SQUAD-Driven Feature Development lab.

## Architecture

- **API Service**: TypeScript + Fastify REST API (port 3000)
- **ML Service**: Python + FastAPI recommendation engine (port 8000)
- **Database**: PostgreSQL 16
- **Cache**: Redis 7

## Features

### Implemented ✅

- **Products Module**: Full CRUD, category filtering, search, pagination
- **Users Module**: Registration, login (JWT), profile management
- **Orders Module**: Create orders, order history, status tracking

### To Be Built by SQUAD 🚧

- **Reviews Module**: Product reviews and ratings
- **Recommendations Module**: ML-powered product recommendations

## Project Structure

```
shopsmart/
├── api/                    # TypeScript Fastify backend
├── ml-service/            # Python FastAPI ML service
├── database/              # PostgreSQL schema and seed data
├── docker-compose.yml     # Service orchestration
└── .github/workflows/     # CI pipeline
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)
- Python 3.11+ (for local development)

### Quick Start with Docker

```bash
cd shopsmart
docker-compose up -d
```

Services will be available at:
- API: http://localhost:3000
- ML Service: http://localhost:8000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### API Endpoints

#### Products
- `GET /api/products` - List products (with pagination, filtering, search)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

#### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login and get JWT token
- `GET /api/users/me` - Get current user profile (authenticated)
- `PUT /api/users/me` - Update current user profile (authenticated)

#### Orders
- `POST /api/orders` - Create new order (authenticated)
- `GET /api/orders` - Get user's order history (authenticated)
- `GET /api/orders/:id` - Get order details (authenticated)
- `PATCH /api/orders/:id/status` - Update order status (authenticated)

### Local Development

#### API Service

```bash
cd api
npm install
npm run dev
```

#### ML Service

```bash
cd ml-service
poetry install
poetry run python -m uvicorn src.main:app --reload
```

## Database

The database is seeded with:
- 20 users
- 50 products across 5 categories (Electronics, Books, Clothing, Home, Sports)
- 100 sample orders

Default credentials for all seed users: password hash for empty string

## Testing

```bash
# API tests
cd api
npm test

# ML service tests
cd ml-service
poetry run pytest
```

## CI/CD

GitHub Actions workflow builds TypeScript, lints Python, and runs tests on push/PR.

## Lab Instructions

This platform is ready for SQUAD to implement the Reviews and Recommendations features:

1. **Reviews Module**: Allow users to review products with ratings (1-5 stars) and comments
2. **Recommendations Module**: Use ML to recommend products based on user behavior and reviews

The database schema for reviews is already created. SQUAD should build the API routes, services, and ML recommendation logic.

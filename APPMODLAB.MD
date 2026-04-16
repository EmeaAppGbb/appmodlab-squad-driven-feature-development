---
title: "SQUAD-Driven Feature Development"
description: "Build complete features end-to-end with SQUAD agents on polyglot codebases"
authors: ["marconsilva"]
category: "Agentic Software Development"
industry: "Retail & Consumer Goods"
services: []
languages: ["TypeScript", "Python"]
frameworks: ["Fastify", "FastAPI", "PostgreSQL", "Redis"]
modernizationTools: []
agenticTools: ["SQUAD"]
tags: ["e-commerce", "recommendations", "multi-language", "feature-development", "review-system"]
extensions: ["github.copilot"]
thumbnail: ""
video: ""
version: "1.0.0"
---

## Overview

ShopSmart is an e-commerce platform running on TypeScript (Fastify) and Python (FastAPI). The platform has working products, users, and orders — but the reviews and recommendations modules are empty stubs waiting for SQUAD-driven development.

## Initial Application State

### Project Structure

The ShopSmart directory tree shows the full project layout with status badges indicating which components are working and which are stubs.

> 📸 [View: Project Structure](assets/screenshots/01-project-structure.html)
> *Open the HTML file in a browser to view the syntax-highlighted rendering.*

### Docker Compose — Service Orchestration

The development environment orchestrates four services: PostgreSQL, Redis, a TypeScript API server, and a Python ML service.

> 📸 [View: Docker Compose — Four-Service Orchestration](assets/screenshots/02-docker-compose.html)
> *Open the HTML file in a browser to view the syntax-highlighted rendering.*

### API Server (TypeScript)

The Fastify entry point registers products, users, and orders routes — but the reviews module is missing.

> 📸 [View: API Server — Fastify Entry Point](assets/screenshots/03-api-server-ts.html)
> *Open the HTML file in a browser to view the syntax-highlighted rendering.*

### ML Service (Python)

The FastAPI application exposes a health endpoint, but the recommendations engine is only a stub.

> 📸 [View: ML Service — FastAPI Application](assets/screenshots/04-ml-service-main-py.html)
> *Open the HTML file in a browser to view the syntax-highlighted rendering.*

### Database Schema

Five tables define the data model: users, products, orders, order_items, and reviews.

> 📸 [View: Database Schema](assets/screenshots/05-database-schema.html)
> *Open the HTML file in a browser to view the syntax-highlighted rendering.*

### CI Workflow

GitHub Actions runs TypeScript build and test, plus Python lint and test on every push.

> 📸 [View: CI Workflow — GitHub Actions](assets/screenshots/06-ci-workflow.html)
> *Open the HTML file in a browser to view the syntax-highlighted rendering.*

### Product Service (Reference Implementation)

The working Product Service CRUD implementation serves as the pattern the SQUAD will mirror when building the reviews module.

> 📸 [View: Product Service — Working CRUD Example](assets/screenshots/07-product-service-ts.html)
> *Open the HTML file in a browser to view the syntax-highlighted rendering.*

### Seed Data

The database ships with 20 users, 50 products, and 100 orders — but zero reviews, making it the perfect starting point for SQUAD-driven feature development.

> 📸 [View: Seed Data Overview](assets/screenshots/08-seed-data-overview.html)
> *Open the HTML file in a browser to view the syntax-highlighted rendering.*

## Screenshots

The `assets/screenshots/` directory contains syntax-highlighted HTML renderings of the initial codebase. Open any `.html` file in a browser to view or capture a screenshot.

| # | Screenshot | What it shows |
|---|-----------|---------------|
| 1 | [Project Structure](assets/screenshots/01-project-structure.html) | Full directory tree with status badges (✅ working vs ⚠️ empty stubs) |
| 2 | [Docker Compose](assets/screenshots/02-docker-compose.html) | Four-service orchestration: Postgres, Redis, TS API, Python ML |
| 3 | [API Server (TypeScript)](assets/screenshots/03-api-server-ts.html) | Fastify entry point — products/users/orders registered, reviews missing |
| 4 | [ML Service (Python)](assets/screenshots/04-ml-service-main-py.html) | FastAPI app with health endpoint; recommendations stub only |
| 5 | [Database Schema](assets/screenshots/05-database-schema.html) | Five tables: users, products, orders, order_items, reviews |
| 6 | [CI Workflow](assets/screenshots/06-ci-workflow.html) | GitHub Actions — TS build+test, Python lint+test |
| 7 | [Product Service](assets/screenshots/07-product-service-ts.html) | Working CRUD example the SQUAD will mirror for reviews |
| 8 | [Seed Data Overview](assets/screenshots/08-seed-data-overview.html) | 20 users, 50 products, 100 orders — zero reviews |

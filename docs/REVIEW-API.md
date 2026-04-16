# Product Review & Rating API Documentation

## Overview

The Product Review API allows users to create, read, update, and delete product reviews, and retrieve aggregate product ratings.

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### Create a Review

```
POST /api/reviews
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| product_id | number | Yes | ID of the product being reviewed |
| user_id | number | Yes | ID of the user writing the review |
| rating | number | Yes | Rating from 1 to 5 |
| comment | string | No | Optional review comment |

**Example Request:**

```json
{
  "product_id": 1,
  "user_id": 5,
  "rating": 5,
  "comment": "Excellent product! Highly recommended."
}
```

**Example Response (201 Created):**

```json
{
  "id": 1,
  "product_id": 1,
  "user_id": 5,
  "rating": 5,
  "comment": "Excellent product! Highly recommended.",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

### Get Reviews for a Product

```
GET /api/products/:productId/reviews
```

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 20 | Results per page (max 100) |
| rating | number | - | Filter by exact rating (1-5) |

**Example Response:**

```json
{
  "reviews": [
    {
      "id": 1,
      "product_id": 1,
      "user_id": 5,
      "rating": 5,
      "comment": "Excellent!",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1
  }
}
```

### Get Product Rating

```
GET /api/products/:productId/rating
```

**Example Response:**

```json
{
  "product_id": 1,
  "average_rating": 4.50,
  "review_count": 10
}
```

### Get Single Review

```
GET /api/reviews/:id
```

### Update a Review

```
PUT /api/reviews/:id
```

**Request Body (all fields optional):**

| Field | Type | Description |
|-------|------|-------------|
| rating | number | Updated rating (1-5) |
| comment | string | Updated comment |

### Delete a Review

```
DELETE /api/reviews/:id
```

**Response:** 204 No Content

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Validation error (invalid input) |
| 404 | Review or product not found |
| 500 | Internal server error |

## Recommendations API (ML Service)

### Base URL

```
http://localhost:8000
```

### Get User Recommendations

```
GET /recommendations/user/:userId?limit=10
```

Returns personalized product recommendations using collaborative filtering with popular products fallback.

### Get Similar Products

```
GET /recommendations/product/:productId/similar?limit=5
```

Returns products similar to the given product based on shared reviewers and category.

export const reviewSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    product_id: { type: 'number' },
    user_id: { type: 'number' },
    rating: { type: 'number' },
    comment: { type: 'string', nullable: true },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
  },
};

export const createReviewSchema = {
  body: {
    type: 'object',
    required: ['product_id', 'user_id', 'rating'],
    properties: {
      product_id: { type: 'number', minimum: 1 },
      user_id: { type: 'number', minimum: 1 },
      rating: { type: 'number', minimum: 1, maximum: 5 },
      comment: { type: 'string', minLength: 1 },
    },
  },
  response: {
    201: reviewSchema,
  },
};

export const updateReviewSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  body: {
    type: 'object',
    properties: {
      rating: { type: 'number', minimum: 1, maximum: 5 },
      comment: { type: 'string', minLength: 1 },
    },
  },
  response: {
    200: reviewSchema,
  },
};

export const getReviewsSchema = {
  params: {
    type: 'object',
    required: ['productId'],
    properties: {
      productId: { type: 'number' },
    },
  },
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number', minimum: 1 },
      limit: { type: 'number', minimum: 1, maximum: 100 },
      rating: { type: 'number', minimum: 1, maximum: 5 },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        reviews: { type: 'array', items: reviewSchema },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' },
            totalPages: { type: 'number' },
          },
        },
      },
    },
  },
};

export const getReviewByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    200: reviewSchema,
  },
};

export const getProductRatingSchema = {
  params: {
    type: 'object',
    required: ['productId'],
    properties: {
      productId: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        product_id: { type: 'number' },
        average_rating: { type: 'number' },
        review_count: { type: 'number' },
      },
    },
  },
};

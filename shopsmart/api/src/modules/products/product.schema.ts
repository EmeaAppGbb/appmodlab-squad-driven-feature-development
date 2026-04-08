export const productSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    category: { type: 'string', enum: ['Electronics', 'Books', 'Clothing', 'Home', 'Sports'] },
    stock: { type: 'number' },
    image_url: { type: 'string', nullable: true },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
  },
};

export const createProductSchema = {
  body: {
    type: 'object',
    required: ['name', 'description', 'price', 'category', 'stock'],
    properties: {
      name: { type: 'string', minLength: 1 },
      description: { type: 'string', minLength: 1 },
      price: { type: 'number', minimum: 0 },
      category: { type: 'string', enum: ['Electronics', 'Books', 'Clothing', 'Home', 'Sports'] },
      stock: { type: 'number', minimum: 0 },
      image_url: { type: 'string' },
    },
  },
  response: {
    201: productSchema,
  },
};

export const updateProductSchema = {
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
      name: { type: 'string', minLength: 1 },
      description: { type: 'string', minLength: 1 },
      price: { type: 'number', minimum: 0 },
      category: { type: 'string', enum: ['Electronics', 'Books', 'Clothing', 'Home', 'Sports'] },
      stock: { type: 'number', minimum: 0 },
      image_url: { type: 'string' },
    },
  },
  response: {
    200: productSchema,
  },
};

export const getProductsSchema = {
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number', minimum: 1 },
      limit: { type: 'number', minimum: 1, maximum: 100 },
      category: { type: 'string', enum: ['Electronics', 'Books', 'Clothing', 'Home', 'Sports'] },
      search: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        products: { type: 'array', items: productSchema },
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

export const getProductByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    200: productSchema,
  },
};

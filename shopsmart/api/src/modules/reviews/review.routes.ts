import { FastifyInstance } from 'fastify';
import { ReviewService } from './review.service';
import { CreateReviewInput, UpdateReviewInput, ReviewQueryParams } from './review.types';
import {
  createReviewSchema,
  updateReviewSchema,
  getReviewsSchema,
  getReviewByIdSchema,
  getProductRatingSchema,
} from './review.schema';

export async function reviewRoutes(fastify: FastifyInstance) {
  const reviewService = new ReviewService(fastify.db);

  // GET /api/products/:productId/reviews - Get reviews for a product
  fastify.get('/products/:productId/reviews', { schema: getReviewsSchema }, async (request, reply) => {
    const { productId } = request.params as { productId: number };
    const params = request.query as ReviewQueryParams;
    const result = await reviewService.getReviewsByProduct(productId, params);
    return result;
  });

  // GET /api/products/:productId/rating - Get aggregate rating
  fastify.get('/products/:productId/rating', { schema: getProductRatingSchema }, async (request, reply) => {
    const { productId } = request.params as { productId: number };
    const rating = await reviewService.getProductRating(productId);
    return rating;
  });

  // GET /api/reviews/:id - Get a single review
  fastify.get('/reviews/:id', { schema: getReviewByIdSchema }, async (request, reply) => {
    const { id } = request.params as { id: number };
    const review = await reviewService.getReviewById(id);
    return review;
  });

  // POST /api/reviews - Create a review
  fastify.post('/reviews', { schema: createReviewSchema }, async (request, reply) => {
    const input = request.body as CreateReviewInput;
    const review = await reviewService.createReview(input);
    reply.code(201);
    return review;
  });

  // PUT /api/reviews/:id - Update a review
  fastify.put('/reviews/:id', { schema: updateReviewSchema }, async (request, reply) => {
    const { id } = request.params as { id: number };
    const input = request.body as UpdateReviewInput;
    const review = await reviewService.updateReview(id, input);
    return review;
  });

  // DELETE /api/reviews/:id - Delete a review
  fastify.delete('/reviews/:id', async (request, reply) => {
    const { id } = request.params as { id: number };
    await reviewService.deleteReview(id);
    reply.code(204);
  });
}

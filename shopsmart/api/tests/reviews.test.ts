import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReviewService } from '../src/modules/reviews/review.service';

// Mock the pg Pool
const mockQuery = vi.fn();
const mockPool = { query: mockQuery } as any;

describe('Review API', () => {
  let reviewService: ReviewService;

  beforeEach(() => {
    reviewService = new ReviewService(mockPool);
    mockQuery.mockReset();
  });

  describe('ReviewService', () => {
    describe('getReviewsByProduct', () => {
      it('should return paginated reviews for a product', async () => {
        const mockReviews = [
          { id: 1, product_id: 1, user_id: 1, rating: 5, comment: 'Great!', created_at: new Date(), updated_at: new Date() },
          { id: 2, product_id: 1, user_id: 2, rating: 4, comment: 'Good', created_at: new Date(), updated_at: new Date() },
        ];
        mockQuery
          .mockResolvedValueOnce({ rows: [{ count: '2' }] })
          .mockResolvedValueOnce({ rows: mockReviews });

        const result = await reviewService.getReviewsByProduct(1, { page: 1, limit: 20 });

        expect(result.reviews).toHaveLength(2);
        expect(result.pagination.total).toBe(2);
        expect(result.pagination.page).toBe(1);
      });

      it('should filter reviews by rating', async () => {
        mockQuery
          .mockResolvedValueOnce({ rows: [{ count: '1' }] })
          .mockResolvedValueOnce({ rows: [{ id: 1, product_id: 1, user_id: 1, rating: 5, comment: 'Perfect!' }] });

        const result = await reviewService.getReviewsByProduct(1, { rating: 5 });

        expect(result.reviews).toHaveLength(1);
        expect(mockQuery).toHaveBeenCalledTimes(2);
      });

      it('should handle empty results', async () => {
        mockQuery
          .mockResolvedValueOnce({ rows: [{ count: '0' }] })
          .mockResolvedValueOnce({ rows: [] });

        const result = await reviewService.getReviewsByProduct(999, {});

        expect(result.reviews).toHaveLength(0);
        expect(result.pagination.total).toBe(0);
        expect(result.pagination.totalPages).toBe(0);
      });
    });

    describe('getReviewById', () => {
      it('should return a review by id', async () => {
        const mockReview = { id: 1, product_id: 1, user_id: 1, rating: 5, comment: 'Excellent!' };
        mockQuery.mockResolvedValueOnce({ rows: [mockReview] });

        const result = await reviewService.getReviewById(1);

        expect(result).toEqual(mockReview);
      });

      it('should throw NotFoundError for non-existent review', async () => {
        mockQuery.mockResolvedValueOnce({ rows: [] });

        await expect(reviewService.getReviewById(999)).rejects.toThrow('Review with id 999 not found');
      });
    });

    describe('createReview', () => {
      it('should create a new review', async () => {
        const input = { product_id: 1, user_id: 1, rating: 5, comment: 'Amazing product!' };
        const mockCreated = { id: 1, ...input, created_at: new Date(), updated_at: new Date() };
        mockQuery.mockResolvedValueOnce({ rows: [mockCreated] });

        const result = await reviewService.createReview(input);

        expect(result.id).toBe(1);
        expect(result.rating).toBe(5);
        expect(result.comment).toBe('Amazing product!');
      });

      it('should create a review without comment', async () => {
        const input = { product_id: 1, user_id: 1, rating: 3 };
        const mockCreated = { id: 2, ...input, comment: null, created_at: new Date(), updated_at: new Date() };
        mockQuery.mockResolvedValueOnce({ rows: [mockCreated] });

        const result = await reviewService.createReview(input);

        expect(result.comment).toBeNull();
      });
    });

    describe('updateReview', () => {
      it('should update review rating', async () => {
        const mockUpdated = { id: 1, product_id: 1, user_id: 1, rating: 4, comment: 'Good' };
        mockQuery.mockResolvedValueOnce({ rows: [mockUpdated] });

        const result = await reviewService.updateReview(1, { rating: 4 });

        expect(result.rating).toBe(4);
      });

      it('should update review comment', async () => {
        const mockUpdated = { id: 1, product_id: 1, user_id: 1, rating: 5, comment: 'Updated comment' };
        mockQuery.mockResolvedValueOnce({ rows: [mockUpdated] });

        const result = await reviewService.updateReview(1, { comment: 'Updated comment' });

        expect(result.comment).toBe('Updated comment');
      });

      it('should return existing review when no updates provided', async () => {
        const mockReview = { id: 1, product_id: 1, user_id: 1, rating: 5, comment: 'Original' };
        mockQuery.mockResolvedValueOnce({ rows: [mockReview] });

        const result = await reviewService.updateReview(1, {});

        expect(result).toEqual(mockReview);
      });

      it('should throw NotFoundError for non-existent review', async () => {
        mockQuery.mockResolvedValueOnce({ rows: [] });

        await expect(reviewService.updateReview(999, { rating: 3 })).rejects.toThrow('Review with id 999 not found');
      });
    });

    describe('deleteReview', () => {
      it('should delete a review', async () => {
        mockQuery.mockResolvedValueOnce({ rows: [{ id: 1 }] });

        await expect(reviewService.deleteReview(1)).resolves.toBeUndefined();
      });

      it('should throw NotFoundError for non-existent review', async () => {
        mockQuery.mockResolvedValueOnce({ rows: [] });

        await expect(reviewService.deleteReview(999)).rejects.toThrow('Review with id 999 not found');
      });
    });

    describe('getProductRating', () => {
      it('should return aggregate rating for a product', async () => {
        mockQuery.mockResolvedValueOnce({
          rows: [{ product_id: 1, average_rating: 4.5, review_count: 10 }],
        });

        const result = await reviewService.getProductRating(1);

        expect(result.product_id).toBe(1);
        expect(result.average_rating).toBe(4.5);
        expect(result.review_count).toBe(10);
      });

      it('should return zero for product with no reviews', async () => {
        mockQuery.mockResolvedValueOnce({
          rows: [{ product_id: 999, average_rating: 0, review_count: 0 }],
        });

        const result = await reviewService.getProductRating(999);

        expect(result.average_rating).toBe(0);
        expect(result.review_count).toBe(0);
      });
    });
  });

  describe('Review Types', () => {
    it('should export Review interface types', async () => {
      const { ReviewService } = await import('../src/modules/reviews/review.service');
      expect(ReviewService).toBeDefined();
    });
  });
});

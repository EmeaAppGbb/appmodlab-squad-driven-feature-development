import { Pool } from 'pg';
import { Review, CreateReviewInput, UpdateReviewInput, ReviewQueryParams, ProductRating } from './review.types';
import { NotFoundError } from '../../utils/errors';

export class ReviewService {
  constructor(private db: Pool) {}

  async getReviewsByProduct(productId: number, params: ReviewQueryParams) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM reviews WHERE product_id = $1';
    const values: any[] = [productId];
    let paramCount = 1;

    if (params.rating) {
      paramCount++;
      query += ` AND rating = $${paramCount}`;
      values.push(params.rating);
    }

    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*)');
    const countResult = await this.db.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count, 10);

    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    values.push(limit, offset);

    const result = await this.db.query(query, values);

    return {
      reviews: result.rows as Review[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getReviewById(id: number): Promise<Review> {
    const result = await this.db.query('SELECT * FROM reviews WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      throw new NotFoundError(`Review with id ${id} not found`);
    }

    return result.rows[0] as Review;
  }

  async createReview(input: CreateReviewInput): Promise<Review> {
    const result = await this.db.query(
      `INSERT INTO reviews (product_id, user_id, rating, comment)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [input.product_id, input.user_id, input.rating, input.comment || null]
    );

    return result.rows[0] as Review;
  }

  async updateReview(id: number, input: UpdateReviewInput): Promise<Review> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 0;

    if (input.rating !== undefined) {
      paramCount++;
      updates.push(`rating = $${paramCount}`);
      values.push(input.rating);
    }
    if (input.comment !== undefined) {
      paramCount++;
      updates.push(`comment = $${paramCount}`);
      values.push(input.comment);
    }

    if (updates.length === 0) {
      return this.getReviewById(id);
    }

    updates.push(`updated_at = NOW()`);
    paramCount++;
    values.push(id);

    const result = await this.db.query(
      `UPDATE reviews SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      throw new NotFoundError(`Review with id ${id} not found`);
    }

    return result.rows[0] as Review;
  }

  async deleteReview(id: number): Promise<void> {
    const result = await this.db.query('DELETE FROM reviews WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      throw new NotFoundError(`Review with id ${id} not found`);
    }
  }

  async getProductRating(productId: number): Promise<ProductRating> {
    const result = await this.db.query(
      `SELECT 
        $1::integer as product_id,
        COALESCE(AVG(rating)::numeric(3,2), 0) as average_rating,
        COUNT(*)::integer as review_count
       FROM reviews 
       WHERE product_id = $1`,
      [productId]
    );

    return result.rows[0] as ProductRating;
  }
}

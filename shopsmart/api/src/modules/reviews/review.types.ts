export interface Review {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  comment: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateReviewInput {
  product_id: number;
  user_id: number;
  rating: number;
  comment?: string;
}

export interface UpdateReviewInput {
  rating?: number;
  comment?: string;
}

export interface ReviewQueryParams {
  page?: number;
  limit?: number;
  rating?: number;
}

export interface ProductRating {
  product_id: number;
  average_rating: number;
  review_count: number;
}

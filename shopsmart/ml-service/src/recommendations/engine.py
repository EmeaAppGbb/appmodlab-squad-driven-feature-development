import asyncpg
from typing import List, Optional
from ..config import settings
from ..models.recommendation import (
    RecommendationItem,
    RecommendationResponse,
    SimilarProductItem,
    SimilarProductsResponse,
)


class RecommendationEngine:
    def __init__(self):
        self.pool: Optional[asyncpg.Pool] = None

    async def initialize(self):
        self.pool = await asyncpg.create_pool(
            host=settings.postgres_host,
            port=settings.postgres_port,
            database=settings.postgres_db,
            user=settings.postgres_user,
            password=settings.postgres_password,
            min_size=2,
            max_size=10,
        )

    async def close(self):
        if self.pool:
            await self.pool.close()

    async def get_user_recommendations(
        self, user_id: int, limit: int = 10
    ) -> RecommendationResponse:
        if not self.pool:
            await self.initialize()

        # Strategy 1: Collaborative filtering based on reviews
        recommendations = await self._collaborative_filtering(user_id, limit)

        if len(recommendations) >= limit:
            return RecommendationResponse(
                user_id=user_id,
                recommendations=recommendations[:limit],
                strategy="collaborative_filtering",
            )

        # Strategy 2: Fallback to popular products
        popular = await self._popular_products(user_id, limit - len(recommendations))
        recommendations.extend(popular)

        strategy = "collaborative_filtering" if len(recommendations) > len(popular) else "popular_products"

        return RecommendationResponse(
            user_id=user_id,
            recommendations=recommendations[:limit],
            strategy=strategy,
        )

    async def _collaborative_filtering(
        self, user_id: int, limit: int
    ) -> List[RecommendationItem]:
        """Find products liked by users with similar taste."""
        query = """
            WITH user_reviews AS (
                SELECT product_id, rating FROM reviews WHERE user_id = $1 AND rating >= 4
            ),
            similar_users AS (
                SELECT r.user_id, COUNT(*) as common_products,
                       AVG(r.rating) as avg_rating
                FROM reviews r
                INNER JOIN user_reviews ur ON r.product_id = ur.product_id
                WHERE r.user_id != $1 AND r.rating >= 4
                GROUP BY r.user_id
                HAVING COUNT(*) >= 1
                ORDER BY common_products DESC, avg_rating DESC
                LIMIT 20
            ),
            recommended AS (
                SELECT r.product_id,
                       AVG(r.rating) / 5.0 as score,
                       COUNT(*) as review_count
                FROM reviews r
                INNER JOIN similar_users su ON r.user_id = su.user_id
                WHERE r.product_id NOT IN (SELECT product_id FROM user_reviews)
                  AND r.rating >= 3
                GROUP BY r.product_id
                ORDER BY score DESC, review_count DESC
                LIMIT $2
            )
            SELECT product_id, score FROM recommended
        """
        rows = await self.pool.fetch(query, user_id, limit)
        return [
            RecommendationItem(
                product_id=row["product_id"],
                score=float(row["score"]),
                reason="Liked by users with similar taste",
            )
            for row in rows
        ]

    async def _popular_products(
        self, user_id: int, limit: int
    ) -> List[RecommendationItem]:
        """Fallback: recommend popular products the user hasn't reviewed."""
        query = """
            SELECT p.id as product_id,
                   COALESCE(AVG(r.rating) / 5.0, 0.5) as score
            FROM products p
            LEFT JOIN reviews r ON p.id = r.product_id
            WHERE p.id NOT IN (
                SELECT product_id FROM reviews WHERE user_id = $1
            )
            GROUP BY p.id
            ORDER BY COALESCE(AVG(r.rating), 0) DESC, p.id ASC
            LIMIT $2
        """
        rows = await self.pool.fetch(query, user_id, limit)
        return [
            RecommendationItem(
                product_id=row["product_id"],
                score=float(row["score"]),
                reason="Popular product",
            )
            for row in rows
        ]

    async def get_similar_products(
        self, product_id: int, limit: int = 5
    ) -> SimilarProductsResponse:
        if not self.pool:
            await self.initialize()

        query = """
            WITH target AS (
                SELECT category FROM products WHERE id = $1
            ),
            product_reviewers AS (
                SELECT user_id FROM reviews WHERE product_id = $1 AND rating >= 3
            ),
            similar AS (
                SELECT r.product_id,
                       COUNT(DISTINCT r.user_id)::float / GREATEST(
                           (SELECT COUNT(*) FROM product_reviewers), 1
                       ) as similarity_score,
                       (p.category = (SELECT category FROM target)) as shared_category
                FROM reviews r
                INNER JOIN products p ON r.product_id = p.id
                WHERE r.user_id IN (SELECT user_id FROM product_reviewers)
                  AND r.product_id != $1
                  AND r.rating >= 3
                GROUP BY r.product_id, p.category
                UNION ALL
                SELECT p.id as product_id,
                       0.3 as similarity_score,
                       true as shared_category
                FROM products p
                WHERE p.category = (SELECT category FROM target)
                  AND p.id != $1
                  AND p.id NOT IN (
                      SELECT DISTINCT r2.product_id FROM reviews r2
                      WHERE r2.user_id IN (SELECT user_id FROM product_reviewers)
                        AND r2.product_id != $1
                  )
            )
            SELECT product_id,
                   MAX(similarity_score) as similarity_score,
                   bool_or(shared_category) as shared_category
            FROM similar
            GROUP BY product_id
            ORDER BY similarity_score DESC
            LIMIT $2
        """
        rows = await self.pool.fetch(query, product_id, limit)
        return SimilarProductsResponse(
            product_id=product_id,
            similar_products=[
                SimilarProductItem(
                    product_id=row["product_id"],
                    similarity_score=min(float(row["similarity_score"]), 1.0),
                    shared_category=row["shared_category"],
                )
                for row in rows
            ],
        )


# Singleton instance
engine = RecommendationEngine()

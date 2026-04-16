import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from src.models.recommendation import (
    RecommendationItem,
    RecommendationResponse,
    SimilarProductItem,
    SimilarProductsResponse,
)
from src.recommendations.engine import RecommendationEngine


class TestRecommendationModels:
    """Test Pydantic models for recommendations."""

    def test_recommendation_item_valid(self):
        item = RecommendationItem(
            product_id=1,
            score=0.85,
            reason="Liked by similar users",
        )
        assert item.product_id == 1
        assert item.score == 0.85

    def test_recommendation_item_score_bounds(self):
        with pytest.raises(Exception):
            RecommendationItem(product_id=1, score=1.5, reason="Invalid")

        with pytest.raises(Exception):
            RecommendationItem(product_id=1, score=-0.1, reason="Invalid")

    def test_recommendation_response(self):
        response = RecommendationResponse(
            user_id=1,
            recommendations=[
                RecommendationItem(product_id=1, score=0.9, reason="Test"),
                RecommendationItem(product_id=2, score=0.8, reason="Test"),
            ],
            strategy="collaborative_filtering",
        )
        assert response.user_id == 1
        assert len(response.recommendations) == 2
        assert response.strategy == "collaborative_filtering"

    def test_similar_product_item(self):
        item = SimilarProductItem(
            product_id=5,
            similarity_score=0.75,
            shared_category=True,
        )
        assert item.product_id == 5
        assert item.shared_category is True

    def test_similar_products_response(self):
        response = SimilarProductsResponse(
            product_id=1,
            similar_products=[
                SimilarProductItem(product_id=2, similarity_score=0.9, shared_category=True),
            ],
        )
        assert response.product_id == 1
        assert len(response.similar_products) == 1


class TestRecommendationEngine:
    """Test the recommendation engine logic."""

    def test_engine_initialization(self):
        engine = RecommendationEngine()
        assert engine.pool is None

    @pytest.mark.asyncio
    async def test_get_user_recommendations_collaborative(self):
        engine = RecommendationEngine()
        mock_pool = AsyncMock()
        engine.pool = mock_pool

        mock_rows = [
            {"product_id": 10, "score": 0.9},
            {"product_id": 20, "score": 0.8},
        ]
        mock_pool.fetch = AsyncMock(return_value=mock_rows)

        result = await engine.get_user_recommendations(user_id=1, limit=2)

        assert result.user_id == 1
        assert len(result.recommendations) == 2
        assert result.strategy == "collaborative_filtering"

    @pytest.mark.asyncio
    async def test_get_user_recommendations_fallback(self):
        engine = RecommendationEngine()
        mock_pool = AsyncMock()
        engine.pool = mock_pool

        # First call (collaborative) returns empty, second (popular) returns results
        mock_pool.fetch = AsyncMock(
            side_effect=[
                [],  # collaborative filtering - no results
                [{"product_id": 5, "score": 0.7}],  # popular products
            ]
        )

        result = await engine.get_user_recommendations(user_id=99, limit=5)

        assert result.user_id == 99
        assert len(result.recommendations) == 1
        assert result.strategy == "popular_products"

    @pytest.mark.asyncio
    async def test_get_similar_products(self):
        engine = RecommendationEngine()
        mock_pool = AsyncMock()
        engine.pool = mock_pool

        mock_rows = [
            {"product_id": 2, "similarity_score": 0.85, "shared_category": True},
            {"product_id": 3, "similarity_score": 0.6, "shared_category": False},
        ]
        mock_pool.fetch = AsyncMock(return_value=mock_rows)

        result = await engine.get_similar_products(product_id=1, limit=5)

        assert result.product_id == 1
        assert len(result.similar_products) == 2
        assert result.similar_products[0].similarity_score == 0.85


class TestRecommendationEndpoints:
    """Test FastAPI endpoints for recommendations."""

    def test_health_endpoint(self):
        from fastapi.testclient import TestClient
        from src.main import app

        client = TestClient(app, raise_server_exceptions=False)
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"

    def test_root_endpoint(self):
        from fastapi.testclient import TestClient
        from src.main import app

        client = TestClient(app, raise_server_exceptions=False)
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert "endpoints" in data

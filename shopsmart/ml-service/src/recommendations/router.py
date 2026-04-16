from fastapi import APIRouter, Query
from .engine import engine

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


@router.get("/user/{user_id}")
async def get_user_recommendations(
    user_id: int,
    limit: int = Query(default=10, ge=1, le=50),
):
    """Get personalized product recommendations for a user."""
    return await engine.get_user_recommendations(user_id, limit)


@router.get("/product/{product_id}/similar")
async def get_similar_products(
    product_id: int,
    limit: int = Query(default=5, ge=1, le=20),
):
    """Get products similar to the given product."""
    return await engine.get_similar_products(product_id, limit)

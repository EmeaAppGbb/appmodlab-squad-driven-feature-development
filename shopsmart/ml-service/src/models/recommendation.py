from pydantic import BaseModel, Field
from typing import List, Optional


class RecommendationItem(BaseModel):
    product_id: int
    score: float = Field(ge=0, le=1)
    reason: str


class RecommendationResponse(BaseModel):
    user_id: int
    recommendations: List[RecommendationItem]
    strategy: str


class SimilarProductItem(BaseModel):
    product_id: int
    similarity_score: float = Field(ge=0, le=1)
    shared_category: bool


class SimilarProductsResponse(BaseModel):
    product_id: int
    similar_products: List[SimilarProductItem]

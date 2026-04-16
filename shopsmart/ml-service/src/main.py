from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .recommendations.router import router as recommendations_router
from .recommendations.engine import engine

app = FastAPI(
    title="ShopSmart ML Service",
    description="Machine learning recommendation engine for ShopSmart e-commerce platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommendations_router)


@app.on_event("startup")
async def startup_event():
    await engine.initialize()


@app.on_event("shutdown")
async def shutdown_event():
    await engine.close()


@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "ShopSmart ML Service",
        "version": "1.0.0",
    }


@app.get("/")
async def root():
    return {
        "message": "ShopSmart ML Service",
        "endpoints": {
            "health": "/health",
            "user_recommendations": "/recommendations/user/{user_id}",
            "similar_products": "/recommendations/product/{product_id}/similar",
        },
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "src.main:app",
        host="0.0.0.0",
        port=settings.port,
        reload=settings.debug,
    )

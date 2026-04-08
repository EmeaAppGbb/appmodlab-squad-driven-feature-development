from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings

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
        "message": "ShopSmart ML Service - Recommendations endpoint will be built by SQUAD",
        "endpoints": {
            "health": "/health",
            "recommendations": "/recommendations (to be implemented)",
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

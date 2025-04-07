from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.snapshot import router as snapshot_router
from app.routes.tax import router as tax_router

app = FastAPI(title="Financial Snapshot API")

# Update origins for production
origins = [
    "https://finsnap.ca",  # Production frontend domain
    "http://localhost:5173",  # For development testing
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,         # Allow specified origins.
    allow_credentials=True,
    allow_methods=["*"],           # Allow all HTTP methods.
    allow_headers=["*"],
)

app.include_router(snapshot_router, prefix="/api")
app.include_router(tax_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

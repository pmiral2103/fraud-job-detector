import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import analyzer

# Initialize FastAPI application
app = FastAPI(
    title="Fraud Job Detector AI API",
    description="A simple, hackathon-friendly backend to analyze job descriptions and detect potential scams.",
    version="1.0.0"
)

# Enable CORS (Cross-Origin Resource Sharing)
# This allows the React frontend to communicate with the FastAPI backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, change to specific origins (e.g., ["http://localhost:5173"]) in production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include analysis routes
app.include_router(analyzer.router)

@app.get("/", tags=["General"])
async def root():
    """
    Root endpoint serving basic API status and metadata.
    """
    return {
        "status": "healthy",
        "app_name": "Fraud Job Detector AI Backend",
        "version": "1.0.0",
        "docs_url": "/docs"
    }

@app.get("/health", tags=["General"])
async def health():
    """
    Health check endpoint for monitoring.
    """
    return {"status": "ok"}

if __name__ == "__main__":
    # Allows starting the API directly using: python app.py
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)

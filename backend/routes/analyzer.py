from fastapi import APIRouter, Depends, HTTPException
from schemas.analysis import JobAnalysisRequest, JobAnalysisResponse
from services.analyzer_service import JobAnalyzerService

router = APIRouter(tags=["Fraud Analysis"])

# Dependency injection for JobAnalyzerService allows easy mocking in tests
# or swapping implementation (e.g. Heuristic vs ML engine)
def get_analyzer_service() -> JobAnalyzerService:
    return JobAnalyzerService()

@router.post("/analyze", response_model=JobAnalysisResponse)
async def analyze_job(
    request: JobAnalysisRequest,
    service: JobAnalyzerService = Depends(get_analyzer_service)
):
    """
    Analyzes a job posting's text to determine if it is Genuine, Suspicious, or Fraudulent.
    Returns a details report including fraud score, risk classification, and detected indicators.
    """
    try:
        return service.analyze_job(request.job_text)
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"An error occurred during analysis: {str(e)}"
        )

from pydantic import BaseModel, Field
from typing import List

class JobAnalysisRequest(BaseModel):
    job_text: str = Field(
        ..., 
        description="The full text content of the job posting to analyze.",
        min_length=10,
        examples=["Earn $5000/week working from home. No interview required, just pay a $50 registration fee to start today! Contact us at scammer@gmail.com."]
    )

class JobAnalysisResponse(BaseModel):
    fraud_score: int = Field(
        ..., 
        description="Fraud probability score from 0 (Genuine) to 100 (Highly Fraudulent).",
        ge=0,
        le=100
    )
    risk_level: str = Field(
        ..., 
        description="Risk level classification: Low, Medium, or High.",
        examples=["High"]
    )
    result: str = Field(
        ..., 
        description="Overall verdict: Genuine, Suspicious, or Fraudulent.",
        examples=["Fraudulent"]
    )
    reasons: List[str] = Field(
        ..., 
        description="List of detected red flags or reasons for the classification.",
        examples=["Registration fee detected", "Suspicious email domain", "Unrealistic salary"]
    )
    recommendation: str = Field(
        ..., 
        description="Actionable advice for the job seeker.",
        examples=["Avoid Applying"]
    )

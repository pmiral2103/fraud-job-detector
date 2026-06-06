from abc import ABC, abstractmethod
from typing import Dict, List, Tuple
from schemas.analysis import JobAnalysisResponse
from utils.detectors import run_all_detectors

class BaseJobAnalyzer(ABC):
    """
    Abstract base class for job analysis engines.
    This interface allows future ML-based engines (TF-IDF, XGBoost, BERT, etc.)
    to be integrated seamlessly without major refactoring.
    """
    @abstractmethod
    def analyze(self, job_text: str) -> JobAnalysisResponse:
        """
        Analyzes the job posting text and returns a validated JobAnalysisResponse.
        """
        pass


class HeuristicJobAnalyzer(BaseJobAnalyzer):
    """
    Heuristic and RegEx rule-based analysis engine.
    Scans job text for 10 common scam indicators and calculates a weighted score.
    """
    # Mapping of detectors to their respective score weights (total weights sum to 180, capped at 100)
    DETECTOR_WEIGHTS = {
        "registration_fee": 25,
        "training_fee": 25,
        "security_deposit": 25,
        "easy_money": 20,
        "wfh_scam": 15,
        "no_interview": 15,
        "immediate_joining": 10,
        "unrealistic_salary": 20,
        "suspicious_email": 15,
        "missing_company_info": 10,
    }

    def analyze(self, job_text: str) -> JobAnalysisResponse:
        detector_results = run_all_detectors(job_text)
        
        reasons: List[str] = []
        raw_score = 0
        
        # Aggregate scores and reasons
        for detector_name, (is_detected, detector_reasons) in detector_results.items():
            if is_detected:
                reasons.extend(detector_reasons)
                raw_score += self.DETECTOR_WEIGHTS.get(detector_name, 0)
                
        # Cap score at 100
        fraud_score = min(raw_score, 100)
        
        # Risk level and result classification based on requirements:
        # 0-30 = Genuine, 31-60 = Suspicious, 61-100 = Fraudulent
        if fraud_score <= 30:
            risk_level = "Low"
            result = "Genuine"
            recommendation = (
                "This job posting appears to be legitimate. You can safely proceed with "
                "your application, but always do your own research before sharing personal info."
            )
        elif fraud_score <= 60:
            risk_level = "Medium"
            result = "Suspicious"
            recommendation = (
                "Exercise caution. Verify the company identity, avoid paying any fees, "
                "and verify if the recruiter uses an official company email address before proceeding."
            )
        else:
            risk_level = "High"
            result = "Fraudulent"
            recommendation = (
                "Avoid applying. This posting shows strong indicators of common employment scams. "
                "Do NOT pay any money, purchase equipment, or share sensitive personal information."
            )
            
        # If no reasons were detected but score is low, add a default message
        if not reasons:
            reasons.append("No common job scam indicators or red flags were detected in the description.")
            
        return JobAnalysisResponse(
            fraud_score=fraud_score,
            risk_level=risk_level,
            result=result,
            reasons=reasons,
            recommendation=recommendation
        )


class JobAnalyzerService:
    """
    Service layer coordinating job analysis. 
    Can be initialized with different engine implementations (e.g., Heuristic, ML).
    """
    def __init__(self, engine: BaseJobAnalyzer = None):
        # Default to the heuristic engine
        self.engine = engine or HeuristicJobAnalyzer()

    def analyze_job(self, job_text: str) -> JobAnalysisResponse:
        """
        Coordinates the analysis of a job text through the active engine.
        """
        return self.engine.analyze(job_text)

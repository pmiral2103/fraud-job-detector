import os
import sys
from typing import Dict, Any

# Ensure backend directory is in the import path
sys.path.append(os.path.dirname(__file__))

# Try to import TestClient. If not installed, we'll explain how to run tests
try:
    from fastapi.testclient import TestClient
    from app import app
except ImportError:
    print("Error: Could not import fastapi.testclient. Please install dependencies in backend/requirements.txt:")
    print("pip install -r backend/requirements.txt")
    sys.exit(1)

client = TestClient(app)

# ----------------------------------------------------------------------
# Mock Job Postings for Test Cases
# ----------------------------------------------------------------------

GENUINE_JOB = """
Software Engineer (Full-Time)
Company: InnovateTech Solutions Inc.
Location: New York, NY (Hybrid)

About InnovateTech:
InnovateTech Solutions is a leading provider of enterprise software. We value collaboration, diversity, and innovation.

Role Description:
We are seeking a Software Engineer to join our core product team. You will design, build, and maintain robust API services using Python and FastAPI, write automated unit tests, and collaborate with cross-functional product teams.

Requirements:
- Bachelor's degree in Computer Science or equivalent experience.
- 2+ years of experience with Python/FastAPI/Django.
- Strong knowledge of SQL databases and REST APIs.

Benefits:
- Competitive salary and health insurance.
- 401(k) matching.
- Professional development budget.

Interested candidates can apply via our portal or contact recruiters at careers@innovatetech.com.
"""

SUSPICIOUS_JOB = """
Data Entry Specialist - Work from Home
Company: Global Reach Recruiters

We are hiring entry level candidates for a Remote Data Entry Specialist position.
This is a great work from home job that anyone can apply for. No prior experience or resume needed!
Earn up to $45/hour doing simple typing and data management from the comfort of your home.
Immediate start today! Join immediately to secure your spot.

Requirements:
- Must have a computer and internet.
- Willing to work flexible hours.

Contact us via email at datajob87@gmail.com to apply.
"""

FRAUDULENT_JOB = """
Administrative Assistant (Direct Hiring)
Company: Confidential Client

URGENT WORK FROM HOME OPPORTUNITY.
No interview required! Skip the evaluation and start tonight.
We are offering a guaranteed income of $2500 per week.

IMPORTANT: To begin working and receive your company-provided laptop, you must pay a refundable security deposit of $150 for equipment insurance and processing fees. You will also need to complete a paid training package for $50 before starting.

Apply now by sending your contact details to recruitment-desk@outlook.com.
"""

# ----------------------------------------------------------------------
# Test Execution
# ----------------------------------------------------------------------

def run_test_case(name: str, job_text: str, expected_result: str):
    print("=" * 60)
    print(f"Running Test Case: {name}")
    print("=" * 60)
    
    response = client.post("/analyze", json={"job_text": job_text})
    
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    
    data = response.json()
    print(f"Fraud Score  : {data['fraud_score']}/100")
    print(f"Risk Level   : {data['risk_level']}")
    print(f"Verdict      : {data['result']}")
    print("Reasons Detected:")
    for idx, reason in enumerate(data['reasons'], 1):
        print(f"  {idx}. {reason}")
    print(f"Recommendation: {data['recommendation']}")
    print()
    
    # Assert result matches expectation
    assert data['result'] == expected_result, f"Expected {expected_result}, got {data['result']}"
    print(f"[OK] Test Case '{name}' PASSED.")
    print("\n")

def main():
    print("Starting Fraud Job Detector API Heuristic Engine Tests...\n")
    
    try:
        # Test 1: Genuine Job (Low Score, Genuine classification)
        run_test_case("Legitimate Job Posting", GENUINE_JOB, "Genuine")
        
        # Test 2: Suspicious Job (Medium Score, Suspicious classification)
        run_test_case("Suspicious Job Posting (WFH + Gmail + High Pay)", SUSPICIOUS_JOB, "Suspicious")
        
        # Test 3: Fraudulent Job (High Score, Fraudulent classification)
        run_test_case("Scam Job Posting (Fees + Security Deposit + Direct Hiring)", FRAUDULENT_JOB, "Fraudulent")
        
        print("All test cases completed successfully! The backend is functioning perfectly.")
        
    except AssertionError as e:
        print(f"[FAIL] Test Failed: {str(e)}")
        sys.exit(1)
    except Exception as e:
        print(f"[ERROR] Unexpected error occurred during tests: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()

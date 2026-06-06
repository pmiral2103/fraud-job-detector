# Fraud Job Detector AI - Backend API

This is a production-ready, simple, and modular FastAPI backend for **Fraud Job Detector AI**. 

It uses a customizable heuristic-based rule engine to scan job postings for 10 common employment scam indicators, calculates an overall fraud score (0-100), and classifies the listing as **Genuine**, **Suspicious**, or **Fraudulent**.

---

## Folder Structure

```text
backend/
├── app.py                     # FastAPI Application Config & CORS
├── routes/
│   ├── __init__.py
│   └── analyzer.py            # POST /analyze Endpoint
├── services/
│   ├── __init__.py
│   └── analyzer_service.py    # Scoring & Classification Logic (ML-Ready)
├── schemas/
│   ├── __init__.py
│   └── analysis.py            # Pydantic Schemas (Request/Response validation)
├── utils/
│   ├── __init__.py
│   └── detectors.py           # Regex & Heuristics for the 10 Fraud checks
└── requirements.txt           # Python dependencies
test_backend.py                # Automated Test Suite using FastAPI TestClient
```

---

## Quick Start (Local Setup)

### 1. Prerequisites
Make sure you have **Python 3.8+** installed.

### 2. Install Dependencies
Open a terminal in the root directory (`fraud_job_detector_backend`) and run:
```bash
pip install -r backend/requirements.txt
```

### 3. Run the Backend Server
Start the development server using:
```bash
python backend/app.py
```
*Alternatively, you can run:*
```bash
uvicorn backend.app:app --host 127.0.0.1 --port 8000 --reload
```
The server will start at **`http://127.0.0.1:8000`**.
- Interactive API Docs (Swagger UI): `http://127.0.0.1:8000/docs`
- Health check endpoint: `http://127.0.0.1:8000/health`

### 4. Run Automated Tests
In a separate terminal, run:
```bash
python test_backend.py
```
This runs automated tests on Mock job listings (Genuine, Suspicious, Fraudulent) and validates responses against the required schemas.

---

## API Documentation

### POST `/analyze`
Analyzes a job description text.

* **URL:** `/analyze`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Request Body:**
```json
{
  "job_text": "Insert full job description text here..."
}
```

* **Response (Success - 200 OK):**
```json
{
  "fraud_score": 85,
  "risk_level": "High",
  "result": "Fraudulent",
  "reasons": [
    "Request for upfront application, processing, or registration fee.",
    "Demand for training fees or purchasing mandatory certification/training materials.",
    "Job offer guaranteed without a standard interview or evaluation process."
  ],
  "recommendation": "Avoid applying. This posting shows strong indicators of common employment scams. Do NOT pay any money, purchase equipment, or share sensitive personal information."
}
```

---

## How to Connect Your React Frontend

The FastAPI backend has CORS enabled and allows requests from any origin (`*`). Follow the examples below to hook up your React Analyze button.

### Option A: Using standard `fetch` API

Here is a standard React component handler snippet for the Analyze button:

```javascript
import React, { useState } from 'react';

function JobAnalyzer() {
  const [jobText, setJobText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!jobText.trim() || jobText.length < 10) {
      setError('Please enter a longer job description (minimum 10 characters).');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_text: jobText }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to analyze job.');
      }

      const data = await response.json();
      setResult(data); // Stores { fraud_score, risk_level, result, reasons, recommendation }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyzer-container">
      <textarea
        placeholder="Paste job description here..."
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
        rows={10}
      />
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Job'}
      </button>

      {error && <div className="error-message">{error}</div>}

      {result && (
        <div className={`result-card result-${result.result.toLowerCase()}`}>
          <h3>Result: {result.result}</h3>
          <p><strong>Risk Level:</strong> {result.risk_level} ({result.fraud_score}/100)</p>
          <p><strong>Recommendation:</strong> {result.recommendation}</p>
          <div>
            <strong>Flags Detected:</strong>
            <ul>
              {result.reasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobAnalyzer;
```

### Option B: Using `axios`

If you are using Axios in your React application:

```javascript
import axios from 'axios';

// Add this function to your API client or component handler
const analyzeJobText = async (text) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/analyze', {
      job_text: text
    });
    return response.data;
  } catch (error) {
    console.error('Error during analysis:', error.response?.data?.detail || error.message);
    throw error;
  }
};
```

---

## Future ML Model Integration

The code is structured around the **Dependency Inversion Principle** using a base class interface:

1. **`BaseJobAnalyzer` (in `backend/services/analyzer_service.py`)** acts as the base contract.
2. **`HeuristicJobAnalyzer`** implements this contract using RegEx rules.
3. If you decide to add an ML engine (e.g. TF-IDF + XGBoost, or BERT embeddings), you can simply:
   * Create `MLJobAnalyzer(BaseJobAnalyzer)` class.
   * Load your trained model in its constructor.
   * Implement the `analyze(self, job_text: str)` method returning the `JobAnalysisResponse` schema.
   * Inject it in `JobAnalyzerService(engine=MLJobAnalyzer())` in `backend/routes/analyzer.py`. No other routers, schemas, or controllers will need to change.

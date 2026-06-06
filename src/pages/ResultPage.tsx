import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  XCircle,
  AlertOctagon,
} from 'lucide-react';

type ResultStatus = 'genuine' | 'suspicious' | 'fraudulent';

interface AnalysisResult {
  fraudScore: number;
  status: ResultStatus;
  riskLevel: string;
  reasons: string[];
  jobTitle: string;
  companyName: string;
}

export function ResultPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    // Get the job data from sessionStorage
    const jobDataStr = sessionStorage.getItem('jobData');
    if (!jobDataStr) return;

    const jobData = JSON.parse(jobDataStr);

    // Simulate AI analysis result based on input
    const analysisResult = analyzeJob(jobData);
    setResult(analysisResult);
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-500">Processing analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-neutral-900">JobShield</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Back Link */}
        <Link
          to="/analyze"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Analyze Another Job
        </Link>

        {/* Result Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          {/* Header Section */}
          <div
            className={`px-8 py-6 ${
              result.status === 'genuine'
                ? 'bg-green-50 border-b border-green-100'
                : result.status === 'suspicious'
                ? 'bg-amber-50 border-b border-amber-100'
                : 'bg-red-50 border-b border-red-100'
            }`}
          >
            <div className="flex items-start gap-4">
              {result.status === 'genuine' ? (
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              ) : result.status === 'suspicious' ? (
                <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0" />
              ) : (
                <AlertOctagon className="w-8 h-8 text-red-600 flex-shrink-0" />
              )}
              <div>
                <h1
                  className={`text-2xl font-bold ${
                    result.status === 'genuine'
                      ? 'text-green-900'
                      : result.status === 'suspicious'
                      ? 'text-amber-900'
                      : 'text-red-900'
                  }`}
                >
                  {result.status === 'genuine' && 'This Job Appears Genuine'}
                  {result.status === 'suspicious' && 'This Job is Suspicious'}
                  {result.status === 'fraudulent' && 'This Job is Fraudulent'}
                </h1>
                <p
                  className={`mt-1 ${
                    result.status === 'genuine'
                      ? 'text-green-700'
                      : result.status === 'suspicious'
                      ? 'text-amber-700'
                      : 'text-red-700'
                  }`}
                >
                  {result.jobTitle} at {result.companyName}
                </p>
              </div>
            </div>
          </div>

          {/* Score Section */}
          <div className="px-8 py-8 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
                  Fraud Score
                </p>
                <p className="text-5xl font-bold text-neutral-900 mt-2">
                  {result.fraudScore}%
                </p>
              </div>
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={
                      result.fraudScore < 30
                        ? '#16a34a'
                        : result.fraudScore < 60
                        ? '#ea580c'
                        : '#dc2626'
                    }
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${result.fraudScore * 2.83} ${283 - result.fraudScore * 2.83}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium text-neutral-500">Risk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status and Risk Level */}
          <div className="px-8 py-6 grid grid-cols-2 gap-6 border-b border-neutral-200 bg-neutral-50">
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">Result</p>
              <div className="flex items-center gap-2">
                {result.status === 'genuine' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : result.status === 'suspicious' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span
                  className={`font-semibold ${
                    result.status === 'genuine'
                      ? 'text-green-700'
                      : result.status === 'suspicious'
                      ? 'text-amber-700'
                      : 'text-red-700'
                  }`}
                >
                  {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">Risk Level</p>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  result.fraudScore < 30
                    ? 'bg-green-100 text-green-700'
                    : result.fraudScore < 60
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {result.riskLevel}
              </span>
            </div>
          </div>

          {/* Reasons Section */}
          <div className="px-8 py-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              {result.status === 'genuine' ? 'Verification Points' : 'Red Flags Detected'}
            </h2>
            <ul className="space-y-3">
              {result.reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-3">
                  {result.status === 'genuine' ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : result.status === 'suspicious' ? (
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <span className="text-neutral-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="px-8 py-6 bg-neutral-50 border-t border-neutral-200 flex gap-4">
            <Link to="/analyze" className="flex-1">
              <button className="btn-secondary w-full">Analyze Another Job</button>
            </Link>
            <Link to="/" className="flex-1">
              <button className="btn-primary w-full">Back to Home</button>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-sm text-neutral-500 mt-6">
          This analysis is based on AI pattern detection and should be used as guidance only.
          Always verify job opportunities through official channels.
        </p>
      </main>
    </div>
  );
}

// Simulated AI analysis function
function analyzeJob(jobData: {
  jobTitle: string;
  companyName: string;
  recruiterEmail: string;
  salary: string;
  jobDescription: string;
}): AnalysisResult {
  let score = 0;
  const reasons: string[] = [];

  const emailDomain = jobData.recruiterEmail.split('@')[1]?.toLowerCase() || '';
  const isPersonalEmail =
    emailDomain.includes('gmail') ||
    emailDomain.includes('yahoo') ||
    emailDomain.includes('hotmail') ||
    emailDomain.includes('outlook');

  const description = jobData.jobDescription.toLowerCase();
  const salary = jobData.salary.toLowerCase();

  // Check for registration fee
  if (
    description.includes('registration fee') ||
    description.includes('processing fee') ||
    description.includes('training fee') ||
    description.includes('upfront') ||
    description.includes('advance payment')
  ) {
    score += 25;
    reasons.push('Registration or processing fee requested');
  }

  // Check for unrealistic salary
  if (salary) {
    const salaryNum = parseInt(salary.replace(/[^0-9]/g, ''));
    if (salaryNum > 150000 && !description.includes('senior') && !description.includes('director')) {
      score += 20;
      reasons.push('Unrealistic salary for the position level');
    }
  }

  // Check email domain
  if (isPersonalEmail) {
    score += 15;
    reasons.push('Personal email address used instead of company domain');
  }

  // Check for suspicious patterns in description
  if (
    description.includes('work from home') &&
    description.includes('no experience')
  ) {
    score += 15;
    reasons.push('Work from home with no experience required - common scam pattern');
  }

  if (
    description.includes('urgent') ||
    description.includes('immediate start') ||
    description.includes('act now')
  ) {
    score += 10;
    reasons.push('Urgency tactics to pressure quick decisions');
  }

  if (
    description.includes('guaranteed income') ||
    description.includes('guaranteed salary')
  ) {
    score += 15;
    reasons.push('Guaranteed income promises - unrealistic job offer');
  }

  // Check for missing company info
  if (!jobData.companyName || jobData.companyName.length < 3) {
    score += 10;
    reasons.push('Incomplete or missing company information');
  }

  // Check for money transfer / check cashing
  if (
    description.includes('check') ||
    description.includes('wire transfer') ||
    description.includes('money transfer') ||
    description.includes('western union')
  ) {
    score += 30;
    reasons.push('Mentions of check processing or wire transfers - major red flag');
  }

  // Check for personal info requests
  if (
    description.includes('ssn') ||
    description.includes('social security') ||
    description.includes('bank account') ||
    description.includes('credit card')
  ) {
    score += 25;
    reasons.push('Requests for sensitive personal or financial information');
  }

  // Calculate final score (cap at 100)
  const fraudScore = Math.min(100, score);

  // Determine status
  let status: ResultStatus;
  let riskLevel: string;

  if (fraudScore < 30) {
    status = 'genuine';
    riskLevel = 'Low';
    if (reasons.length === 0) {
      reasons.push('Company information appears legitimate');
      reasons.push('Salary range is realistic for the position');
      reasons.push('Professional communication channels used');
      reasons.push('No suspicious keywords detected');
    }
  } else if (fraudScore < 60) {
    status = 'suspicious';
    riskLevel = 'Medium';
  } else {
    status = 'fraudulent';
    riskLevel = 'High';
  }

  return {
    fraudScore,
    status,
    riskLevel,
    reasons,
    jobTitle: jobData.jobTitle,
    companyName: jobData.companyName,
  };
}

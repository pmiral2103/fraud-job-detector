import { useState } from 'react';
import { Shield, Send, Loader2, AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

type ResultStatus = 'genuine' | 'suspicious' | 'fraudulent';
type RiskLevel = 'Low' | 'Medium' | 'High';

interface AnalysisResult {
  fraudScore: number;
  status: ResultStatus;
  riskLevel: RiskLevel;
  reasons: string[];
  recommendation: string;
  detailedRecommendation: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

function App() {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;

    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_text: input }),
      });

      if (!response.ok) {
        let errMsg = 'Failed to analyze the job posting.';
        try {
          const errData = await response.json();
          if (errData && errData.detail) {
            errMsg = typeof errData.detail === 'string' ? errData.detail : JSON.stringify(errData.detail);
          }
        } catch {
          // Fallback if response isn't JSON
        }
        throw new Error(errMsg);
      }

      const data = await response.json();
      
      // Map backend response fields to the frontend AnalysisResult interface
      const statusMap: Record<string, ResultStatus> = {
        'Genuine': 'genuine',
        'Suspicious': 'suspicious',
        'Fraudulent': 'fraudulent'
      };

      const recommendationMap: Record<string, string> = {
        'Genuine': 'Safe to Apply',
        'Suspicious': 'Review Carefully',
        'Fraudulent': 'Do Not Apply'
      };

      setResult({
        fraudScore: data.fraud_score,
        status: statusMap[data.result] || 'genuine',
        riskLevel: data.risk_level as RiskLevel,
        reasons: data.reasons,
        recommendation: recommendationMap[data.result] || 'Safe to Apply',
        detailedRecommendation: data.recommendation
      });
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please ensure the backend is running and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setInput('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <span className="font-semibold text-neutral-900">Fraud Job Detector AI</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8 flex flex-col">
        {!result ? (
          <>
            {/* Welcome Message */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
                Paste a job posting to analyze
              </h1>
              <p className="text-neutral-500">
                I'll check for signs of fraud and tell you if it's safe to apply.
              </p>
            </div>

            {/* Input Area */}
            <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
              <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-4">
                <textarea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Paste the job description, advertisement, or job posting here..."
                  className="w-full bg-transparent resize-none text-neutral-800 placeholder:text-neutral-400 focus:outline-none min-h-[200px] text-base leading-relaxed"
                  disabled={isAnalyzing}
                />
                
                {error && (
                  <div className="flex items-start gap-2.5 p-3.5 mt-2 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold">Analysis Error</p>
                      <p className="text-red-700/90 mt-0.5">{error}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-neutral-200 mt-4">
                  <p className="text-xs text-neutral-400">
                    Include job title, company, salary, and contact info
                  </p>
                  <button
                    onClick={handleAnalyze}
                    disabled={!input.trim() || isAnalyzing}
                    className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Analyze
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Input Summary */}
            <div className="mb-6">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-4"
              >
                <RefreshCw className="w-4 h-4" />
                Analyze another job
              </button>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                <p className="text-sm text-neutral-500 mb-1">Analyzed job posting:</p>
                <p className="text-sm text-neutral-700 line-clamp-2">{input}</p>
              </div>
            </div>

            {/* Result Card */}
            <ResultCard result={result} />
          </>
        )}
      </main>
    </div>
  );
}

function ResultCard({ result }: { result: AnalysisResult }) {
  const statusConfig = {
    genuine: {
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      progressColor: '#16a34a',
    },
    suspicious: {
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-700',
      progressColor: '#d97706',
    },
    fraudulent: {
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      progressColor: '#dc2626',
    },
  };

  const config = statusConfig[result.status];
  const StatusIcon = config.icon;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      {/* Header with Status */}
      <div className={`${config.bgColor} px-6 py-5 border-b ${config.borderColor}`}>
        <div className="flex items-center gap-3">
          <StatusIcon className={`w-7 h-7 ${config.color}`} />
          <div>
            <h2 className={`text-lg font-semibold ${config.textColor} capitalize`}>
              {result.status}
            </h2>
            <p className="text-sm text-neutral-500">Based on AI analysis</p>
          </div>
        </div>
      </div>

      {/* Fraud Score Section */}
      <div className="p-8 border-b border-neutral-100">
        <div className="flex items-center justify-center gap-10">
          <CircularProgress value={result.fraudScore} color={config.progressColor} />
          <div className="space-y-3">
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Fraud Score</p>
              <p className="text-3xl font-bold text-neutral-900">{result.fraudScore}%</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Risk Level</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                result.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
                result.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {result.riskLevel} Risk
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reasons Detected */}
      <div className="px-6 py-5 border-b border-neutral-100">
        <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">
          {result.status === 'genuine' ? 'Verification Points' : 'Issues Detected'}
        </h3>
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

      {/* Recommendation */}
      <div className="px-6 py-5 bg-neutral-50">
        <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
          Recommendation
        </h3>
        <p className={`text-xl font-semibold ${
          result.recommendation === 'Safe to Apply' ? 'text-green-700' :
          result.recommendation === 'Review Carefully' ? 'text-amber-700' :
          'text-red-700'
        }`}>
          {result.recommendation}
        </p>
        <p className="text-sm text-neutral-500 mt-2">
          {result.detailedRecommendation}
        </p>
      </div>
    </div>
  );
}

function CircularProgress({ value, color }: { value: number; color: string }) {
  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="#f3f4f6"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${value * 2.65} ${265 - value * 2.65}`}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-neutral-900">{value}%</span>
      </div>
    </div>
  );
}

export default App;

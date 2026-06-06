import { Link, useParams } from 'react-router-dom';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Mail,
  Building2,
  MapPin,
  DollarSign,
  ArrowLeft,
  Download,
  Share2,
  AlertOctagon,
} from 'lucide-react';
import { Button, Card, Badge, CircularProgress } from '../components/common';
import { mockRecentAnalyses } from '../data/mockData';
import { cn, getTrustScoreColor } from '../utils/helpers';
import type { RiskLevel } from '../types';

export function AnalysisResultPage() {
  useParams();

  // For demo, get the first analysis
  const analysis = mockRecentAnalyses[0];

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-neutral-500">Analysis not found</p>
      </div>
    );
  }

  const riskLevelConfig: Record<RiskLevel, { label: string; description: string; color: string }> = {
    low: {
      label: 'Low Risk',
      description: 'This job posting appears legitimate with minimal red flags.',
      color: 'success',
    },
    medium: {
      label: 'Medium Risk',
      description: 'Some concerning indicators detected. Proceed with caution.',
      color: 'warning',
    },
    high: {
      label: 'High Risk',
      description: 'Multiple red flags detected. We do not recommend proceeding.',
      color: 'danger',
    },
    critical: {
      label: 'Critical Risk',
      description: 'Strong indicators of fraud. Do not proceed or share personal information.',
      color: 'danger',
    },
  };

  const levelInfo = riskLevelConfig[analysis.riskLevel];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<Share2 className="w-4 h-4" />}>
            Share
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
            Export PDF
          </Button>
        </div>
      </div>

      {/* Risk Summary Card */}
      <Card className={cn('overflow-hidden', analysis.riskLevel === 'critical' && 'border-danger-300')}>
        <div
          className={cn(
            'px-6 py-4',
            analysis.riskLevel === 'low' && 'bg-success-50 border-b border-success-100',
            analysis.riskLevel === 'medium' && 'bg-warning-50 border-b border-warning-100',
            (analysis.riskLevel === 'high' || analysis.riskLevel === 'critical') && 'bg-danger-50 border-b border-danger-100'
          )}
        >
          <div className="flex items-start gap-4">
            {analysis.riskLevel === 'low' ? (
              <CheckCircle className="w-6 h-6 text-success-600 flex-shrink-0" />
            ) : analysis.riskLevel === 'critical' ? (
              <AlertOctagon className="w-6 h-6 text-danger-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-warning-600 flex-shrink-0" />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2
                  className={cn(
                    'font-bold text-lg',
                    analysis.riskLevel === 'low' && 'text-success-900',
                    analysis.riskLevel === 'medium' && 'text-warning-900',
                    (analysis.riskLevel === 'high' || analysis.riskLevel === 'critical') && 'text-danger-900'
                  )}
                >
                  {levelInfo.label}
                </h2>
                <Badge
                  variant={
                    analysis.fraudStatus === 'safe'
                      ? 'success'
                      : analysis.fraudStatus === 'suspicious'
                      ? 'warning'
                      : 'danger'
                  }
                >
                  {analysis.fraudStatus.charAt(0).toUpperCase() + analysis.fraudStatus.slice(1)}
                </Badge>
              </div>
              <p
                className={cn(
                  'mt-1',
                  analysis.riskLevel === 'low' && 'text-success-700',
                  analysis.riskLevel === 'medium' && 'text-warning-700',
                  (analysis.riskLevel === 'high' || analysis.riskLevel === 'critical') && 'text-danger-700'
                )}
              >
                {levelInfo.description}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Score Visualization */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <CircularProgress
                  value={analysis.trustScore}
                  size={140}
                  strokeWidth={10}
                  color={
                    analysis.trustScore >= 80
                      ? 'success'
                      : analysis.trustScore >= 40
                      ? 'warning'
                      : 'danger'
                  }
                />
              </div>
              <div className="flex gap-8">
                <div className="text-center">
                  <div className={cn('text-3xl font-bold', getTrustScoreColor(analysis.trustScore))}>
                    {analysis.trustScore}
                  </div>
                  <div className="text-sm text-neutral-500">Trust Score</div>
                </div>
                <div className="text-center">
                  <div
                    className={cn(
                      'text-3xl font-bold',
                      analysis.riskScore < 25
                        ? 'text-success-600'
                        : analysis.riskScore < 50
                        ? 'text-warning-600'
                        : 'text-danger-600'
                    )}
                  >
                    {analysis.riskScore}
                  </div>
                  <div className="text-sm text-neutral-500">Risk Score</div>
                </div>
              </div>
            </div>

            {/* Right: Job Details */}
            <div className="flex-1">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-neutral-900">{analysis.jobTitle}</h3>
                <div className="flex items-center gap-2 text-neutral-600">
                  <Building2 className="w-4 h-4" />
                  <span>{analysis.companyName}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <MapPin className="w-4 h-4" />
                  <span>{analysis.location}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <DollarSign className="w-4 h-4" />
                  <span>{analysis.salary || 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <Mail className="w-4 h-4" />
                  <span>{analysis.recruiterEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Explanation */}
      <Card>
        <div className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Shield className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">AI Analysis Summary</h3>
              <p className="text-sm text-neutral-500">Deep learning analysis results</p>
            </div>
          </div>
          <p className="text-neutral-700 leading-relaxed">{analysis.aiExplanation}</p>
        </div>
      </Card>

      {/* Detailed Analysis Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Salary Analysis */}
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-5 h-5 text-neutral-600" />
              <h3 className="font-semibold text-neutral-900">Salary Analysis</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Stated Salary</span>
                <span className="text-sm font-medium text-neutral-900">
                  {analysis.salaryAnalysis.statedSalary}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Market Average</span>
                <span className="text-sm font-medium text-neutral-900">
                  {analysis.salaryAnalysis.marketAverage}
                </span>
              </div>
              <div className="h-px bg-neutral-200" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Deviation</span>
                <Badge
                  variant={analysis.salaryAnalysis.isRealistic ? 'success' : 'danger'}
                  size="sm"
                >
                  {analysis.salaryAnalysis.deviation}%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Status</span>
                <span
                  className={cn(
                    'text-sm font-medium',
                    analysis.salaryAnalysis.isRealistic ? 'text-success-600' : 'text-danger-600'
                  )}
                >
                  {analysis.salaryAnalysis.isRealistic ? 'Realistic' : 'Unrealistic'}
                </span>
              </div>
              <p className="text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg">
                {analysis.salaryAnalysis.analysis}
              </p>
            </div>
          </div>
        </Card>

        {/* Email Analysis */}
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-neutral-600" />
              <h3 className="font-semibold text-neutral-900">Email Analysis</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Email</span>
                <span className="text-sm font-medium text-neutral-900 truncate max-w-[150px]">
                  {analysis.emailAnalysis.email}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Domain</span>
                <span className="text-sm font-medium text-neutral-900">
                  {analysis.emailAnalysis.domain}
                </span>
              </div>
              <div className="h-px bg-neutral-200" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Disposable</span>
                <Badge variant={analysis.emailAnalysis.isDisposable ? 'danger' : 'success'} size="sm">
                  {analysis.emailAnalysis.isDisposable ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Corporate Domain</span>
                <Badge variant={analysis.emailAnalysis.isCorporate ? 'success' : 'warning'} size="sm">
                  {analysis.emailAnalysis.isCorporate ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Reputation</span>
                <span
                  className={cn(
                    'text-sm font-medium capitalize',
                    analysis.emailAnalysis.reputation === 'good' && 'text-success-600',
                    analysis.emailAnalysis.reputation === 'suspicious' && 'text-warning-600',
                    analysis.emailAnalysis.reputation === 'unknown' && 'text-neutral-500'
                  )}
                >
                  {analysis.emailAnalysis.reputation}
                </span>
              </div>
              <p className="text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg">
                {analysis.emailAnalysis.analysis}
              </p>
            </div>
          </div>
        </Card>

        {/* Company Verification */}
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-5 h-5 text-neutral-600" />
              <h3 className="font-semibold text-neutral-900">Company Verification</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Company</span>
                <span className="text-sm font-medium text-neutral-900">
                  {analysis.companyVerification.name}
                </span>
              </div>
              <div className="h-px bg-neutral-200" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Verified</span>
                {analysis.companyVerification.isVerified ? (
                  <CheckCircle className="w-5 h-5 text-success-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-danger-500" />
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Website</span>
                {analysis.companyVerification.hasWebsite ? (
                  <CheckCircle className="w-5 h-5 text-success-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-danger-500" />
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">LinkedIn</span>
                {analysis.companyVerification.hasLinkedIn ? (
                  <CheckCircle className="w-5 h-5 text-success-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-danger-500" />
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Registration</span>
                <Badge
                  variant={
                    analysis.companyVerification.registrationStatus === 'verified'
                      ? 'success'
                      : analysis.companyVerification.registrationStatus === 'suspicious'
                      ? 'danger'
                      : 'warning'
                  }
                  size="sm"
                >
                  {analysis.companyVerification.registrationStatus.replace('_', ' ')}
                </Badge>
              </div>
              <p className="text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg">
                {analysis.companyVerification.details}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Suspicious Keywords */}
      {analysis.suspiciousKeywords.length > 0 && (
        <Card>
          <div className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-danger-600" />
              <div>
                <h3 className="font-semibold text-neutral-900">Suspicious Keywords Detected</h3>
                <p className="text-sm text-neutral-500">
                  The following terms are commonly associated with job scams
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {analysis.suspiciousKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-danger-50 text-danger-700 text-sm rounded-lg border border-danger-100"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <Link to="/dashboard/analyze">
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Analyze Another Job
          </Button>
        </Link>
        <Link to="/dashboard/reports">
          <Button>View All Reports</Button>
        </Link>
      </div>
    </div>
  );
}

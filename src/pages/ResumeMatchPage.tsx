import { useState, useCallback } from 'react';
import {
  Upload,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  Target,
  BookOpen,
} from 'lucide-react';
import { Button, Card, Badge, ProgressBar, CircularProgress } from '../components/common';
import { mockResumeMatch } from '../data/mockData';
import { cn } from '../utils/helpers';

export function ResumeMatchPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [matchResult, setMatchResult] = useState<typeof mockResumeMatch | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      handleFileSelect(file);
    }
  }, []);

  const handleFileSelect = (_file: File) => {
    setIsUploading(true);

    // Simulate upload and matching
    setTimeout(() => {
      setIsUploading(false);
      setMatchResult(mockResumeMatch);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const clearUpload = () => {
    setMatchResult(null);
  };

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'primary';
    if (score >= 40) return 'warning';
    return 'danger';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Resume Match</h1>
        <p className="text-neutral-500 mt-1">
          Compare your resume against job requirements to identify skill gaps
        </p>
      </div>

      {!matchResult ? (
        <Card className="p-8">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              'border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200',
              isDragging
                ? 'border-primary-400 bg-primary-50'
                : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300 hover:bg-neutral-100'
            )}
          >
            <Upload
              className={cn(
                'w-14 h-14 mx-auto mb-4 transition-colors',
                isDragging ? 'text-primary-500' : 'text-neutral-400'
              )}
            />
            <p className="text-base font-medium text-neutral-700 mb-2">
              Upload your resume to analyze
            </p>
            <p className="text-sm text-neutral-500 mb-6">
              Drag and drop or click to select PDF, DOCX, or TXT
            </p>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleInputChange}
              />
              <span className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50 transition-colors cursor-pointer">
                Choose File
              </span>
            </label>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-neutral-600">Analyzing resume...</span>
            </div>
          )}
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Match Score Header */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <CircularProgress
                  value={matchResult.matchScore}
                  size={120}
                  strokeWidth={8}
                  color={getMatchColor(matchResult.matchScore)}
                  label="Match"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h2 className="text-xl font-bold text-neutral-900">Resume Match Results</h2>
                  <Badge
                    variant={
                      matchResult.matchScore >= 80
                        ? 'success'
                        : matchResult.matchScore >= 60
                        ? 'primary'
                        : 'warning'
                    }
                  >
                    {matchResult.matchScore >= 80
                      ? 'Strong Match'
                      : matchResult.matchScore >= 60
                      ? 'Good Match'
                      : 'Needs Improvement'}
                  </Badge>
                </div>
                <p className="text-neutral-500 text-sm mb-4">
                  {matchResult.fileName} uploaded {matchResult.uploadedAt.toLocaleString()}
                </p>
                <Button variant="outline" size="sm" onClick={clearUpload}>
                  Upload Different Resume
                </Button>
              </div>
            </div>
          </Card>

          {/* Skills Analysis */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-success-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Matched Skills</h3>
                  <p className="text-sm text-neutral-500">
                    {matchResult.matchedSkills.length} skills found in your resume
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchResult.matchedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-success-50 text-success-700 text-sm rounded-lg border border-success-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>

            {/* Missing Skills */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-warning-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-warning-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Skills to Develop</h3>
                  <p className="text-sm text-neutral-500">
                    {matchResult.missingSkills.length} skills could strengthen your profile
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchResult.missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-warning-50 text-warning-700 text-sm rounded-lg border border-warning-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Recommendations</h3>
                <p className="text-sm text-neutral-500">
                  Action items to improve your candidacy
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {matchResult.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-100"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <p className="text-sm text-neutral-700">{rec}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Skill Proficiency */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary-50 rounded-lg">
                <Target className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Skill Proficiency</h3>
                <p className="text-sm text-neutral-500">
                  Estimated proficiency levels for matched skills
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {matchResult.matchedSkills.slice(0, 6).map((skill, index) => {
                const proficiency = Math.floor(Math.random() * 30) + 70;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-neutral-700">{skill}</span>
                      <span className="text-sm text-neutral-500">{proficiency}%</span>
                    </div>
                    <ProgressBar value={proficiency} color={proficiency >= 80 ? 'success' : 'primary'} size="md" />
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Learning Resources */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary-50 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Learning Resources</h3>
                <p className="text-sm text-neutral-500">
                  Recommended courses for your skill gaps
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {matchResult.missingSkills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 bg-neutral-50 rounded-lg border border-neutral-100 hover:border-primary-200 hover:bg-primary-50/50 transition-colors cursor-pointer"
                >
                  <p className="font-medium text-neutral-900 text-sm mb-2">
                    Learn {skill}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Recommended courses available
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

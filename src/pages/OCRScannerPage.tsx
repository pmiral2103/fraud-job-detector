import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  FileImage,
  X,
  Scan,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Eye,
} from 'lucide-react';
import { Button, Card, Badge } from '../components/common';
import { cn } from '../utils/helpers';

export function OCRScannerPage() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const processImage = () => {
    setIsProcessing(true);

    // Simulate OCR processing
    setTimeout(() => {
      setExtractedText(`SENIOR SOFTWARE ENGINEER

TechCorp Solutions Inc.

Location: San Francisco, CA (Remote Options Available)
Salary: $150,000 - $180,000 + Equity

About the Role:
We are looking for a Senior Software Engineer to join our growing team. You will be responsible for designing and implementing scalable systems.

Requirements:
- 5+ years of experience in software development
- Proficiency in React, TypeScript, and Node.js
- Experience with cloud platforms (AWS/GCP)
- Strong communication skills

Benefits:
- Competitive salary and equity package
- Health, dental, and vision insurance
- Flexible work arrangements
- Professional development budget

To apply, send your resume to:
careers@techcorp-solutions.com

⚠️ JOB ID: TCS-2024-SSE-001`);
      setIsProcessing(false);
    }, 2500);
  };

  const clearUpload = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setExtractedText(null);
  };

  const analyzeExtractedJob = () => {
    navigate('/dashboard/result/demo-1');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">OCR Scanner</h1>
        <p className="text-neutral-500 mt-1">
          Upload a job posting screenshot to extract and analyze text
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload Area */}
        <div className="space-y-4">
          <Card className="p-6">
            {!uploadedFile ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  'border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200',
                  isDragging
                    ? 'border-primary-400 bg-primary-50'
                    : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300 hover:bg-neutral-100'
                )}
              >
                <Upload
                  className={cn(
                    'w-12 h-12 mx-auto mb-4 transition-colors',
                    isDragging ? 'text-primary-500' : 'text-neutral-400'
                  )}
                />
                <p className="text-sm font-medium text-neutral-700 mb-1">
                  Drag and drop an image here
                </p>
                <p className="text-xs text-neutral-500 mb-4">PNG, JPG, or WEBP up to 10MB</p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                  <span className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50 transition-colors cursor-pointer">
                    Choose File
                  </span>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                {/* File Preview */}
                <div className="relative rounded-xl overflow-hidden border border-neutral-200">
                  <button
                    onClick={clearUpload}
                    className="absolute top-2 right-2 p-1.5 bg-neutral-900/80 hover:bg-neutral-800 rounded-lg text-white transition-colors z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-64 object-contain bg-neutral-100"
                    />
                  )}
                </div>

                {/* File Info */}
                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileImage className="w-5 h-5 text-neutral-500" />
                    <div>
                      <p className="text-sm font-medium text-neutral-700 truncate max-w-[200px]">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-success-500" />
                </div>

                {/* Process Button */}
                <Button
                  onClick={processImage}
                  loading={isProcessing}
                  leftIcon={<Scan className="w-4 h-4" />}
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Extract Text'}
                </Button>
              </div>
            )}
          </Card>

          {/* Processing Status */}
          {isProcessing && (
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                <div>
                  <p className="font-medium text-neutral-900">Processing Image</p>
                  <p className="text-sm text-neutral-500">
                    Running OCR extraction and text analysis...
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  <span className="text-neutral-600">Image uploaded</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Loader2 className="w-4 h-4 text-primary-500 animate-spin" />
                  <span className="text-neutral-600">Extracting text...</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full border-2 border-neutral-300" />
                  <span className="text-neutral-400">Analyzing job content</span>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Extracted Text Area */}
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-neutral-900">Extracted Text</h3>
              {extractedText && (
                <Badge variant="success" size="sm">
                  Extraction Complete
                </Badge>
              )}
            </div>

            {!extractedText ? (
              <div className="h-72 flex items-center justify-center border-2 border-dashed border-neutral-200 rounded-lg bg-neutral-50">
                <div className="text-center">
                  <Eye className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                  <p className="text-sm text-neutral-400">
                    Extracted text will appear here
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="h-72 overflow-y-auto bg-neutral-50 rounded-lg border border-neutral-200 p-4 scrollbar-thin">
                  <pre className="text-sm text-neutral-700 whitespace-pre-wrap font-sans">
                    {extractedText}
                  </pre>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    onClick={clearUpload}
                    className="flex-1"
                  >
                    Scan Another
                  </Button>
                  <Button
                    onClick={analyzeExtractedJob}
                    leftIcon={<Scan className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Analyze Job
                  </Button>
                </div>
              </>
            )}
          </Card>

          {/* Quick Analysis Preview */}
          {extractedText && (
            <Card className="p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Quick Analysis</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Job Title Detected</span>
                  <CheckCircle className="w-4 h-4 text-success-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Company Name Found</span>
                  <CheckCircle className="w-4 h-4 text-success-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Salary Range Found</span>
                  <CheckCircle className="w-4 h-4 text-success-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Contact Email Found</span>
                  <CheckCircle className="w-4 h-4 text-success-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Suspicious Patterns</span>
                  <AlertTriangle className="w-4 h-4 text-warning-500" />
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

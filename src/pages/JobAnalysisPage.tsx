import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileSearch, AlertCircle, Info } from 'lucide-react';
import { Button, Card, Input, Textarea } from '../components/common';

export function JobAnalysisPage() {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    salary: '',
    recruiterEmail: '',
    location: '',
    jobDescription: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate('/dashboard/result/demo-1');
    }, 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Job Analysis</h1>
        <p className="text-neutral-500 mt-1">
          Submit a job posting for comprehensive fraud detection analysis
        </p>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-4 bg-primary-50 border border-primary-100 rounded-xl">
        <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-primary-800">
          <p className="font-medium mb-1">How it works</p>
          <p className="text-primary-700">
            Our AI analyzes the job posting across multiple dimensions including company
            verification, salary benchmarks, email reputation, and scam pattern detection.
            Results are typically available within 30 seconds.
          </p>
        </div>
      </div>

      {/* Analysis Form */}
      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Job Title"
              name="jobTitle"
              placeholder="e.g., Senior Software Engineer"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
            <Input
              label="Company Name"
              name="companyName"
              placeholder="e.g., TechCorp Solutions"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Salary (optional)"
              name="salary"
              placeholder="e.g., $120,000 - $150,000"
              value={formData.salary}
              onChange={handleChange}
              helperText="Include stated salary range if available"
            />
            <Input
              label="Recruiter Email"
              name="recruiterEmail"
              type="email"
              placeholder="e.g., hiring@company.com"
              value={formData.recruiterEmail}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Job Location"
            name="location"
            placeholder="e.g., San Francisco, CA or Remote"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <Textarea
            label="Job Description"
            name="jobDescription"
            placeholder="Paste the full job description here..."
            value={formData.jobDescription}
            onChange={handleChange}
            required
            className="min-h-[200px]"
          />

          {/* Warning about sensitive info */}
          <div className="flex items-start gap-3 p-4 bg-warning-50 border border-warning-100 rounded-xl">
            <AlertCircle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-warning-800">
              <p className="font-medium">Privacy Notice</p>
              <p className="text-warning-700 mt-1">
                Do not include personal information like your SSN, bank details, or ID
                numbers. Only submit job posting content for analysis.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-neutral-200">
            <Button variant="outline" type="button" onClick={() => setFormData({
              jobTitle: '',
              companyName: '',
              salary: '',
              recruiterEmail: '',
              location: '',
              jobDescription: '',
            })}>
              Clear Form
            </Button>
            <Button
              type="submit"
              loading={isAnalyzing}
              leftIcon={<FileSearch className="w-4 h-4" />}
              disabled={!formData.jobTitle || !formData.companyName || !formData.recruiterEmail || !formData.jobDescription || !formData.location}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Job'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

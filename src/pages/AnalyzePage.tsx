import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, FileSearch, Loader2 } from 'lucide-react';

export function AnalyzePage() {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    recruiterEmail: '',
    salary: '',
    jobDescription: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      // Store the data for the result page
      sessionStorage.setItem('jobData', JSON.stringify(formData));
      navigate('/result');
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormValid =
    formData.jobTitle &&
    formData.companyName &&
    formData.recruiterEmail &&
    formData.jobDescription;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-100">
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
          to="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Analyze Job Posting
          </h1>
          <p className="text-neutral-600">
            Enter the job details below and our AI will check for signs of fraud.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-neutral-700 mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g., Senior Software Engineer"
              className="input-field"
              required
            />
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-neutral-700 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g., TechCorp Solutions"
              className="input-field"
              required
            />
          </div>

          {/* Recruiter Email */}
          <div>
            <label htmlFor="recruiterEmail" className="block text-sm font-medium text-neutral-700 mb-2">
              Recruiter Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="recruiterEmail"
              name="recruiterEmail"
              value={formData.recruiterEmail}
              onChange={handleChange}
              placeholder="e.g., hiring@company.com"
              className="input-field"
              required
            />
          </div>

          {/* Salary */}
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-neutral-700 mb-2">
              Salary Offered
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g., $85,000 per year"
              className="input-field"
            />
            <p className="text-xs text-neutral-500 mt-1">
              Include the salary if mentioned in the job posting
            </p>
          </div>

          {/* Job Description */}
          <div>
            <label htmlFor="jobDescription" className="block text-sm font-medium text-neutral-700 mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Paste the full job description here including requirements, responsibilities, and any other details..."
              className="input-field min-h-[200px] resize-y"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!isFormValid || isAnalyzing}
              className="btn-primary w-full py-4 text-base"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileSearch className="w-5 h-5" />
                  Analyze Job
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

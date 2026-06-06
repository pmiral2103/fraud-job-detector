import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, ArrowRight } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-neutral-900">JobShield</span>
          </div>
          <Link to="/analyze" className="btn-primary">
            Analyze a Job
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-6">
          <Shield className="w-4 h-4" />
          AI-Powered Job Fraud Detection
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
          Protect Yourself from{' '}
          <span className="text-blue-600">Job Scams</span>
        </h1>

        <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
          Paste any job posting and our AI will instantly analyze it for signs of fraud.
          Save your time, money, and personal information from scammers.
        </p>

        <Link to="/analyze" className="btn-primary text-base px-8 py-4">
          Analyze a Job Posting
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* How It Works */}
      <section className="bg-neutral-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-neutral-900 text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Paste Job Details
              </h3>
              <p className="text-neutral-600">
                Copy the job title, company name, email, salary, and description from the posting.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                AI Analysis
              </h3>
              <p className="text-neutral-600">
                Our AI checks for common scam patterns, verifies company details, and analyzes the offer.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Get Instant Results
              </h3>
              <p className="text-neutral-600">
                Receive a fraud score and detailed breakdown of any red flags detected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Detect */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-neutral-900 text-center mb-4">
            What We Detect
          </h2>
          <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
            Our AI identifies the most common job scam tactics used by fraudsters
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-neutral-900">Registration Fees</h4>
                <p className="text-sm text-neutral-500">Requests for upfront payments</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-neutral-900">Unrealistic Salary</h4>
                <p className="text-sm text-neutral-500">Offers way above market rate</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-neutral-900">Fake Companies</h4>
                <p className="text-sm text-neutral-500">Unverifiable business details</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-neutral-900">Suspicious Emails</h4>
                <p className="text-sm text-neutral-500">Personal or disposable domains</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Don't Fall for Job Scams
          </h2>
          <p className="text-blue-100 mb-8">
            Analyze any job posting for free and protect yourself from fraud.
          </p>
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
          >
            Analyze a Job Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-neutral-900">JobShield</span>
          </div>
          <p className="text-sm text-neutral-500">
            &copy; 2024 JobShield. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

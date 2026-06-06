import { Link } from 'react-router-dom';
import {
  Shield,
  Search,
  DollarSign,
  Mail,
  Scan,
  FileText,
  ArrowRight,
  CheckCircle,
  Star,
  ChevronDown,
  Play,
  Globe,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { LandingNavbar } from '../components/layout/Navbar';
import { features, testimonials, faqItems, stats } from '../data/mockData';
import { useState } from 'react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  search: Search,
  'dollar-sign': DollarSign,
  mail: Mail,
  scan: Scan,
  'file-text': FileText,
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100/20 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 border border-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              AI-Powered Job Fraud Detection
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-6">
              Detect Fraudulent Jobs{' '}
              <span className="text-primary-600">Before They Cost You</span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
              Advanced AI analyzes job postings in seconds, protecting your time,
              money, and personal information from sophisticated job scams.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard/analyze">
                <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Analyze a Job
                </Button>
              </Link>
              <Button variant="outline" size="lg" leftIcon={<Play className="w-5 h-5" />}>
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success-500" />
                <span>Instant analysis</span>
              </div>
            </div>
          </div>

          {/* Hero Image / Demo Preview */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
            <div className="bg-neutral-900 rounded-2xl shadow-elevated overflow-hidden border border-neutral-800">
              <div className="flex items-center gap-2 px-4 py-3 bg-neutral-800/50 border-b border-neutral-700">
                <div className="w-3 h-3 rounded-full bg-danger-500" />
                <div className="w-3 h-3 rounded-full bg-warning-500" />
                <div className="w-3 h-3 rounded-full bg-success-500" />
                <div className="ml-4 text-sm text-neutral-400">
                  JobShield AI Dashboard
                </div>
              </div>
              <div className="p-6 bg-neutral-850">
                <img
                  src="https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260"
                  alt="Dashboard preview"
                  className="w-full h-64 object-cover rounded-lg opacity-50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900">{stats.jobsAnalyzed}</div>
              <div className="text-sm text-neutral-500 mt-1">Jobs Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900">{stats.fraudDetected}</div>
              <div className="text-sm text-neutral-500 mt-1">Frauds Detected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900">{stats.countries}</div>
              <div className="text-sm text-neutral-500 mt-1">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900">{stats.accuracy}</div>
              <div className="text-sm text-neutral-500 mt-1">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Everything You Need to Stay Safe
            </h2>
            <p className="text-lg text-neutral-600">
              Comprehensive job fraud detection powered by advanced AI and real-time
              verification databases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Shield;
              return (
                <Card key={index} hover className="group">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600">
              Get comprehensive fraud analysis in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Submit Job Details
              </h3>
              <p className="text-neutral-600">
                Paste the job description, company name, salary, and recruiter email
                or upload a screenshot.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                AI Analysis
              </h3>
              <p className="text-neutral-600">
                Our AI cross-references company databases, salary data, and scam
                patterns in real-time.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Get Results
              </h3>
              <p className="text-neutral-600">
                Receive a detailed risk report with trust scores, red flags, and
                actionable recommendations.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/dashboard/analyze">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Try It Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-neutral-600">
              Real stories from people who avoided job scams with JobShield.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative">
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-warning-400 fill-warning-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-neutral-700 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-neutral-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600">
              Everything you need to know about JobShield AI.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Protecting Yourself Today
          </h2>
          <p className="text-lg text-primary-200 mb-8">
            Join thousands of job seekers who trust JobShield to keep them safe from
            fraud.
          </p>
          <Link to="/dashboard/analyze">
            <Button
              variant="secondary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Analyze Your First Job Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-primary-400" />
                <span className="font-bold text-white text-lg">JobShield</span>
              </div>
              <p className="text-neutral-400 text-sm">
                AI-powered job fraud detection keeping you safe.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              &copy; 2024 JobShield AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card padding="none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium text-neutral-900">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-neutral-600 leading-relaxed">
          {answer}
        </div>
      )}
    </Card>
  );
}

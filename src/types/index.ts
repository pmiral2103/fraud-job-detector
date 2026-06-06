export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type FraudStatus = 'safe' | 'suspicious' | 'fraudulent';

export interface JobAnalysis {
  id: string;
  jobTitle: string;
  companyName: string;
  salary?: string;
  recruiterEmail: string;
  location: string;
  jobDescription: string;
  analyzedAt: Date;
  riskScore: number;
  trustScore: number;
  riskLevel: RiskLevel;
  fraudStatus: FraudStatus;
  suspiciousKeywords: string[];
  salaryAnalysis: SalaryAnalysis;
  emailAnalysis: EmailAnalysis;
  companyVerification: CompanyVerification;
  aiExplanation: string;
}

export interface SalaryAnalysis {
  statedSalary: string;
  marketAverage: string;
  deviation: number;
  isRealistic: boolean;
  analysis: string;
}

export interface EmailAnalysis {
  email: string;
  domain: string;
  isDisposable: boolean;
  isCorporate: boolean;
  reputation: 'good' | 'suspicious' | 'unknown';
  analysis: string;
}

export interface CompanyVerification {
  name: string;
  isVerified: boolean;
  hasWebsite: boolean;
  hasLinkedIn: boolean;
  registrationStatus: 'verified' | 'unverified' | 'not_found' | 'suspicious';
  details: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  analyzedCount: number;
  createdAt: Date;
}

export interface DashboardStats {
  jobsAnalyzed: number;
  fraudDetected: number;
  trustedJobs: number;
  averageRiskScore: number;
  weeklyActivity: WeeklyActivity[];
  riskDistribution: RiskDistribution;
}

export interface WeeklyActivity {
  date: string;
  count: number;
}

export interface RiskDistribution {
  low: number;
  medium: number;
  high: number;
  critical: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ResumeMatch {
  id: string;
  fileName: string;
  uploadedAt: Date;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: string[];
}

export interface Report {
  id: string;
  companyName: string;
  jobTitle: string;
  riskScore: number;
  fraudStatus: FraudStatus;
  analyzedAt: Date;
  location: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalAnalyses: number;
  fraudCaught: number;
  flaggedJobs: number;
  systemUptime: number;
}

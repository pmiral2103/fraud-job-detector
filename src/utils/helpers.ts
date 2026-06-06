import type { RiskLevel, FraudStatus } from '../types';

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getRiskLevelColor(level: RiskLevel): string {
  switch (level) {
    case 'low':
      return 'success';
    case 'medium':
      return 'warning';
    case 'high':
      return 'danger';
    case 'critical':
      return 'danger';
    default:
      return 'neutral';
  }
}

export function getRiskLevelBg(level: RiskLevel): string {
  switch (level) {
    case 'low':
      return 'bg-success-50 border-success-200';
    case 'medium':
      return 'bg-warning-50 border-warning-200';
    case 'high':
      return 'bg-danger-50 border-danger-200';
    case 'critical':
      return 'bg-danger-100 border-danger-300';
    default:
      return 'bg-neutral-50 border-neutral-200';
  }
}

export function getFraudStatusColor(status: FraudStatus): string {
  switch (status) {
    case 'safe':
      return 'success';
    case 'suspicious':
      return 'warning';
    case 'fraudulent':
      return 'danger';
    default:
      return 'neutral';
  }
}

export function getRiskScoreColor(score: number): string {
  if (score < 25) return 'text-success-600';
  if (score < 50) return 'text-warning-600';
  if (score < 75) return 'text-danger-600';
  return 'text-danger-700';
}

export function getRiskScoreBg(score: number): string {
  if (score < 25) return 'bg-success-500';
  if (score < 50) return 'bg-warning-500';
  if (score < 75) return 'bg-danger-500';
  return 'bg-danger-600';
}

export function getTrustScoreColor(score: number): string {
  if (score >= 80) return 'text-success-600';
  if (score >= 60) return 'text-primary-600';
  if (score >= 40) return 'text-warning-600';
  return 'text-danger-600';
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  MoreHorizontal,
  ArrowRight,
  FileSearch,
  Eye,
} from 'lucide-react';
import { Card, StatCard, Badge, Button } from '../components/common';
import { mockDashboardStats, mockRecentAnalyses } from '../data/mockData';
import { formatRelativeTime, cn, getRiskScoreColor, getFraudStatusColor } from '../utils/helpers';
import type { FraudStatus } from '../types';

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-500 mt-1">
            Overview of your job analysis activity
          </p>
        </div>
        <Link to="/dashboard/analyze">
          <Button leftIcon={<FileSearch className="w-4 h-4" />}>
            Analyze New Job
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Jobs Analyzed"
          value={mockDashboardStats.jobsAnalyzed.toLocaleString()}
          change={12}
          trend="up"
          icon={<FileSearch className="w-5 h-5 text-primary-600" />}
          iconBg="bg-primary-50"
        />
        <StatCard
          title="Fraud Detected"
          value={mockDashboardStats.fraudDetected.toLocaleString()}
          change={8}
          trend="down"
          icon={<AlertTriangle className="w-5 h-5 text-danger-600" />}
          iconBg="bg-danger-50"
        />
        <StatCard
          title="Trusted Jobs"
          value={mockDashboardStats.trustedJobs.toLocaleString()}
          change={15}
          trend="up"
          icon={<CheckCircle className="w-5 h-5 text-success-600" />}
          iconBg="bg-success-50"
        />
        <StatCard
          title="Avg Risk Score"
          value={`${mockDashboardStats.averageRiskScore}%`}
          change={5}
          trend="down"
          icon={<TrendingUp className="w-5 h-5 text-warning-600" />}
          iconBg="bg-warning-50"
        />
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-neutral-900">Weekly Activity</h3>
                <p className="text-sm text-neutral-500">Jobs analyzed per day</p>
              </div>
              <select className="text-sm border border-neutral-200 rounded-lg px-3 py-1.5 bg-white text-neutral-700">
                <option>This Week</option>
                <option>Last Week</option>
                <option>Last Month</option>
              </select>
            </div>
            <ActivityChart data={mockDashboardStats.weeklyActivity} />
          </div>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-neutral-900">Risk Distribution</h3>
                <p className="text-sm text-neutral-500">Breakdown by risk level</p>
              </div>
            </div>
            <RiskDistributionChart data={mockDashboardStats.riskDistribution} />
          </div>
        </Card>
      </div>

      {/* Recent Analyses Table */}
      <Card>
        <div className="p-6 pb-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-neutral-900">Recent Analyses</h3>
              <p className="text-sm text-neutral-500">Your latest job screenings</p>
            </div>
            <Link
              to="/dashboard/reports"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <RecentAnalysesTable analyses={mockRecentAnalyses.slice(0, 5)} />
      </Card>
    </div>
  );
}

function ActivityChart({ data }: { data: { date: string; count: number }[] }) {
  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <div className="flex items-end gap-2 h-40">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-neutral-100 rounded-t-sm relative h-32">
            <div
              className="absolute bottom-0 w-full bg-primary-500 rounded-t-sm transition-all duration-500"
              style={{ height: `${(item.count / maxCount) * 100}%` }}
            />
          </div>
          <span className="text-xs text-neutral-500">{item.date}</span>
        </div>
      ))}
    </div>
  );
}

function RiskDistributionChart({ data }: { data: { low: number; medium: number; high: number; critical: number } }) {
  const total = data.low + data.medium + data.high + data.critical;

  const items = [
    { label: 'Low Risk', value: data.low, color: 'bg-success-500', percent: Math.round((data.low / total) * 100) },
    { label: 'Medium Risk', value: data.medium, color: 'bg-warning-500', percent: Math.round((data.medium / total) * 100) },
    { label: 'High Risk', value: data.high, color: 'bg-danger-500', percent: Math.round((data.high / total) * 100) },
    { label: 'Critical', value: data.critical, color: 'bg-danger-700', percent: Math.round((data.critical / total) * 100) },
  ];

  return (
    <div className="space-y-4">
      {/* Bar visualization */}
      <div className="flex h-3 rounded-full overflow-hidden">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(item.color, 'transition-all duration-500')}
            style={{ width: `${item.percent}%` }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn('w-3 h-3 rounded-full', item.color)} />
              <span className="text-sm text-neutral-600">{item.label}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-neutral-900">{item.percent}%</span>
              <span className="text-xs text-neutral-500 ml-1">({item.value})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentAnalysesTable({ analyses }: { analyses: typeof mockRecentAnalyses }) {
  const fraudStatusLabels: Record<FraudStatus, string> = {
    safe: 'Safe',
    suspicious: 'Suspicious',
    fraudulent: 'Fraudulent',
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="table-header rounded-tl-lg">Company</th>
            <th className="table-header">Position</th>
            <th className="table-header">Risk Score</th>
            <th className="table-header">Status</th>
            <th className="table-header">Date</th>
            <th className="table-header rounded-tr-lg text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {analyses.map((analysis) => (
            <tr key={analysis.id} className="hover:bg-neutral-50 transition-colors">
              <td className="table-cell">
                <div>
                  <p className="font-medium text-neutral-900">{analysis.companyName}</p>
                  <p className="text-xs text-neutral-500">{analysis.location}</p>
                </div>
              </td>
              <td className="table-cell text-neutral-600">{analysis.jobTitle}</td>
              <td className="table-cell">
                <span className={cn('font-semibold', getRiskScoreColor(analysis.riskScore))}>
                  {analysis.riskScore}%
                </span>
              </td>
              <td className="table-cell">
                <Badge variant={getFraudStatusColor(analysis.fraudStatus) as 'success' | 'warning' | 'danger'}>
                  {fraudStatusLabels[analysis.fraudStatus]}
                </Badge>
              </td>
              <td className="table-cell text-neutral-500">
                {formatRelativeTime(analysis.analyzedAt)}
              </td>
              <td className="table-cell text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    to={`/dashboard/result/${analysis.id}`}
                    className="p-1.5 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

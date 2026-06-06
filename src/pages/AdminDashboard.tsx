import { useState } from 'react';
import {
  Users,
  Activity,
  AlertTriangle,
  TrendingUp,
  Clock,
  Globe,
  Shield,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Card, Button, Badge, ProgressBar } from '../components/common';
import { mockAdminStats, mockReports } from '../data/mockData';

export function AdminDashboard() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');

  const flaggedJobs = mockReports.filter((r) => r.fraudStatus === 'fraudulent').slice(0, 5);

  const systemMetrics = [
    { label: 'API Response Time', value: '145ms', status: 'healthy' },
    { label: 'Database Latency', value: '23ms', status: 'healthy' },
    { label: 'Queue Processing', value: '12/sec', status: 'healthy' },
    { label: 'Error Rate', value: '0.02%', status: 'healthy' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
          <p className="text-neutral-500 mt-1">System overview and management</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as 'day' | 'week' | 'month')}
            className="text-sm border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-700"
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Total Users</p>
              <p className="text-3xl font-bold text-neutral-900 mt-1">
                {mockAdminStats.totalUsers.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success-500" />
                <span className="text-sm text-success-600 font-medium">+12.5%</span>
              </div>
            </div>
            <div className="p-3 bg-primary-50 rounded-xl">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Active Users</p>
              <p className="text-3xl font-bold text-neutral-900 mt-1">
                {mockAdminStats.activeUsers.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success-500" />
                <span className="text-sm text-success-600 font-medium">+8.3%</span>
              </div>
            </div>
            <div className="p-3 bg-success-50 rounded-xl">
              <Activity className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Total Analyses</p>
              <p className="text-3xl font-bold text-neutral-900 mt-1">
                {(mockAdminStats.totalAnalyses / 1000000).toFixed(1)}M
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-success-500" />
                <span className="text-sm text-success-600 font-medium">+24.7%</span>
              </div>
            </div>
            <div className="p-3 bg-primary-50 rounded-xl">
              <Globe className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Fraud Caught</p>
              <p className="text-3xl font-bold text-neutral-900 mt-1">
                {(mockAdminStats.fraudCaught / 1000).toFixed(0)}K
              </p>
              <div className="flex items-center gap-1 mt-2">
                <Shield className="w-4 h-4 text-primary-500" />
                <span className="text-sm text-primary-600 font-medium">$2.4M saved</span>
              </div>
            </div>
            <div className="p-3 bg-danger-50 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-danger-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* System Health */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">System Health</h3>
                  <p className="text-sm text-neutral-500">Real-time system metrics</p>
                </div>
              </div>
              <Badge variant="success">All Systems Operational</Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {systemMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm text-neutral-600">{metric.label}</p>
                    <p className="text-lg font-bold text-neutral-900">{metric.value}</p>
                  </div>
                  {metric.status === 'healthy' ? (
                    <CheckCircle className="w-5 h-5 text-success-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-danger-500" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* User Analytics Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-neutral-900">User Activity</h3>
                <p className="text-sm text-neutral-500">Daily active users trend</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-500" />
                  <span className="text-neutral-500">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-200" />
                  <span className="text-neutral-500">New Signups</span>
                </div>
              </div>
            </div>

            {/* Simple Chart Visualization */}
            <div className="h-48 flex items-end gap-2">
              {[65, 72, 58, 85, 92, 78, 88, 95, 82, 76, 90, 98, 85, 70].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-primary-100 rounded-sm relative h-36">
                    <div
                      className="absolute bottom-0 w-full bg-primary-500 rounded-sm"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-2xs text-neutral-400">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index % 7]}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Region Distribution */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-neutral-900">Regional Distribution</h3>
                <p className="text-sm text-neutral-500">User base by region</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { region: 'North America', users: 45, count: '21.9K' },
                { region: 'Europe', users: 28, count: '13.6K' },
                { region: 'Asia Pacific', users: 18, count: '8.8K' },
                { region: 'Latin America', users: 6, count: '2.9K' },
                { region: 'Other', users: 3, count: '1.5K' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-neutral-700">{item.region}</span>
                    <span className="text-sm text-neutral-500">{item.count} ({item.users}%)</span>
                  </div>
                  <ProgressBar
                    value={item.users}
                    max={100}
                    color="primary"
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* System Uptime */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-success-50 rounded-lg">
                <Clock className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">System Uptime</h3>
                <p className="text-sm text-neutral-500">Last 30 days</p>
              </div>
            </div>
            <p className="text-4xl font-bold text-success-600">
              {mockAdminStats.systemUptime}%
            </p>
            <div className="mt-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success-500" />
              <span className="text-sm text-neutral-600">No downtime incidents</span>
            </div>
          </Card>

          {/* Flagged Jobs */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-danger-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-danger-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Flagged Jobs</h3>
                  <p className="text-sm text-neutral-500">{mockAdminStats.flaggedJobs} pending review</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {flaggedJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-3 bg-neutral-50 rounded-lg border border-neutral-100"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-900 truncate max-w-[150px]">
                        {job.companyName}
                      </p>
                      <p className="text-xs text-neutral-500">{job.location}</p>
                    </div>
                    <Badge variant="danger" size="sm">
                      {job.riskScore}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Flagged
            </Button>
          </Card>

          {/* Plan Distribution */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-neutral-900">Plan Distribution</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-neutral-300" />
                  <span className="text-sm text-neutral-700">Free</span>
                </div>
                <span className="text-sm font-medium text-neutral-900">31.2K</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-primary-500" />
                  <span className="text-sm text-neutral-700">Pro</span>
                </div>
                <span className="text-sm font-medium text-neutral-900">14.5K</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-primary-800" />
                  <span className="text-sm text-neutral-700">Enterprise</span>
                </div>
                <span className="text-sm font-medium text-neutral-900">3.0K</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="text-sm text-neutral-600 flex justify-between">
                <span>Free</span>
                <span>64%</span>
              </div>
              <ProgressBar value={64} color="neutral" size="sm" />
              <div className="text-sm text-neutral-600 flex justify-between">
                <span>Pro</span>
                <span>30%</span>
              </div>
              <ProgressBar value={30} color="primary" size="sm" />
              <div className="text-sm text-neutral-600 flex justify-between">
                <span>Enterprise</span>
                <span>6%</span>
              </div>
              <ProgressBar value={6} color="primary" size="sm" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  X,
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common';
import { mockReports } from '../data/mockData';
import { formatRelativeTime, cn, getRiskScoreColor } from '../utils/helpers';
import type { FraudStatus } from '../types';

export function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FraudStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'risk'>('date');
  const [showFilters, setShowFilters] = useState(false);

  const fraudStatusLabels: Record<FraudStatus, string> = {
    safe: 'Safe',
    suspicious: 'Suspicious',
    fraudulent: 'Fraudulent',
  };

  const filteredReports = mockReports
    .filter((report) => {
      if (statusFilter !== 'all' && report.fraudStatus !== statusFilter) return false;
      if (
        searchQuery &&
        !report.companyName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !report.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return b.analyzedAt.getTime() - a.analyzedAt.getTime();
      return b.riskScore - a.riskScore;
    });

  const stats = {
    total: mockReports.length,
    safe: mockReports.filter((r) => r.fraudStatus === 'safe').length,
    suspicious: mockReports.filter((r) => r.fraudStatus === 'suspicious').length,
    fraudulent: mockReports.filter((r) => r.fraudStatus === 'fraudulent').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Reports</h1>
          <p className="text-neutral-500 mt-1">Complete history of your job analyses</p>
        </div>
        <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
          Export All
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <button
          onClick={() => setStatusFilter('all')}
          className={cn(
            'p-4 rounded-xl border text-left transition-all',
            statusFilter === 'all'
              ? 'bg-primary-50 border-primary-200'
              : 'bg-white border-neutral-200 hover:border-neutral-300'
          )}
        >
          <p className="text-2xl font-bold text-neutral-900">{stats.total}</p>
          <p className="text-sm text-neutral-500">Total Analyses</p>
        </button>
        <button
          onClick={() => setStatusFilter('safe')}
          className={cn(
            'p-4 rounded-xl border text-left transition-all',
            statusFilter === 'safe'
              ? 'bg-success-50 border-success-200'
              : 'bg-white border-neutral-200 hover:border-neutral-300'
          )}
        >
          <p className="text-2xl font-bold text-success-700">{stats.safe}</p>
          <p className="text-sm text-neutral-500">Safe</p>
        </button>
        <button
          onClick={() => setStatusFilter('suspicious')}
          className={cn(
            'p-4 rounded-xl border text-left transition-all',
            statusFilter === 'suspicious'
              ? 'bg-warning-50 border-warning-200'
              : 'bg-white border-neutral-200 hover:border-neutral-300'
          )}
        >
          <p className="text-2xl font-bold text-warning-700">{stats.suspicious}</p>
          <p className="text-sm text-neutral-500">Suspicious</p>
        </button>
        <button
          onClick={() => setStatusFilter('fraudulent')}
          className={cn(
            'p-4 rounded-xl border text-left transition-all',
            statusFilter === 'fraudulent'
              ? 'bg-danger-50 border-danger-200'
              : 'bg-white border-neutral-200 hover:border-neutral-300'
          )}
        >
          <p className="text-2xl font-bold text-danger-700">{stats.fraudulent}</p>
          <p className="text-sm text-neutral-500">Fraudulent</p>
        </button>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company or job title..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm
                placeholder:text-neutral-400 focus:bg-white focus:border-primary-500 focus:ring-2
                focus:ring-primary-500/10 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-100 rounded"
              >
                <X className="w-3 h-3 text-neutral-400" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-sm border rounded-lg transition-colors',
                showFilters
                  ? 'bg-primary-50 border-primary-200 text-primary-700'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              )}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'risk')}
              className="flex items-center gap-2 px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
            >
              <option value="date">Sort by Date</option>
              <option value="risk">Sort by Risk</option>
            </select>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-neutral-200 grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1.5">Date Range</label>
              <select className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-700">
                <option>All Time</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1.5">Risk Level</label>
              <select className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-700">
                <option>All Levels</option>
                <option>Low Risk (0-25)</option>
                <option>Medium Risk (26-50)</option>
                <option>High Risk (51-75)</option>
                <option>Critical Risk (76-100)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1.5">Location</label>
              <select className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-700">
                <option>All Locations</option>
                <option>Remote</option>
                <option>United States</option>
                <option>Europe</option>
              </select>
            </div>
          </div>
        )}
      </Card>

      {/* Results Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="table-header rounded-tl-lg">Company</th>
                <th className="table-header">Position</th>
                <th className="table-header">Location</th>
                <th className="table-header">Risk Score</th>
                <th className="table-header">Status</th>
                <th className="table-header">Date</th>
                <th className="table-header rounded-tr-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="table-cell">
                    <div className="font-medium text-neutral-900">{report.companyName}</div>
                  </td>
                  <td className="table-cell text-neutral-600">{report.jobTitle}</td>
                  <td className="table-cell text-neutral-500">{report.location}</td>
                  <td className="table-cell">
                    <span className={cn('font-semibold', getRiskScoreColor(report.riskScore))}>
                      {report.riskScore}%
                    </span>
                  </td>
                  <td className="table-cell">
                    <Badge
                      variant={
                        report.fraudStatus === 'safe'
                          ? 'success'
                          : report.fraudStatus === 'suspicious'
                          ? 'warning'
                          : 'danger'
                      }
                    >
                      {fraudStatusLabels[report.fraudStatus]}
                    </Badge>
                  </td>
                  <td className="table-cell text-neutral-500">
                    {formatRelativeTime(report.analyzedAt)}
                  </td>
                  <td className="table-cell text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/dashboard/result/${report.id}`}
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200">
          <p className="text-sm text-neutral-500">
            Showing {filteredReports.length} of {mockReports.length} results
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

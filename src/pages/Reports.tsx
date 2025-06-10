import React, { useState } from 'react';
import { Download, Calendar, BarChart3, PieChart, TrendingUp, FileText } from 'lucide-react';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('last_30_days');
  const [reportType, setReportType] = useState('overview');

  const reportTypes = [
    { id: 'overview', name: 'Business Overview', icon: BarChart3 },
    { id: 'sales', name: 'Sales Performance', icon: TrendingUp },
    { id: 'commissions', name: 'Commission Report', icon: PieChart },
    { id: 'claims', name: 'Claims Analysis', icon: FileText },
  ];

  const quickStats = [
    { label: 'Total Policies', value: '1,247', change: '+12%', color: 'text-blue-600' },
    { label: 'Premium Collected', value: 'TZS 45,678,900', change: '+18%', color: 'text-green-600' },
    { label: 'Commission Earned', value: 'TZS 6,851,840', change: '+15%', color: 'text-purple-600' },
    { label: 'Claims Processed', value: '89', change: '+5%', color: 'text-orange-600' },
  ];

  const monthlyData = [
    { month: 'Jan', policies: 45, premium: 125000000, commission: 18750000 },
    { month: 'Feb', policies: 52, premium: 142000000, commission: 21300000 },
    { month: 'Mar', policies: 48, premium: 135000000, commission: 20250000 },
    { month: 'Apr', policies: 61, premium: 168000000, commission: 25200000 },
    { month: 'May', policies: 55, premium: 155000000, commission: 23250000 },
    { month: 'Jun', policies: 67, premium: 189000000, commission: 28350000 },
  ];

  const topProducts = [
    { name: 'Commercial Auto Insurance', policies: 234, premium: 'TZS 12,450,000' },
    { name: 'General Liability', policies: 189, premium: 'TZS 9,870,000' },
    { name: 'Property Insurance', policies: 156, premium: 'TZS 15,670,000' },
    { name: 'Workers Compensation', policies: 98, premium: 'TZS 7,890,000' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive business insights and performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="last_7_days">Last 7 Days</option>
            <option value="last_30_days">Last 30 Days</option>
            <option value="last_90_days">Last 90 Days</option>
            <option value="last_year">Last Year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className="text-sm text-green-600 font-medium">
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Types */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setReportType(type.id)}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  reportType === type.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-6 w-6 mb-2" />
                <div className="font-medium">{type.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Performance</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(data.policies / 70) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{data.policies} policies</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">TZS {(data.premium / 1000000).toFixed(0)}M</div>
                  <div className="text-xs text-gray-500">Premium</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.policies} policies</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{product.premium}</div>
                  <div className="text-sm text-gray-500">Premium</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">85%</div>
            <div className="text-gray-600">Policy Retention Rate</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-green-600">TZS 2,458,900</div>
            <div className="text-gray-600">Avg. Policy Value</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">15%</div>
            <div className="text-gray-600">Avg. Commission Rate</div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="h-5 w-5 mr-2 text-blue-500" />
            <span>Export as PDF</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
            <span>Export as Excel</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-5 w-5 mr-2 text-purple-500" />
            <span>Export as CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
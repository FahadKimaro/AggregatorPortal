import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, Bell, Send } from 'lucide-react';

const Renewals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const renewals = [
    {
      id: 'REN-2024-001',
      client: 'John Doe',
      company: 'ABC Corp',
      policyNumber: 'POL-2024-001',
      product: 'Commercial Auto Insurance',
      currentPremium: 'TZS 2,450,000',
      newPremium: 'TZS 2,650,000',
      expiryDate: '2024-07-15',
      renewalDate: '2024-07-16',
      status: 'pending',
      daysToExpiry: 45
    },
    {
      id: 'REN-2024-002',
      client: 'Jane Smith',
      company: 'XYZ Ltd',
      policyNumber: 'POL-2024-002',
      product: 'General Liability',
      currentPremium: 'TZS 3,200,000',
      newPremium: 'TZS 3,400,000',
      expiryDate: '2024-06-30',
      renewalDate: '2024-07-01',
      status: 'reminder_sent',
      daysToExpiry: 30
    },
    {
      id: 'REN-2024-003',
      client: 'Mike Johnson',
      company: 'DEF Industries',
      policyNumber: 'POL-2024-003',
      product: 'Property Insurance',
      currentPremium: 'TZS 5,800,000',
      newPremium: 'TZS 6,200,000',
      expiryDate: '2024-08-10',
      renewalDate: '2024-08-11',
      status: 'renewed',
      daysToExpiry: 70
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reminder_sent': return 'bg-blue-100 text-blue-800';
      case 'renewed': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'reminder_sent': return 'Reminder Sent';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const getPriorityColor = (days: number) => {
    if (days <= 15) return 'text-red-600';
    if (days <= 30) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredRenewals = renewals.filter(renewal => {
    const matchesSearch = renewal.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         renewal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         renewal.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || renewal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Renewals</h1>
          <p className="text-gray-600">Manage policy renewals and reminders</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Process Renewal</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-blue-600">43</div>
          <div className="text-gray-600">Due This Month</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-yellow-600">12</div>
          <div className="text-gray-600">Urgent (≤15 days)</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">89</div>
          <div className="text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-purple-600">TZS 12,452,000</div>
          <div className="text-gray-600">Renewal Value</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search renewals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reminder_sent">Reminder Sent</option>
              <option value="renewed">Renewed</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Renewals Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days to Expiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRenewals.map((renewal) => (
                <tr key={renewal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{renewal.client}</div>
                      <div className="text-sm text-gray-500">{renewal.company}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{renewal.policyNumber}</div>
                      <div className="text-sm text-gray-500">{renewal.product}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">Current: {renewal.currentPremium}</div>
                      <div className="text-sm text-green-600">New: {renewal.newPremium}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      {renewal.expiryDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getPriorityColor(renewal.daysToExpiry)}`}>
                      {renewal.daysToExpiry} days
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(renewal.status)}`}>
                      {getStatusLabel(renewal.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="Send Reminder">
                        <Bell className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Process Renewal">
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Renewals;
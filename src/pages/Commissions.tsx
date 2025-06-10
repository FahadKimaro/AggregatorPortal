import React, { useState } from 'react';
import { Plus, Search, Filter, DollarSign, TrendingUp, Calendar } from 'lucide-react';

const Commissions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const commissions = [
    {
      id: 'COM-2024-001',
      policyNumber: 'POL-2024-001',
      client: 'John Doe',
      company: 'ABC Corp',
      product: 'Commercial Auto Insurance',
      premium: 'TZS 2,450,000',
      commissionRate: '15%',
      commissionAmount: 'TZS 367,500',
      status: 'received',
      dueDate: '2024-02-15',
      receivedDate: '2024-02-10'
    },
    {
      id: 'COM-2024-002',
      policyNumber: 'POL-2024-002',
      client: 'Jane Smith',
      company: 'XYZ Ltd',
      product: 'General Liability',
      premium: 'TZS 3,200,000',
      commissionRate: '12%',
      commissionAmount: 'TZS 384,000',
      status: 'pending',
      dueDate: '2024-02-20',
      receivedDate: null
    },
    {
      id: 'COM-2024-003',
      policyNumber: 'POL-2024-003',
      client: 'Mike Johnson',
      company: 'DEF Industries',
      product: 'Property Insurance',
      premium: 'TZS 5,800,000',
      commissionRate: '10%',
      commissionAmount: 'TZS 580,000',
      status: 'overdue',
      dueDate: '2024-01-30',
      receivedDate: null
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCommissions = commissions.filter(commission => {
    const matchesSearch = commission.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || commission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCommissions = commissions.reduce((sum, comm) => sum + parseFloat(comm.commissionAmount.replace('TZS ', '').replace(',', '')), 0);
  const receivedThisMonth = commissions
    .filter(comm => comm.status === 'received')
    .reduce((sum, comm) => sum + parseFloat(comm.commissionAmount.replace('TZS ', '').replace(',', '')), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Commissions Tracking</h1>
          <p className="text-gray-600">Track and manage commission payments</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add Commission</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Commissions</dt>
                <dd className="text-2xl font-bold text-gray-900">TZS {totalCommissions.toFixed(0)}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Received This Month</dt>
                <dd className="text-2xl font-bold text-gray-900">TZS {receivedThisMonth.toFixed(0)}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-yellow-600">5</div>
          <div className="text-gray-600">Pending Payments</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-red-600">2</div>
          <div className="text-gray-600">Overdue</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search commissions..."
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
              <option value="received">Received</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Commissions Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCommissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{commission.policyNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{commission.client}</div>
                      <div className="text-sm text-gray-500">{commission.company}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {commission.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {commission.premium}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {commission.commissionRate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {commission.commissionAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(commission.status)}`}>
                      {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      {commission.dueDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {commission.status !== 'received' && (
                      <button className="text-green-600 hover:text-green-900">
                        Mark as Received
                      </button>
                    )}
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

export default Commissions;
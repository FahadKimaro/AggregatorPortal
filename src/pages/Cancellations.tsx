import React, { useState } from 'react';
import { Plus, Search, Filter, XCircle, Calendar, AlertTriangle } from 'lucide-react';

const Cancellations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reasonFilter, setReasonFilter] = useState('all');

  const cancellations = [
    {
      id: 'CAN-2024-001',
      policyNumber: 'POL-2024-001',
      client: 'John Doe',
      company: 'ABC Corp',
      product: 'Commercial Auto Insurance',
      premium: 'TZS 2,450,000',
      reason: 'customer_request',
      cancelDate: '2024-01-15',
      effectiveDate: '2024-01-20',
      refundAmount: 'TZS 1,225,000',
      status: 'processed'
    },
    {
      id: 'CAN-2024-002',
      policyNumber: 'POL-2024-002',
      client: 'Jane Smith',
      company: 'XYZ Ltd',
      product: 'General Liability',
      premium: 'TZS 3,200,000',
      reason: 'non_payment',
      cancelDate: '2024-01-18',
      effectiveDate: '2024-01-25',
      refundAmount: 'TZS 0',
      status: 'pending'
    },
    {
      id: 'CAN-2024-003',
      policyNumber: 'POL-2024-003',
      client: 'Mike Johnson',
      company: 'DEF Industries',
      product: 'Property Insurance',
      premium: 'TZS 5,800,000',
      reason: 'policy_change',
      cancelDate: '2024-01-12',
      effectiveDate: '2024-01-15',
      refundAmount: 'TZS 2,900,000',
      status: 'approved'
    },
  ];

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'customer_request': return 'bg-blue-100 text-blue-800';
      case 'non_payment': return 'bg-red-100 text-red-800';
      case 'policy_change': return 'bg-purple-100 text-purple-800';
      case 'fraud': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReasonLabel = (reason: string) => {
    switch (reason) {
      case 'customer_request': return 'Customer Request';
      case 'non_payment': return 'Non Payment';
      case 'policy_change': return 'Policy Change';
      case 'fraud': return 'Fraud';
      default: return reason;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'processed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCancellations = cancellations.filter(cancellation => {
    const matchesSearch = cancellation.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cancellation.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cancellation.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReason = reasonFilter === 'all' || cancellation.reason === reasonFilter;
    return matchesSearch && matchesReason;
  });

  const totalRefunds = cancellations.reduce((sum, cancellation) => sum + parseFloat(cancellation.refundAmount.replace('TZS ', '').replace(',', '')), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cancellations</h1>
          <p className="text-gray-600">Manage policy cancellations and refunds</p>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
          <XCircle className="h-5 w-5" />
          <span>Process Cancellation</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Cancellations</dt>
                <dd className="text-2xl font-bold text-gray-900">23</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-yellow-600">8</div>
          <div className="text-gray-600">Pending</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">15</div>
          <div className="text-gray-600">Processed</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-purple-600">TZS {totalRefunds.toLocaleString()}</div>
          <div className="text-gray-600">Total Refunds</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cancellations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={reasonFilter}
              onChange={(e) => setReasonFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Reasons</option>
              <option value="customer_request">Customer Request</option>
              <option value="non_payment">Non Payment</option>
              <option value="policy_change">Policy Change</option>
              <option value="fraud">Fraud</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cancellations Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cancel Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refund Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCancellations.map((cancellation) => (
                <tr key={cancellation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{cancellation.policyNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{cancellation.client}</div>
                      <div className="text-sm text-gray-500">{cancellation.company}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cancellation.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cancellation.premium}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getReasonColor(cancellation.reason)}`}>
                      {getReasonLabel(cancellation.reason)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      {cancellation.cancelDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mr-2" />
                      {cancellation.effectiveDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cancellation.refundAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(cancellation.status)}`}>
                      {cancellation.status.charAt(0).toUpperCase() + cancellation.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {cancellation.status === 'pending' && (
                      <button className="text-green-600 hover:text-green-900">
                        Approve
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

export default Cancellations;
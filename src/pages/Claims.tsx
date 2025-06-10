import React, { useState } from 'react';
import { Plus, Search, Filter, AlertTriangle, Calendar, FileText, DollarSign } from 'lucide-react';

const Claims: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const claims = [
    {
      id: 'CLM-2024-001',
      claimNumber: 'CLM-2024-001',
      policyNumber: 'POL-2024-001',
      client: 'John Doe',
      company: 'ABC Corp',
      product: 'Commercial Auto Insurance',
      incidentDate: '2024-01-10',
      reportedDate: '2024-01-12',
      claimAmount: 'TZS 15,000,000',
      approvedAmount: 'TZS 12,500,000',
      status: 'approved',
      adjuster: 'Sarah Wilson',
      description: 'Vehicle collision on highway'
    },
    {
      id: 'CLM-2024-002',
      claimNumber: 'CLM-2024-002',
      policyNumber: 'POL-2024-002',
      client: 'Jane Smith',
      company: 'XYZ Ltd',
      product: 'General Liability',
      incidentDate: '2024-01-15',
      reportedDate: '2024-01-16',
      claimAmount: 'TZS 25,000,000',
      approvedAmount: null,
      status: 'investigating',
      adjuster: 'Mike Johnson',
      description: 'Slip and fall incident at premises'
    },
    {
      id: 'CLM-2024-003',
      claimNumber: 'CLM-2024-003',
      policyNumber: 'POL-2024-003',
      client: 'Mike Johnson',
      company: 'DEF Industries',
      product: 'Property Insurance',
      incidentDate: '2024-01-08',
      reportedDate: '2024-01-09',
      claimAmount: 'TZS 50,000,000',
      approvedAmount: 'TZS 45,000,000',
      status: 'settled',
      adjuster: 'Emily Davis',
      description: 'Fire damage to warehouse facility'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'settled': return 'bg-purple-100 text-purple-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalClaimAmount = claims.reduce((sum, claim) => sum + parseFloat(claim.claimAmount.replace('TZS ', '').replace(',', '')), 0);
  const totalApprovedAmount = claims.reduce((sum, claim) => {
    if (claim.approvedAmount) {
      return sum + parseFloat(claim.approvedAmount.replace('TZS ', '').replace(',', ''));
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Claims Management</h1>
          <p className="text-gray-600">Track and process insurance claims</p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>New Claim</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Claims</dt>
                <dd className="text-2xl font-bold text-gray-900">47</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Claim Amount</dt>
                <dd className="text-2xl font-bold text-gray-900">TZS {totalClaimAmount.toLocaleString()}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">TZS {totalApprovedAmount.toLocaleString()}</div>
          <div className="text-gray-600">Approved Amount</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-yellow-600">12</div>
          <div className="text-gray-600">Under Investigation</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search claims..."
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
              <option value="submitted">Submitted</option>
              <option value="investigating">Investigating</option>
              <option value="approved">Approved</option>
              <option value="settled">Settled</option>
              <option value="rejected">Rejected</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incident Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adjuster</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{claim.claimNumber}</div>
                        <div className="text-sm text-gray-500">{claim.policyNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{claim.client}</div>
                      <div className="text-sm text-gray-500">{claim.company}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {claim.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      {claim.incidentDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {claim.claimAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {claim.approvedAmount || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(claim.status)}`}>
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {claim.adjuster}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View Details">
                        <FileText className="h-4 w-4" />
                      </button>
                      {claim.status === 'investigating' && (
                        <button className="text-green-600 hover:text-green-900">
                          Approve
                        </button>
                      )}
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

export default Claims;
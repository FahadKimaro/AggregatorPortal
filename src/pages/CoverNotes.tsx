import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Download, Shield } from 'lucide-react';

const CoverNotes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const coverNotes = [
    {
      id: 'CN-2024-001',
      client: 'John Doe',
      company: 'ABC Corp',
      product: 'Commercial Auto Insurance',
      premium: 'TZS 2,450,000',
      status: 'active',
      validFrom: '2024-01-15',
      validTo: '2024-07-15',
      policyNumber: 'POL-2024-001'
    },
    {
      id: 'CN-2024-002',
      client: 'Jane Smith',
      company: 'XYZ Ltd',
      product: 'General Liability',
      premium: 'TZS 3,200,000',
      status: 'expired',
      validFrom: '2024-01-01',
      validTo: '2024-01-31',
      policyNumber: 'POL-2024-002'
    },
    {
      id: 'CN-2024-003',
      client: 'Mike Johnson',
      company: 'DEF Industries',
      product: 'Property Insurance',
      premium: 'TZS 5,800,000',
      status: 'active',
      validFrom: '2024-01-10',
      validTo: '2024-07-10',
      policyNumber: 'POL-2024-003'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCoverNotes = coverNotes.filter(note => {
    const matchesSearch = note.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || note.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPremium = coverNotes.reduce((sum, note) => sum + parseFloat(note.premium.replace('TZS ', '').replace(',', '')), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cover Notes</h1>
          <p className="text-gray-600">Manage temporary insurance coverage documents</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Issue Cover Note</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-blue-600">98</div>
          <div className="text-gray-600">Total Cover Notes</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">76</div>
          <div className="text-gray-600">Active</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-red-600">12</div>
          <div className="text-gray-600">Expired</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-purple-600">TZS {totalPremium.toLocaleString()}</div>
          <div className="text-gray-600">Total Premium</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cover notes..."
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
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cover Notes Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cover Note ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCoverNotes.map((note) => (
                <tr key={note.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-blue-500 mr-2" />
                      <div className="text-sm font-medium text-gray-900">{note.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{note.client}</div>
                      <div className="text-sm text-gray-500">{note.company}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {note.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {note.premium}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {note.policyNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div>From: {note.validFrom}</div>
                      <div>To: {note.validTo}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(note.status)}`}>
                      {note.status.charAt(0).toUpperCase() + note.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900" title="Download">
                        <Download className="h-4 w-4" />
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

export default CoverNotes;
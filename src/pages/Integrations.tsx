import React, { useState } from 'react';
import { Plus, Search, Send, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

const Integrations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const integrations = [
    {
      id: 'INT-001',
      name: 'National Insurance Corporation (NIC)',
      type: 'API',
      status: 'active',
      lastSync: '2024-01-20 14:30',
      totalSent: 1247,
      successRate: '98.5%'
    },
    {
      id: 'INT-002',
      name: 'Jubilee Insurance Company',
      type: 'SFTP',
      status: 'inactive',
      lastSync: '2024-01-18 09:15',
      totalSent: 856,
      successRate: '95.2%'
    },
    {
      id: 'INT-003',
      name: 'AAR Insurance Tanzania',
      type: 'API',
      status: 'active',
      lastSync: '2024-01-20 16:45',
      totalSent: 2134,
      successRate: '99.1%'
    },
    {
      id: 'INT-004',
      name: 'Strategis Insurance',
      type: 'API',
      status: 'active',
      lastSync: '2024-01-20 11:20',
      totalSent: 567,
      successRate: '97.8%'
    },
    {
      id: 'INT-005',
      name: 'Heritage Insurance Company',
      type: 'SFTP',
      status: 'active',
      lastSync: '2024-01-19 15:30',
      totalSent: 789,
      successRate: '96.4%'
    },
  ];

  const dataSent = [
    {
      id: 'DS-001',
      integration: 'National Insurance Corporation (NIC)',
      dataType: 'Policy Data',
      recordCount: 45,
      sentDate: '2024-01-20 14:30',
      status: 'success',
      responseCode: '200',
      fileSize: '2.3 MB'
    },
    {
      id: 'DS-002',
      integration: 'Jubilee Insurance Company',
      dataType: 'Claims Data',
      recordCount: 12,
      sentDate: '2024-01-20 13:15',
      status: 'failed',
      responseCode: '500',
      fileSize: '856 KB'
    },
    {
      id: 'DS-003',
      integration: 'AAR Insurance Tanzania',
      dataType: 'Client Data',
      recordCount: 78,
      sentDate: '2024-01-20 12:00',
      status: 'success',
      responseCode: '200',
      fileSize: '4.1 MB'
    },
    {
      id: 'DS-004',
      integration: 'Strategis Insurance',
      dataType: 'Premium Data',
      recordCount: 23,
      sentDate: '2024-01-20 11:30',
      status: 'pending',
      responseCode: '-',
      fileSize: '1.2 MB'
    },
    {
      id: 'DS-005',
      integration: 'Heritage Insurance Company',
      dataType: 'Renewal Data',
      recordCount: 34,
      sentDate: '2024-01-19 16:45',
      status: 'success',
      responseCode: '200',
      fileSize: '1.8 MB'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDataStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDataStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'failed': return XCircle;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  const filteredDataSent = dataSent.filter(data => {
    const matchesSearch = data.integration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         data.dataType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || data.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Manage data integrations with insurance companies</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add Integration</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-blue-600">8</div>
          <div className="text-gray-600">Active Integrations</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">4,237</div>
          <div className="text-gray-600">Records Sent Today</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-purple-600">97.8%</div>
          <div className="text-gray-600">Success Rate</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-teal-600">12.5 MB</div>
          <div className="text-gray-600">Data Transferred</div>
        </div>
      </div>

      {/* Integration Status */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {integrations.map((integration) => (
            <div key={integration.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{integration.name}</h4>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(integration.status)}`}>
                  {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium">{integration.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Sync:</span>
                  <span className="font-medium">{integration.lastSync}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Sent:</span>
                  <span className="font-medium">{integration.totalSent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-medium text-green-600">{integration.successRate}</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                  Test Connection
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Transmission Log */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Data Transmission Log</h3>
            <div className="flex space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transmissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Integration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDataSent.map((data) => {
                const StatusIcon = getDataStatusIcon(data.status);
                return (
                  <tr key={data.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{data.integration}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{data.dataType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{data.recordCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{data.fileSize}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{data.sentDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon className="h-4 w-4 mr-2" />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDataStatusColor(data.status)}`}>
                          {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{data.responseCode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                        {data.status === 'failed' && (
                          <button className="text-green-600 hover:text-green-900" title="Retry">
                            <Send className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
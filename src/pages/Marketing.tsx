import React, { useState } from 'react';
import { Plus, Search, Filter, Mail, MessageSquare, Send, Eye, BarChart3 } from 'lucide-react';

const Marketing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const campaigns = [
    {
      id: 'CAMP-2024-001',
      name: 'New Year Insurance Promotion',
      type: 'email',
      status: 'sent',
      recipients: 2450,
      opened: 1225,
      clicked: 245,
      sentDate: '2024-01-01',
      subject: 'Start the New Year with Better Coverage'
    },
    {
      id: 'CAMP-2024-002',
      name: 'Renewal Reminder Campaign',
      type: 'sms',
      status: 'scheduled',
      recipients: 850,
      opened: 0,
      clicked: 0,
      sentDate: '2024-02-01',
      subject: 'Your insurance renewal is due soon'
    },
    {
      id: 'CAMP-2024-003',
      name: 'Auto Insurance Special Offer',
      type: 'email',
      status: 'draft',
      recipients: 0,
      opened: 0,
      clicked: 0,
      sentDate: null,
      subject: 'Save 20% on Auto Insurance'
    },
  ];

  const templates = [
    { id: 1, name: 'Welcome Email', type: 'email', usage: 145 },
    { id: 2, name: 'Renewal Reminder', type: 'email', usage: 89 },
    { id: 3, name: 'Policy Update SMS', type: 'sms', usage: 234 },
    { id: 4, name: 'Payment Confirmation', type: 'email', usage: 167 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'email' ? Mail : MessageSquare;
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || campaign.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email/SMS Marketing</h1>
          <p className="text-gray-600">Create and manage marketing campaigns</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-blue-600">45</div>
          <div className="text-gray-600">Total Campaigns</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">12,450</div>
          <div className="text-gray-600">Messages Sent</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-purple-600">65%</div>
          <div className="text-gray-600">Open Rate</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-teal-600">12%</div>
          <div className="text-gray-600">Click Rate</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Management */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Management</h3>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
            </div>
          </div>

          {/* Campaigns List */}
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => {
              const TypeIcon = getTypeIcon(campaign.type);
              return (
                <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <TypeIcon className="h-5 w-5 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                        <p className="text-sm text-gray-500">{campaign.subject}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>Recipients: {campaign.recipients}</span>
                          {campaign.opened > 0 && <span>Opened: {campaign.opened}</span>}
                          {campaign.clicked > 0 && <span>Clicked: {campaign.clicked}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                      <div className="flex space-x-1">
                        <button className="text-blue-600 hover:text-blue-900" title="View">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900" title="Analytics">
                          <BarChart3 className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900" title="Send">
                          <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Templates */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Templates</h3>
            <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
              Manage Templates
            </button>
          </div>
          <div className="space-y-3">
            {templates.map((template) => {
              const TypeIcon = getTypeIcon(template.type);
              return (
                <div key={template.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <TypeIcon className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{template.name}</div>
                      <div className="text-xs text-gray-500">Used {template.usage} times</div>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-900 text-sm">
                    Use Template
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
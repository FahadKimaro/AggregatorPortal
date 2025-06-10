import React, { useState } from 'react';
import { Plus, Search, Filter, Phone, Mail, MapPin, Car } from 'lucide-react';
import LeadForm from '../components/LeadForm';

const Leads: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+255 234 567 8901',
      company: 'ABC Corp',
      location: 'Dar es Salaam, Tanzania',
      status: 'new',
      source: 'Website',
      created: '2024-01-15',
      value: 'TZS 50,000',
      vehicleReg: 'T123ABC',
      insuranceType: 'Motor Insurance'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+255 234 567 8902',
      company: 'XYZ Ltd',
      location: 'Arusha, Tanzania',
      status: 'contacted',
      source: 'Referral',
      created: '2024-01-14',
      value: 'TZS 75,000',
      vehicleReg: 'T456DEF',
      insuranceType: 'Comprehensive'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+255 234 567 8903',
      company: 'DEF Industries',
      location: 'Mwanza, Tanzania',
      status: 'qualified',
      source: 'Social Media',
      created: '2024-01-13',
      value: 'TZS 100,000',
      vehicleReg: 'T789GHI',
      insuranceType: 'Third Party'
    },
  ]);

  const handleAddLead = (leadData: any) => {
    const newLead = {
      id: leads.length + 1,
      name: leadData.leadName,
      email: leadData.emailId,
      phone: leadData.mobile,
      company: leadData.customerName || 'Individual',
      location: `${leadData.district || ''}, ${leadData.region || 'Tanzania'}`.replace(/^, /, ''),
      status: leadData.leadStatus || 'new',
      source: leadData.leadChannel || 'Direct',
      created: new Date().toISOString().split('T')[0],
      value: 'TZS 0',
      vehicleReg: leadData.registrationNumber || '-',
      insuranceType: leadData.insuranceType || 'Motor Insurance'
    };
    
    setLeads(prev => [...prev, newLead]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.vehicleReg.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-gray-600">Track and manage your potential clients</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-blue-600">{leads.length}</div>
          <div className="text-gray-600">Total Leads</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-yellow-600">
            {leads.filter(l => l.status === 'contacted').length}
          </div>
          <div className="text-gray-600">Contacted</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">
            {leads.filter(l => l.status === 'qualified').length}
          </div>
          <div className="text-gray-600">Qualified</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-purple-600">
            {leads.filter(l => l.status === 'converted').length}
          </div>
          <div className="text-gray-600">Converted</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads by name, company, or vehicle registration..."
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
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.company}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {lead.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {lead.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {lead.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Car className="h-4 w-4 mr-2 text-gray-400" />
                        {lead.vehicleReg}
                      </div>
                      <div className="text-sm text-gray-500">{lead.insuranceType}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lead.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.created}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-green-600 hover:text-green-900">Convert</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Form Modal */}
      <LeadForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddLead}
      />
    </div>
  );
};

export default Leads;
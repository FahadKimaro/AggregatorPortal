import React, { useState } from 'react';
import { Plus, Search, Filter, Phone, Mail, MapPin, Building2 } from 'lucide-react';
import ClientForm from '../components/ClientForm';

const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [clients, setClients] = useState([
    {
      id: 'CLT-001',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+255 234 567 8901',
      company: 'ABC Corp',
      type: 'corporate',
      location: 'Dar es Salaam, Tanzania',
      activePolicies: 3,
      totalPremium: 'TZS 8,450,000',
      lastContact: '2024-01-15',
      status: 'active'
    },
    {
      id: 'CLT-002',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+255 234 567 8902',
      company: 'Personal',
      type: 'individual',
      location: 'Arusha, Tanzania',
      activePolicies: 2,
      totalPremium: 'TZS 3,200,000',
      lastContact: '2024-01-20',
      status: 'active'
    },
    {
      id: 'CLT-003',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+255 234 567 8903',
      company: 'DEF Industries',
      type: 'corporate',
      location: 'Mwanza, Tanzania',
      activePolicies: 5,
      totalPremium: 'TZS 15,800,000',
      lastContact: '2024-01-10',
      status: 'active'
    },
  ]);

  const handleAddClient = (clientData: any) => {
    const newClient = {
      id: `CLT-${String(clients.length + 1).padStart(3, '0')}`,
      name: clientData.fullName,
      email: clientData.emailAddress,
      phone: clientData.phoneNumber,
      company: clientData.type === 'corporate' ? clientData.fullName : 'Personal',
      type: clientData.type,
      location: `${clientData.district || ''}, ${clientData.region || 'Tanzania'}`.replace(/^, /, ''),
      activePolicies: 0,
      totalPremium: 'TZS 0',
      lastContact: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    
    setClients(prev => [...prev, newClient]);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'individual': return 'bg-blue-100 text-blue-800';
      case 'corporate': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || client.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalPremium = clients.reduce((sum, client) => sum + parseFloat(client.totalPremium.replace('TZS ', '').replace(',', '')), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">Manage your client relationships and information</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Client</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-blue-600">{clients.length}</div>
          <div className="text-gray-600">Total Clients</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-purple-600">
            {clients.filter(c => c.type === 'corporate').length}
          </div>
          <div className="text-gray-600">Corporate</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-teal-600">
            {clients.filter(c => c.type === 'individual').length}
          </div>
          <div className="text-gray-600">Individual</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">TZS {totalPremium.toLocaleString()}</div>
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
              placeholder="Search clients by name, company, or email..."
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
              <option value="individual">Individual</option>
              <option value="corporate">Corporate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policies</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Premium</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {client.type === 'corporate' ? 
                          <Building2 className="h-5 w-5 text-blue-600" /> :
                          <span className="text-blue-600 font-semibold">{client.name.charAt(0)}</span>
                        }
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {client.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {client.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {client.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(client.type)}`}>
                      {client.type.charAt(0).toUpperCase() + client.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.activePolicies} active
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {client.totalPremium}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.lastContact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Form Modal */}
      <ClientForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddClient}
      />
    </div>
  );
};

export default Clients;
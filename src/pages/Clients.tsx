import React, { useState } from 'react';
import { Plus, Search, Filter, Phone, Mail, MapPin, Building2, Edit, Trash2, Eye } from 'lucide-react';
import ClientForm from '../components/ClientForm';

interface Client {
  id: string;
  clientType: 'individual' | 'corporate';
  title: string;
  fullName: string;
  dateOfBirth: string;
  idType: string;
  idNumber: string;
  gender: string;
  nationality: string;
  countryOfRegistration: string;
  businessType: string;
  registrationNumber: string;
  tinNumber: string;
  vrnNumber: string;
  region: string;
  district: string;
  street: string;
  phoneNumber: string;
  emailAddress: string;
  activePolicies: number;
  totalPremium: string;
  lastContact: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [viewingClient, setViewingClient] = useState<Client | null>(null);

  const [clients, setClients] = useState<Client[]>([

  ]);

  const handleAddClient = (clientData: any) => {
    const newClient: Client = {
      id: `CLT-${String(clients.length + 1).padStart(3, '0')}`,
      clientType: clientData.type,
      title: clientData.title || '',
      fullName: clientData.fullName,
      dateOfBirth: clientData.dateOfBirth || '',
      idType: clientData.idType || '',
      idNumber: clientData.idNumber || '',
      gender: clientData.gender || '',
      nationality: clientData.nationality || '',
      countryOfRegistration: clientData.countryOfRegistration || '',
      businessType: clientData.businessType || '',
      registrationNumber: clientData.registrationNumber || '',
      tinNumber: clientData.tinNumber || '',
      vrnNumber: clientData.vrnNumber || '',
      region: clientData.region || '',
      district: clientData.district || '',
      street: clientData.street || '',
      phoneNumber: clientData.phoneNumber,
      emailAddress: clientData.emailAddress,
      activePolicies: 0,
      totalPremium: 'TZS 0',
      lastContact: new Date().toISOString().split('T')[0],
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setClients(prev => [...prev, newClient]);
    setIsFormOpen(false);
  };

  const handleEditClient = (clientData: any) => {
    if (!editingClient) return;
    
    const updatedClient: Client = {
      ...editingClient,
      clientType: clientData.type,
      title: clientData.title || '',
      fullName: clientData.fullName,
      dateOfBirth: clientData.dateOfBirth || '',
      idType: clientData.idType || '',
      idNumber: clientData.idNumber || '',
      gender: clientData.gender || '',
      nationality: clientData.nationality || '',
      countryOfRegistration: clientData.countryOfRegistration || '',
      businessType: clientData.businessType || '',
      registrationNumber: clientData.registrationNumber || '',
      tinNumber: clientData.tinNumber || '',
      vrnNumber: clientData.vrnNumber || '',
      region: clientData.region || '',
      district: clientData.district || '',
      street: clientData.street || '',
      phoneNumber: clientData.phoneNumber,
      emailAddress: clientData.emailAddress,
      lastContact: new Date().toISOString().split('T')[0]
    };
    
    setClients(prev => prev.map(client => 
      client.id === editingClient.id ? updatedClient : client
    ));
    setEditingClient(null);
    setIsFormOpen(false);
  };

  const handleDeleteClient = (clientId: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(prev => prev.filter(client => client.id !== clientId));
    }
  };

  const openEditForm = (client: Client) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingClient(null);
    setIsFormOpen(true);
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
    const matchesSearch = client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || client.clientType === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalPremium = clients.reduce((sum, client) => {
    const premium = parseFloat(client.totalPremium.replace('TZS ', '').replace(',', ''));
    return sum + (isNaN(premium) ? 0 : premium);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600">Manage your client relationships and detailed information</p>
        </div>
        <button 
          onClick={openAddForm}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Client</span>
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
            {clients.filter(c => c.clientType === 'corporate').length}
          </div>
          <div className="text-gray-600">Corporate Clients</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-teal-600">
            {clients.filter(c => c.clientType === 'individual').length}
          </div>
          <div className="text-gray-600">Individual Clients</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">TZS {totalPremium.toLocaleString()}</div>
          <div className="text-gray-600">Total Premium Value</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients by name, email, phone, or ID..."
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
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Info</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Details</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Info</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policies</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {client.clientType === 'corporate' ? 
                          <Building2 className="h-5 w-5 text-blue-600" /> :
                          <span className="text-blue-600 font-semibold">{client.fullName.charAt(0)}</span>
                        }
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {client.title && `${client.title} `}{client.fullName}
                        </div>
                        <div className="text-sm text-gray-500">ID: {client.id}</div>
                        {client.dateOfBirth && (
                          <div className="text-xs text-gray-400">DOB: {client.dateOfBirth}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(client.clientType)}`}>
                      {client.clientType.charAt(0).toUpperCase() + client.clientType.slice(1)}
                    </span>
                    {client.gender && (
                      <div className="text-xs text-gray-500 mt-1">{client.gender}</div>
                    )}
                    {client.nationality && (
                      <div className="text-xs text-gray-500">{client.nationality}</div>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="h-3 w-3 mr-2 text-gray-400" />
                        <span className="truncate max-w-32">{client.emailAddress}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-3 w-3 mr-2 text-gray-400" />
                        {client.phoneNumber}
                      </div>
                      {(client.idType || client.idNumber) && (
                        <div className="text-xs text-gray-400">
                          {client.idType}: {client.idNumber}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {client.region && <div>{client.region}</div>}
                      {client.district && <div className="text-gray-500">{client.district}</div>}
                      {client.street && <div className="text-xs text-gray-400">{client.street}</div>}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {client.clientType === 'corporate' ? (
                      <div className="text-sm">
                        {client.businessType && (
                          <div className="text-gray-900 capitalize">{client.businessType.replace('_', ' ')}</div>
                        )}
                        {client.registrationNumber && (
                          <div className="text-xs text-gray-500">Reg: {client.registrationNumber}</div>
                        )}
                        {client.tinNumber && (
                          <div className="text-xs text-gray-500">TIN: {client.tinNumber}</div>
                        )}
                        {client.vrnNumber && (
                          <div className="text-xs text-gray-500">VRN: {client.vrnNumber}</div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">Individual Client</div>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="text-gray-900">{client.activePolicies} active</div>
                      <div className="text-xs text-gray-500">{client.totalPremium}</div>
                      <div className="text-xs text-gray-400">Last: {client.lastContact}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setViewingClient(client)}
                        className="text-blue-600 hover:text-blue-900" 
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => openEditForm(client)}
                        className="text-green-600 hover:text-green-900" 
                        title="Edit Client"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClient(client.id)}
                        className="text-red-600 hover:text-red-900" 
                        title="Delete Client"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
        onClose={() => {
          setIsFormOpen(false);
          setEditingClient(null);
        }}
        onSubmit={editingClient ? handleEditClient : handleAddClient}
        editingClient={editingClient}
      />

      {/* Client Details Modal */}
      {viewingClient && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={() => setViewingClient(null)}
            />
            <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Client Details</h3>
                <button
                  onClick={() => setViewingClient(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 border-b pb-2">Basic Information</h4>
                  <div><span className="font-medium">Client Type:</span> {viewingClient.clientType}</div>
                  <div><span className="font-medium">Title:</span> {viewingClient.title || 'N/A'}</div>
                  <div><span className="font-medium">Full Name:</span> {viewingClient.fullName}</div>
                  <div><span className="font-medium">Date of Birth:</span> {viewingClient.dateOfBirth || 'N/A'}</div>
                  <div><span className="font-medium">Gender:</span> {viewingClient.gender || 'N/A'}</div>
                  <div><span className="font-medium">Nationality:</span> {viewingClient.nationality || 'N/A'}</div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 border-b pb-2">Identification</h4>
                  <div><span className="font-medium">ID Type:</span> {viewingClient.idType || 'N/A'}</div>
                  <div><span className="font-medium">ID Number:</span> {viewingClient.idNumber || 'N/A'}</div>
                  {viewingClient.clientType === 'corporate' && (
                    <>
                      <div><span className="font-medium">Registration Number:</span> {viewingClient.registrationNumber || 'N/A'}</div>
                      <div><span className="font-medium">TIN Number:</span> {viewingClient.tinNumber || 'N/A'}</div>
                      <div><span className="font-medium">VRN Number:</span> {viewingClient.vrnNumber || 'N/A'}</div>
                    </>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 border-b pb-2">Contact & Location</h4>
                  <div><span className="font-medium">Phone:</span> {viewingClient.phoneNumber}</div>
                  <div><span className="font-medium">Email:</span> {viewingClient.emailAddress}</div>
                  <div><span className="font-medium">Region:</span> {viewingClient.region || 'N/A'}</div>
                  <div><span className="font-medium">District:</span> {viewingClient.district || 'N/A'}</div>
                  <div><span className="font-medium">Street:</span> {viewingClient.street || 'N/A'}</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Status:</span>
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(viewingClient.status)}`}>
                      {viewingClient.status.charAt(0).toUpperCase() + viewingClient.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Created: {viewingClient.createdAt} | Last Contact: {viewingClient.lastContact}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
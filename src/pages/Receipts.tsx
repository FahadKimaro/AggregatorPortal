import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Download, CreditCard } from 'lucide-react';

const Receipts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const receipts = [
    {
      id: 'RCP-2024-001',
      client: 'John Doe',
      company: 'ABC Corp',
      amount: 'TZS 2,695,000',
      paymentMethod: 'credit_card',
      paymentRef: 'TXN123456789',
      receiptDate: '2024-01-16',
      invoiceId: 'INV-2024-001'
    },
    {
      id: 'RCP-2024-002',
      client: 'Jane Smith',
      company: 'XYZ Ltd',
      amount: 'TZS 3,520,000',
      paymentMethod: 'bank_transfer',
      paymentRef: 'BT987654321',
      receiptDate: '2024-01-21',
      invoiceId: 'INV-2024-002'
    },
    {
      id: 'RCP-2024-003',
      client: 'Mike Johnson',
      company: 'DEF Industries',
      amount: 'TZS 6,380,000',
      paymentMethod: 'check',
      paymentRef: 'CHK001234',
      receiptDate: '2024-01-12',
      invoiceId: 'INV-2024-003'
    },
  ];

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'credit_card': return 'bg-blue-100 text-blue-800';
      case 'bank_transfer': return 'bg-green-100 text-green-800';
      case 'check': return 'bg-purple-100 text-purple-800';
      case 'cash': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'credit_card': return 'Credit Card';
      case 'bank_transfer': return 'Bank Transfer';
      case 'check': return 'Check';
      case 'cash': return 'Cash';
      default: return method;
    }
  };

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPayment = paymentFilter === 'all' || receipt.paymentMethod === paymentFilter;
    return matchesSearch && matchesPayment;
  });

  const totalAmount = receipts.reduce((sum, receipt) => sum + parseFloat(receipt.amount.replace('TZS ', '').replace(',', '')), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Receipts</h1>
          <p className="text-gray-600">Track payment receipts and transactions</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Generate Receipt</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-blue-600">125</div>
          <div className="text-gray-600">Total Receipts</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">TZS {totalAmount.toLocaleString()}</div>
          <div className="text-gray-600">Total Collected</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-purple-600">45</div>
          <div className="text-gray-600">This Month</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-teal-600">TZS 145,230,000</div>
          <div className="text-gray-600">Monthly Collection</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search receipts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Payment Methods</option>
              <option value="credit_card">Credit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="check">Check</option>
              <option value="cash">Cash</option>
            </select>
          </div>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReceipts.map((receipt) => (
                <tr key={receipt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
                      <div className="text-sm font-medium text-gray-900">{receipt.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{receipt.client}</div>
                      <div className="text-sm text-gray-500">{receipt.company}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {receipt.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentMethodColor(receipt.paymentMethod)}`}>
                      {getPaymentMethodLabel(receipt.paymentMethod)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {receipt.paymentRef}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {receipt.receiptDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {receipt.invoiceId}
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

export default Receipts;
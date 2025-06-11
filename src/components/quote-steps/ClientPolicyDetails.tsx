import React, { useState } from 'react';
import { User, Building2, Calendar, DollarSign } from 'lucide-react';

interface ClientPolicyDetailsProps {
  data: any;
  onNext: (data: any) => void;
  onPrevious: () => void;
}

const ClientPolicyDetails: React.FC<ClientPolicyDetailsProps> = ({ data, onNext, onPrevious }) => {
  const [clientName, setClientName] = useState(data.clientDetails?.clientName || '');
  const [insuredName, setInsuredName] = useState(data.clientDetails?.insuredName || data.vehicleDetails?.ownerName || '');
  const [insurer, setInsurer] = useState(data.clientDetails?.insurer || '');
  const [dateFrom, setDateFrom] = useState(data.clientDetails?.dateFrom || '');
  const [dateTo, setDateTo] = useState(data.clientDetails?.dateTo || '');
  const [currency, setCurrency] = useState(data.clientDetails?.currency || 'USD');
  const [source, setSource] = useState(data.clientDetails?.source || '');

  const insurers = [
    "National Insurance Corporation (NIC)",
    "Jubilee Insurance Company",
    "AAR Insurance Tanzania",
    "Strategis Insurance",
    "Heritage Insurance Company",
    "Allianz Insurance",
    "MetLife Insurance"
  ];

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "TZS", name: "Tanzanian Shilling", symbol: "TZS" },
    { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
    { code: "UGX", name: "Ugandan Shilling", symbol: "UGX" }
  ];

  const sources = [
    "Direct Sales",
    "Online Portal",
    "Broker Network",
    "Agent Referral",
    "Marketing Campaign",
    "Walk-in Customer",
    "Phone Inquiry",
    "Email Inquiry"
  ];

  // Auto-calculate end date (1 year from start date)
  const handleDateFromChange = (date: string) => {
    setDateFrom(date);
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setFullYear(startDate.getFullYear() + 1);
      setDateTo(endDate.toISOString().split('T')[0]);
    }
  };

  const handleNext = () => {
    const clientDetails = {
      clientName,
      insuredName,
      insurer,
      dateFrom,
      dateTo,
      currency,
      source
    };
    onNext({ clientDetails });
  };

  const isFormValid = clientName && insuredName && insurer && dateFrom && dateTo && currency && source;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Client & Policy Details</h3>
        <p className="text-gray-600">Enter client information and configure policy parameters</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <User className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Client Information</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Name *
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter client name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insured Name *
              </label>
              <input
                type="text"
                value={insuredName}
                onChange={(e) => setInsuredName(e.target.value)}
                placeholder="Auto-filled from vehicle owner"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Auto-filled from vehicle registration data</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Source *
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select source</option>
                {sources.map((src) => (
                  <option key={src} value={src}>{src}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Policy Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Building2 className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Policy Information</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurer *
              </label>
              <select
                value={insurer}
                onChange={(e) => setInsurer(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select insurer</option>
                {insurers.map((ins) => (
                  <option key={ins} value={ins}>{ins}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Policy Start Date *
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => handleDateFromChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Policy End Date *
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency *
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} - {curr.name} ({curr.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Period Summary */}
      {dateFrom && dateTo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-blue-600" />
            <div>
              <h5 className="font-medium text-blue-900">Policy Period Summary</h5>
              <p className="text-sm text-blue-700">
                Coverage from {new Date(dateFrom).toLocaleDateString()} to {new Date(dateTo).toLocaleDateString()}
                {' '}({Math.ceil((new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60 * 60 * 24))} days)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          onClick={onPrevious}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Previous Step
        </button>
        <button
          onClick={handleNext}
          disabled={!isFormValid}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default ClientPolicyDetails;
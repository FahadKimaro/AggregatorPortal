import React, { useState } from 'react';
import { X, Package, Car, User, Shield, Calculator, FileText, ChevronRight, ChevronLeft } from 'lucide-react';

interface QuotationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (quotationData: any) => void;
}

const QuotationForm: React.FC<QuotationFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState({
    registrationNumber: '',
    chassisNumber: '',
    expiryDate: '',
    vehicleStatus: '',
    vehicleMake: '',
    vehicleModel: '',
    modelNumber: '',
    bodyType: '',
    vehicleColor: '',
    engineNumber: '',
    engineSize: '',
    fuelType: '',
    numberOfAxles: '',
    axleDistance: '',
    tareWeight: '',
    grossWeight: '',
    motorUsage: '',
    ownerCategory: '',
    motorCategory: '',
    numberOfSeats: '',
    manufactureYear: ''
  });

  const [clientPolicyDetails, setClientPolicyDetails] = useState({
    clientName: '',
    insuredName: '',
    insurer: '',
    policyPeriodFrom: '',
    policyPeriodTo: '',
    currency: 'TZS',
    source: ''
  });

  const [coverDetails, setCoverDetails] = useState({
    insuranceType: '',
    insuranceClass: '',
    sumInsured: '',
    premiumRate: '',
    addOns: [],
    addOnPremium: '',
    netPremiumAmount: '',
    commissionAmount: '',
    vatAmount: '',
    totalPremium: '',
    termsAndClauses: ''
  });

  const products = [
    { id: 'motor', name: 'Motor Insurance', description: 'Comprehensive vehicle insurance coverage' },
    { id: 'property', name: 'Property Insurance', description: 'Protection for buildings and contents' },
    { id: 'liability', name: 'General Liability', description: 'Third-party liability coverage' },
    { id: 'marine', name: 'Marine Insurance', description: 'Coverage for marine cargo and vessels' },
    { id: 'life', name: 'Life Insurance', description: 'Life and health insurance products' }
  ];

  const insurers = [
    'National Insurance Corporation (NIC)',
    'Jubilee Insurance Company',
    'AAR Insurance Tanzania',
    'Strategis Insurance',
    'Heritage Insurance Company',
    'Reliance Insurance',
    'Phoenix Insurance'
  ];

  const addOnOptions = [
    { id: 'roadside_assistance', name: 'Roadside Assistance', premium: 50000 },
    { id: 'windscreen_cover', name: 'Windscreen Cover', premium: 75000 },
    { id: 'personal_accident', name: 'Personal Accident Cover', premium: 100000 },
    { id: 'theft_protection', name: 'Enhanced Theft Protection', premium: 125000 },
    { id: 'flood_cover', name: 'Flood Cover', premium: 150000 }
  ];

  // Mock function to simulate vehicle data fetch
  const fetchVehicleDetails = (regNumber: string) => {
    // Simulate API call with random but realistic data
    const mockData = {
      chassisNumber: `CH${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      expiryDate: '2024-12-31',
      vehicleStatus: 'Active',
      vehicleMake: 'Toyota',
      vehicleModel: 'Camry',
      modelNumber: 'XV70',
      bodyType: 'Sedan',
      vehicleColor: 'Silver',
      engineNumber: `EN${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      engineSize: '2.5L',
      fuelType: 'Petrol',
      numberOfAxles: '2',
      axleDistance: '2.82m',
      tareWeight: '1590kg',
      grossWeight: '2100kg',
      motorUsage: 'Private',
      ownerCategory: 'Individual',
      motorCategory: 'Passenger Car',
      numberOfSeats: '5',
      manufactureYear: '2022'
    };

    setVehicleDetails(prev => ({
      ...prev,
      registrationNumber: regNumber,
      ...mockData
    }));

    // Auto-fill insured name as vehicle owner
    setClientPolicyDetails(prev => ({
      ...prev,
      insuredName: 'John Doe (Vehicle Owner)'
    }));
  };

  const calculatePremiums = () => {
    const sumInsured = parseFloat(coverDetails.sumInsured) || 0;
    const premiumRate = parseFloat(coverDetails.premiumRate) || 0;
    const addOnPremium = parseFloat(coverDetails.addOnPremium) || 0;

    const netPremium = (sumInsured * premiumRate) / 100;
    const commission = netPremium * 0.15; // 15% commission
    const vat = (netPremium + addOnPremium) * 0.18; // 18% VAT
    const total = netPremium + addOnPremium + vat;

    setCoverDetails(prev => ({
      ...prev,
      netPremiumAmount: netPremium.toFixed(0),
      commissionAmount: commission.toFixed(0),
      vatAmount: vat.toFixed(0),
      totalPremium: total.toFixed(0)
    }));
  };

  const handleAddOnChange = (addOnId: string, checked: boolean) => {
    let newAddOns = [...coverDetails.addOns];
    if (checked) {
      newAddOns.push(addOnId);
    } else {
      newAddOns = newAddOns.filter(id => id !== addOnId);
    }

    const totalAddOnPremium = newAddOns.reduce((total, id) => {
      const addOn = addOnOptions.find(option => option.id === id);
      return total + (addOn ? addOn.premium : 0);
    }, 0);

    setCoverDetails(prev => ({
      ...prev,
      addOns: newAddOns,
      addOnPremium: totalAddOnPremium.toString()
    }));
  };

  const handleSubmit = () => {
    const quotationData = {
      product: selectedProduct,
      vehicleDetails,
      clientPolicyDetails,
      coverDetails,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'draft'
    };
    
    onSubmit(quotationData);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedProduct('');
    setVehicleDetails({
      registrationNumber: '',
      chassisNumber: '',
      expiryDate: '',
      vehicleStatus: '',
      vehicleMake: '',
      vehicleModel: '',
      modelNumber: '',
      bodyType: '',
      vehicleColor: '',
      engineNumber: '',
      engineSize: '',
      fuelType: '',
      numberOfAxles: '',
      axleDistance: '',
      tareWeight: '',
      grossWeight: '',
      motorUsage: '',
      ownerCategory: '',
      motorCategory: '',
      numberOfSeats: '',
      manufactureYear: ''
    });
    setClientPolicyDetails({
      clientName: '',
      insuredName: '',
      insurer: '',
      policyPeriodFrom: '',
      policyPeriodTo: '',
      currency: 'TZS',
      source: ''
    });
    setCoverDetails({
      insuranceType: '',
      insuranceClass: '',
      sumInsured: '',
      premiumRate: '',
      addOns: [],
      addOnPremium: '',
      netPremiumAmount: '',
      commissionAmount: '',
      vatAmount: '',
      totalPremium: '',
      termsAndClauses: ''
    });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === currentStep 
              ? 'bg-blue-600 text-white' 
              : step < currentStep 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-600'
          }`}>
            {step}
          </div>
          {step < 4 && (
            <div className={`w-16 h-1 mx-2 ${
              step < currentStep ? 'bg-green-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900">Select Insurance Product</h3>
        <p className="text-gray-600">Choose the type of insurance coverage you need</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedProduct === product.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Car className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900">Vehicle Details</h3>
        <p className="text-gray-600">Enter vehicle registration to fetch details</p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Vehicle Registration Number *
        </label>
        <div className="flex space-x-3">
          <input
            type="text"
            value={vehicleDetails.registrationNumber}
            onChange={(e) => setVehicleDetails(prev => ({ ...prev, registrationNumber: e.target.value }))}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., MC706EVK"
          />
          <button
            type="button"
            onClick={() => fetchVehicleDetails(vehicleDetails.registrationNumber)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Fetch Details
          </button>
        </div>
      </div>

      {vehicleDetails.chassisNumber && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Fetched Vehicle Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(vehicleDetails).map(([key, value]) => {
              if (key === 'registrationNumber') return null;
              return (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                  <input
                    type="text"
                    value={value}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900">Client & Policy Details</h3>
        <p className="text-gray-600">Enter client information and policy period</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name *
          </label>
          <input
            type="text"
            value={clientPolicyDetails.clientName}
            onChange={(e) => setClientPolicyDetails(prev => ({ ...prev, clientName: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter client name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Insured Name
          </label>
          <input
            type="text"
            value={clientPolicyDetails.insuredName}
            onChange={(e) => setClientPolicyDetails(prev => ({ ...prev, insuredName: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Auto-filled as vehicle owner"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Insurer *
          </label>
          <select
            value={clientPolicyDetails.insurer}
            onChange={(e) => setClientPolicyDetails(prev => ({ ...prev, insurer: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Insurer</option>
            {insurers.map((insurer) => (
              <option key={insurer} value={insurer}>{insurer}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <select
            value={clientPolicyDetails.currency}
            onChange={(e) => setClientPolicyDetails(prev => ({ ...prev, currency: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="TZS">TZS - Tanzanian Shilling</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Policy Period From *
          </label>
          <input
            type="date"
            value={clientPolicyDetails.policyPeriodFrom}
            onChange={(e) => setClientPolicyDetails(prev => ({ ...prev, policyPeriodFrom: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Policy Period To *
          </label>
          <input
            type="date"
            value={clientPolicyDetails.policyPeriodTo}
            onChange={(e) => setClientPolicyDetails(prev => ({ ...prev, policyPeriodTo: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Source (Channel/Origin)
          </label>
          <select
            value={clientPolicyDetails.source}
            onChange={(e) => setClientPolicyDetails(prev => ({ ...prev, source: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Source</option>
            <option value="direct">Direct</option>
            <option value="broker">Broker</option>
            <option value="agent">Agent</option>
            <option value="online">Online</option>
            <option value="referral">Referral</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900">Cover Details</h3>
        <p className="text-gray-600">Configure coverage and calculate premiums</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Insurance Type *
          </label>
          <select
            value={coverDetails.insuranceType}
            onChange={(e) => setCoverDetails(prev => ({ ...prev, insuranceType: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Type</option>
            <option value="comprehensive">Comprehensive</option>
            <option value="third_party">Third Party</option>
            <option value="fire_theft">Fire & Theft</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Insurance Class
          </label>
          <select
            value={coverDetails.insuranceClass}
            onChange={(e) => setCoverDetails(prev => ({ ...prev, insuranceClass: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Class</option>
            <option value="class_1">Class 1 - Private Cars</option>
            <option value="class_2">Class 2 - Commercial Vehicles</option>
            <option value="class_3">Class 3 - Motorcycles</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sum Insured ({clientPolicyDetails.currency}) *
          </label>
          <input
            type="number"
            value={coverDetails.sumInsured}
            onChange={(e) => setCoverDetails(prev => ({ ...prev, sumInsured: e.target.value }))}
            onBlur={calculatePremiums}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter sum insured"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Premium Rate (%) *
          </label>
          <input
            type="number"
            step="0.01"
            value={coverDetails.premiumRate}
            onChange={(e) => setCoverDetails(prev => ({ ...prev, premiumRate: e.target.value }))}
            onBlur={calculatePremiums}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 3.5"
            required
          />
        </div>
      </div>

      {/* Add-ons Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Add-ons</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addOnOptions.map((addOn) => (
            <div key={addOn.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={addOn.id}
                checked={coverDetails.addOns.includes(addOn.id)}
                onChange={(e) => handleAddOnChange(addOn.id, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={addOn.id} className="flex-1 text-sm text-gray-700">
                {addOn.name} - {clientPolicyDetails.currency} {addOn.premium.toLocaleString()}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Calculation */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calculator className="h-5 w-5 mr-2" />
          Premium Calculation
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Net Premium Amount
            </label>
            <input
              type="text"
              value={coverDetails.netPremiumAmount ? `${clientPolicyDetails.currency} ${parseFloat(coverDetails.netPremiumAmount).toLocaleString()}` : ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add-on Premium
            </label>
            <input
              type="text"
              value={coverDetails.addOnPremium ? `${clientPolicyDetails.currency} ${parseFloat(coverDetails.addOnPremium).toLocaleString()}` : ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commission Amount (15%)
            </label>
            <input
              type="text"
              value={coverDetails.commissionAmount ? `${clientPolicyDetails.currency} ${parseFloat(coverDetails.commissionAmount).toLocaleString()}` : ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              VAT (18%)
            </label>
            <input
              type="text"
              value={coverDetails.vatAmount ? `${clientPolicyDetails.currency} ${parseFloat(coverDetails.vatAmount).toLocaleString()}` : ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Premium
            </label>
            <input
              type="text"
              value={coverDetails.totalPremium ? `${clientPolicyDetails.currency} ${parseFloat(coverDetails.totalPremium).toLocaleString()}` : ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-green-100 text-green-700 font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Terms & Clauses */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Terms & Clauses
        </label>
        <textarea
          value={coverDetails.termsAndClauses}
          onChange={(e) => setCoverDetails(prev => ({ ...prev, termsAndClauses: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter terms and conditions or select from predefined templates..."
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block w-full max-w-6xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Create New Quotation</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Step Content */}
          <div className="min-h-[500px]">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200 mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              {currentStep === 4 ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Save Quotation
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !selectedProduct) ||
                    (currentStep === 2 && selectedProduct === 'motor' && !vehicleDetails.chassisNumber)
                  }
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    (currentStep === 1 && !selectedProduct) ||
                    (currentStep === 2 && selectedProduct === 'motor' && !vehicleDetails.chassisNumber)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationForm;
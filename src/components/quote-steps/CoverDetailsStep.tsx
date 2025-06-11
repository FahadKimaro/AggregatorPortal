import React, { useState, useEffect } from 'react';
import { Shield, Calculator, FileText, Plus, Minus } from 'lucide-react';

interface CoverDetailsStepProps {
  data: any;
  onSave: (data: any) => void;
  onPrevious: () => void;
}

const CoverDetailsStep: React.FC<CoverDetailsStepProps> = ({ data, onSave, onPrevious }) => {
  const [insuranceType, setInsuranceType] = useState(data.coverDetails?.insuranceType || '');
  const [insuranceClass, setInsuranceClass] = useState(data.coverDetails?.insuranceClass || '');
  const [sumInsured, setSumInsured] = useState(data.coverDetails?.sumInsured || '');
  const [premiumRate, setPremiumRate] = useState(data.coverDetails?.premiumRate || '');
  const [selectedAddOns, setSelectedAddOns] = useState(data.coverDetails?.selectedAddOns || []);
  const [netPremium, setNetPremium] = useState(0);
  const [addOnPremium, setAddOnPremium] = useState(0);
  const [commission, setCommission] = useState(0);
  const [vat, setVat] = useState(0);
  const [totalPremium, setTotalPremium] = useState(0);
  const [terms, setTerms] = useState(data.coverDetails?.terms || '');

  const insuranceTypes = [
    { value: "comprehensive", label: "Comprehensive", description: "Full coverage including theft, fire, and third party" },
    { value: "third_party", label: "Third Party", description: "Basic legal requirement coverage" },
    { value: "third_party_fire_theft", label: "Third Party Fire & Theft", description: "Third party plus fire and theft protection" }
  ];

  const insuranceClasses = [
    { value: "class_a", label: "Class A - Private Cars", rate: 3.5 },
    { value: "class_b", label: "Class B - Commercial Vehicles", rate: 4.5 },
    { value: "class_c", label: "Class C - Motorcycles", rate: 5.0 },
    { value: "class_d", label: "Class D - Heavy Duty Vehicles", rate: 6.0 }
  ];

  const availableAddOns = [
    { id: 'roadside', name: 'Roadside Assistance', premium: 150000, description: '24/7 roadside support and towing' },
    { id: 'windscreen', name: 'Windscreen Protection', premium: 200000, description: 'Full windscreen replacement coverage' },
    { id: 'keycare', name: 'Key Care', premium: 100000, description: 'Lost or stolen key replacement' },
    { id: 'legal', name: 'Legal Protection', premium: 120000, description: 'Legal expenses coverage' },
    { id: 'breakdown', name: 'Breakdown Cover', premium: 180000, description: 'Emergency breakdown assistance' },
    { id: 'personal_accident', name: 'Personal Accident', premium: 250000, description: 'Personal injury coverage for driver and passengers' }
  ];

  // Auto-set premium rate when insurance class changes
  useEffect(() => {
    const selectedClass = insuranceClasses.find(cls => cls.value === insuranceClass);
    if (selectedClass) {
      setPremiumRate(selectedClass.rate.toString());
    }
  }, [insuranceClass]);

  // Calculate premiums when values change
  useEffect(() => {
    const sumInsuredNum = parseFloat(sumInsured) || 0;
    const premiumRateNum = parseFloat(premiumRate) || 0;

    const calculatedNetPremium = (sumInsuredNum * premiumRateNum) / 100;
    const calculatedAddOnPremium = selectedAddOns.reduce((total, addOnId) => {
      const addOn = availableAddOns.find(a => a.id === addOnId);
      return total + (addOn ? addOn.premium : 0);
    }, 0);
    const calculatedCommission = calculatedNetPremium * 0.15; // 15% commission
    const calculatedVat = (calculatedNetPremium + calculatedAddOnPremium) * 0.18; // 18% VAT
    const calculatedTotal = calculatedNetPremium + calculatedAddOnPremium + calculatedVat;

    setNetPremium(calculatedNetPremium);
    setAddOnPremium(calculatedAddOnPremium);
    setCommission(calculatedCommission);
    setVat(calculatedVat);
    setTotalPremium(calculatedTotal);
  }, [sumInsured, premiumRate, selectedAddOns]);

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleSave = () => {
    const coverDetails = {
      insuranceType,
      insuranceClass,
      sumInsured: parseFloat(sumInsured),
      premiumRate: parseFloat(premiumRate),
      selectedAddOns,
      netPremium,
      addOnPremium,
      commission,
      vat,
      totalPremium,
      terms
    };
    onSave({ coverDetails });
  };

  const isFormValid = insuranceType && insuranceClass && sumInsured && premiumRate;
  const currency = data.clientDetails?.currency || 'USD';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Cover Details</h3>
        <p className="text-gray-600">Configure insurance coverage and calculate premiums</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Insurance Configuration */}
        <div className="space-y-6">
          {/* Insurance Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Insurance Configuration</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Type *
                </label>
                <div className="space-y-2">
                  {insuranceTypes.map((type) => (
                    <label key={type.value} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="insuranceType"
                        value={type.value}
                        checked={insuranceType === type.value}
                        onChange={(e) => setInsuranceType(e.target.value)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{type.label}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Insurance Class *
                </label>
                <select
                  value={insuranceClass}
                  onChange={(e) => setInsuranceClass(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select insurance class</option>
                  {insuranceClasses.map((cls) => (
                    <option key={cls.value} value={cls.value}>
                      {cls.label} ({cls.rate}%)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sum Insured ({currency}) *
                  </label>
                  <input
                    type="number"
                    value={sumInsured}
                    onChange={(e) => setSumInsured(e.target.value)}
                    placeholder="Enter sum insured"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Premium Rate (%) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={premiumRate}
                    onChange={(e) => setPremiumRate(e.target.value)}
                    placeholder="Auto-filled"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Plus className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Add-ons</h4>
            </div>
            
            <div className="space-y-3">
              {availableAddOns.map((addOn) => (
                <label key={addOn.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedAddOns.includes(addOn.id)}
                    onChange={() => handleAddOnToggle(addOn.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">{addOn.name}</div>
                        <div className="text-sm text-gray-600">{addOn.description}</div>
                      </div>
                      <div className="text-sm font-medium text-blue-600">
                        +{currency} {addOn.premium}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Premium Calculation & Terms */}
        <div className="space-y-6">
          {/* Premium Calculation */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Calculator className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Premium Calculation</h4>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Net Premium Amount:</span>
                  <span className="font-semibold text-gray-900">{currency} {netPremium.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Add-on Premium:</span>
                  <span className="font-semibold text-gray-900">{currency} {addOnPremium.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Commission (15%):</span>
                  <span className="font-semibold text-green-600">{currency} {commission.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">VAT (18%):</span>
                  <span className="font-semibold text-gray-900">{currency} {vat.toFixed(2)}</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-gray-900">Total Premium:</span>
                  <span className="font-bold text-blue-600">{currency} {totalPremium.toFixed(2)}</span>
                </div>
              </div>

              {/* Calculation Breakdown */}
              <div className="text-xs text-gray-500 space-y-1">
                <div>• Net Premium = Sum Insured × Premium Rate</div>
                <div>• Commission = Net Premium × 15%</div>
                <div>• VAT = (Net Premium + Add-on Premium) × 18%</div>
                <div>• Total = Net Premium + Add-on Premium + VAT</div>
              </div>
            </div>
          </div>

          {/* Terms & Clauses */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Terms & Clauses</h4>
            </div>
            
            <textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              placeholder="Enter terms and conditions, special clauses, or additional notes..."
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          onClick={onPrevious}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Previous Step
        </button>
        <button
          onClick={handleSave}
          disabled={!isFormValid}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Save Quote
        </button>
      </div>
    </div>
  );
};

export default CoverDetailsStep;
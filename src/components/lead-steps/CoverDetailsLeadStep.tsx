import React, { useState } from 'react';
import { Shield, Building2, FileText, DollarSign } from 'lucide-react';

interface CoverDetailsLeadStepProps {
  data: any;
  onNext: (data: any) => void;
  onPrevious: () => void;
}

const CoverDetailsLeadStep: React.FC<CoverDetailsLeadStepProps> = ({ data, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    leadBy: data.coverDetails?.leadBy || '',
    companyType: data.coverDetails?.companyType || '',
    referralCode: data.coverDetails?.referralCode || '',
    referralName: data.coverDetails?.referralName || '',
    broker: data.coverDetails?.broker || '',
    insurer: data.coverDetails?.insurer || '',
    quoteNumber: data.coverDetails?.quoteNumber || '',
    controlNumber: data.coverDetails?.controlNumber || '',
    insuranceType: data.coverDetails?.insuranceType || '',
    insuranceClass: data.coverDetails?.insuranceClass || '',
    branch: data.coverDetails?.branch || ''
  });

  const companyTypes = [
    { value: 'broker', label: 'Broker' },
    { value: 'agent', label: 'Agent' },
    { value: 'direct', label: 'Direct' },
    { value: 'bancassurance', label: 'Bancassurance' }
  ];

  const insurers = [
    { value: 'nic', label: 'National Insurance Corporation' },
    { value: 'jubilee', label: 'Jubilee Insurance' },
    { value: 'aar', label: 'AAR Insurance' },
    { value: 'strategis', label: 'Strategis Insurance' },
    { value: 'heritage', label: 'Heritage Insurance' },
    { value: 'allianz', label: 'Allianz Insurance' },
    { value: 'metlife', label: 'MetLife Insurance' }
  ];

  const insuranceTypes = [
    { value: 'motor', label: 'Motor Insurance' },
    { value: 'property', label: 'Property Insurance' },
    { value: 'liability', label: 'Liability Insurance' },
    { value: 'marine', label: 'Marine Insurance' },
    { value: 'life', label: 'Life Insurance' }
  ];

  const insuranceClasses = [
    { value: 'comprehensive', label: 'Comprehensive' },
    { value: 'third_party', label: 'Third Party' },
    { value: 'fire_theft', label: 'Fire & Theft' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    const coverDetails = { ...formData };
    onNext({ coverDetails });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Cover Details</h3>
        <p className="text-gray-600">Configure insurance coverage and broker information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company & Broker Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Building2 className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Company & Broker Information</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lead By (Company Name)
              </label>
              <input
                type="text"
                name="leadBy"
                value={formData.leadBy}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Type
              </label>
              <select
                name="companyType"
                value={formData.companyType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Type</option>
                {companyTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Referral Code
                </label>
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Referral Name
                </label>
                <input
                  type="text"
                  name="referralName"
                  value={formData.referralName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Broker
              </label>
              <input
                type="text"
                name="broker"
                value={formData.broker}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter broker name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch
              </label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter branch name"
              />
            </div>
          </div>
        </div>

        {/* Insurance Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Insurance Information</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurer
              </label>
              <select
                name="insurer"
                value={formData.insurer}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Insurer</option>
                {insurers.map((insurer) => (
                  <option key={insurer.value} value={insurer.value}>{insurer.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Type
              </label>
              <select
                name="insuranceType"
                value={formData.insuranceType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Type</option>
                {insuranceTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Class
              </label>
              <select
                name="insuranceClass"
                value={formData.insuranceClass}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Class</option>
                {insuranceClasses.map((cls) => (
                  <option key={cls.value} value={cls.value}>{cls.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quote Number
              </label>
              <input
                type="text"
                name="quoteNumber"
                value={formData.quoteNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter quote number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Control Number
              </label>
              <input
                type="text"
                name="controlNumber"
                value={formData.controlNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter control number"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      {(formData.insurer || formData.insuranceType || formData.insuranceClass) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-blue-600" />
            <div>
              <h5 className="font-medium text-blue-900">Insurance Summary</h5>
              <div className="text-sm text-blue-700 mt-1">
                {formData.insurer && <span>Insurer: {insurers.find(i => i.value === formData.insurer)?.label}</span>}
                {formData.insuranceType && formData.insurer && <span> | </span>}
                {formData.insuranceType && <span>Type: {insuranceTypes.find(t => t.value === formData.insuranceType)?.label}</span>}
                {formData.insuranceClass && (formData.insurer || formData.insuranceType) && <span> | </span>}
                {formData.insuranceClass && <span>Class: {insuranceClasses.find(c => c.value === formData.insuranceClass)?.label}</span>}
              </div>
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
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default CoverDetailsLeadStep;
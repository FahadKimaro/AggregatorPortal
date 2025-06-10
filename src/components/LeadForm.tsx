import React, { useState } from 'react';
import { X, User, Car, Shield, TrendingUp, MessageSquare } from 'lucide-react';

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (leadData: any) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    // Lead Details
    leadName: '',
    mobile: '',
    emailId: '',
    leadStatus: '',
    leadChannel: '',
    
    // Vehicle Details
    registrationNumber: '',
    chassis: '',
    expiryDate: '',
    vehicleStatus: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleModelNumber: '',
    bodyType: '',
    vehicleColor: '',
    engine: '',
    engineSize: '',
    fuelUsed: '',
    noOfAxles: '',
    axleDistance: '',
    tareWeight: '',
    grossWeight: '',
    motorUsage: '',
    ownerCategory: '',
    motorCategory: '',
    seats: '',
    manufactureYear: '',
    customerName: '',
    
    // Cover Details
    leadBy: '',
    companyType: '',
    referralCode: '',
    referralName: '',
    broker: '',
    insurer: '',
    quoteNumber: '',
    controlNumber: '',
    insuranceType: '',
    insuranceClass: '',
    branch: '',
    
    // Marketing Details
    marketingSource: '',
    campaignName: '',
    marketingNotes: '',
    
    // Feedback Details
    feedbackStatus: '',
    feedbackNotes: '',
    followUpDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      leadName: '',
      mobile: '',
      emailId: '',
      leadStatus: '',
      leadChannel: '',
      registrationNumber: '',
      chassis: '',
      expiryDate: '',
      vehicleStatus: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleModelNumber: '',
      bodyType: '',
      vehicleColor: '',
      engine: '',
      engineSize: '',
      fuelUsed: '',
      noOfAxles: '',
      axleDistance: '',
      tareWeight: '',
      grossWeight: '',
      motorUsage: '',
      ownerCategory: '',
      motorCategory: '',
      seats: '',
      manufactureYear: '',
      customerName: '',
      leadBy: '',
      companyType: '',
      referralCode: '',
      referralName: '',
      broker: '',
      insurer: '',
      quoteNumber: '',
      controlNumber: '',
      insuranceType: '',
      insuranceClass: '',
      branch: '',
      marketingSource: '',
      campaignName: '',
      marketingNotes: '',
      feedbackStatus: '',
      feedbackNotes: '',
      followUpDate: ''
    });
  };

  if (!isOpen) return null;

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
            <h3 className="text-2xl font-bold text-gray-900">Add New Lead</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Lead Details Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Lead Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lead Name *
                  </label>
                  <input
                    type="text"
                    name="leadName"
                    value={formData.leadName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter lead name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter mobile number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lead Status
                  </label>
                  <select
                    name="leadStatus"
                    value={formData.leadStatus}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lead Channel
                  </label>
                  <select
                    name="leadChannel"
                    value={formData.leadChannel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Channel</option>
                    <option value="website">Website</option>
                    <option value="referral">Referral</option>
                    <option value="social_media">Social Media</option>
                    <option value="phone_call">Phone Call</option>
                    <option value="walk_in">Walk In</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Vehicle Details Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Car className="h-5 w-5 mr-2 text-blue-600" />
                Vehicle Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter registration number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chassis
                  </label>
                  <input
                    type="text"
                    name="chassis"
                    value={formData.chassis}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter chassis number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Status
                  </label>
                  <select
                    name="vehicleStatus"
                    value={formData.vehicleStatus}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Status</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="refurbished">Refurbished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Make
                  </label>
                  <input
                    type="text"
                    name="vehicleMake"
                    value={formData.vehicleMake}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Toyota, Honda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Model
                  </label>
                  <input
                    type="text"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Camry, Civic"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Model Number
                  </label>
                  <input
                    type="text"
                    name="vehicleModelNumber"
                    value={formData.vehicleModelNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter model number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Body Type
                  </label>
                  <select
                    name="bodyType"
                    value={formData.bodyType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Body Type</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="truck">Truck</option>
                    <option value="van">Van</option>
                    <option value="coupe">Coupe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Color
                  </label>
                  <input
                    type="text"
                    name="vehicleColor"
                    value={formData.vehicleColor}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter vehicle color"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Engine
                  </label>
                  <input
                    type="text"
                    name="engine"
                    value={formData.engine}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter engine type"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Engine Size
                  </label>
                  <input
                    type="text"
                    name="engineSize"
                    value={formData.engineSize}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2.0L, 1500cc"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fuel Used
                  </label>
                  <select
                    name="fuelUsed"
                    value={formData.fuelUsed}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="electric">Electric</option>
                    <option value="lpg">LPG</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    No Of Axles
                  </label>
                  <input
                    type="number"
                    name="noOfAxles"
                    value={formData.noOfAxles}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter number of axles"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Axle Distance
                  </label>
                  <input
                    type="text"
                    name="axleDistance"
                    value={formData.axleDistance}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter axle distance"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tare Weight
                  </label>
                  <input
                    type="text"
                    name="tareWeight"
                    value={formData.tareWeight}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter tare weight (kg)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gross Weight
                  </label>
                  <input
                    type="text"
                    name="grossWeight"
                    value={formData.grossWeight}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter gross weight (kg)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Motor Usage
                  </label>
                  <select
                    name="motorUsage"
                    value={formData.motorUsage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Usage</option>
                    <option value="private">Private</option>
                    <option value="commercial">Commercial</option>
                    <option value="taxi">Taxi</option>
                    <option value="rental">Rental</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Category
                  </label>
                  <select
                    name="ownerCategory"
                    value={formData.ownerCategory}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="individual">Individual</option>
                    <option value="corporate">Corporate</option>
                    <option value="government">Government</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Motor Category
                  </label>
                  <select
                    name="motorCategory"
                    value={formData.motorCategory}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="car">Car</option>
                    <option value="truck">Truck</option>
                    <option value="bus">Bus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seats
                  </label>
                  <input
                    type="number"
                    name="seats"
                    value={formData.seats}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Number of seats"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manufacture Year
                  </label>
                  <input
                    type="number"
                    name="manufactureYear"
                    value={formData.manufactureYear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2023"
                    min="1900"
                    max="2030"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter customer name"
                  />
                </div>
              </div>
            </div>

            {/* Cover Details Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Cover Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <option value="broker">Broker</option>
                    <option value="agent">Agent</option>
                    <option value="direct">Direct</option>
                    <option value="bancassurance">Bancassurance</option>
                  </select>
                </div>

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
                    placeholder="Enter referral code"
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
                    placeholder="Enter referral name"
                  />
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
                    Insurer
                  </label>
                  <select
                    name="insurer"
                    value={formData.insurer}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Insurer</option>
                    <option value="nic">National Insurance Corporation</option>
                    <option value="jubilee">Jubilee Insurance</option>
                    <option value="aar">AAR Insurance</option>
                    <option value="strategis">Strategis Insurance</option>
                    <option value="heritage">Heritage Insurance</option>
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
                    <option value="motor">Motor Insurance</option>
                    <option value="property">Property Insurance</option>
                    <option value="liability">Liability Insurance</option>
                    <option value="marine">Marine Insurance</option>
                    <option value="life">Life Insurance</option>
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
                    <option value="comprehensive">Comprehensive</option>
                    <option value="third_party">Third Party</option>
                    <option value="fire_theft">Fire & Theft</option>
                  </select>
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

            {/* Marketing Details Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Marketing Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marketing Source
                  </label>
                  <select
                    name="marketingSource"
                    value={formData.marketingSource}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Source</option>
                    <option value="google_ads">Google Ads</option>
                    <option value="facebook_ads">Facebook Ads</option>
                    <option value="email_campaign">Email Campaign</option>
                    <option value="sms_campaign">SMS Campaign</option>
                    <option value="print_media">Print Media</option>
                    <option value="radio">Radio</option>
                    <option value="tv">Television</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    name="campaignName"
                    value={formData.campaignName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter campaign name"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marketing Notes
                  </label>
                  <textarea
                    name="marketingNotes"
                    value={formData.marketingNotes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter marketing notes"
                  />
                </div>
              </div>
            </div>

            {/* Feedback Details Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                Feedback Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback Status
                  </label>
                  <select
                    name="feedbackStatus"
                    value={formData.feedbackStatus}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Status</option>
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negative</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Follow Up Date
                  </label>
                  <input
                    type="date"
                    name="followUpDate"
                    value={formData.followUpDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback Notes
                  </label>
                  <textarea
                    name="feedbackNotes"
                    value={formData.feedbackNotes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter feedback notes"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Lead
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
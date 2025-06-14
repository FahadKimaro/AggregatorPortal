import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import LeadDetailsStep from './lead-steps/LeadDetailsStep';
import VehicleDetailsLeadStep from './lead-steps/VehicleDetailsLeadStep';
import CoverDetailsLeadStep from './lead-steps/CoverDetailsLeadStep';
import MarketingFeedbackStep from './lead-steps/MarketingFeedbackStep';

interface LeadData {
  leadDetails?: any;
  vehicleDetails?: any;
  coverDetails?: any;
  marketingFeedback?: any;
}

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (leadData: LeadData) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [leadData, setLeadData] = useState<LeadData>({});

  const steps = [
    { id: 1, title: "Lead Details", component: LeadDetailsStep },
    { id: 2, title: "Vehicle Details", component: VehicleDetailsLeadStep },
    { id: 3, title: "Cover Details", component: CoverDetailsLeadStep },
    { id: 4, title: "Marketing & Feedback", component: MarketingFeedbackStep }
  ];

  const handleNext = (stepData: any) => {
    setLeadData(prev => ({ ...prev, ...stepData }));
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = (finalData: any) => {
    const completeLead = { ...leadData, ...finalData };
    onSubmit(completeLead);
    onClose();
    // Reset form
    setCurrentStep(1);
    setLeadData({});
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

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
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Add New Lead</h3>
              <div className="flex items-center mt-2">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  Step {currentStep} of {steps.length}
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  {steps[currentStep - 1].title}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.id}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep >= step.id ? 'text-blue-600 font-medium' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <ChevronRight className="h-4 w-4 mx-4 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Step Content */}
          <CurrentStepComponent 
            data={leadData}
            onNext={handleNext}
            onPrevious={currentStep > 1 ? handlePrevious : undefined}
            onSave={currentStep === steps.length ? handleSave : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
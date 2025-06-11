import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import ProductSelection from './quote-steps/ProductSelection';
import VehicleDetailsStep from './quote-steps/VehicleDetailsStep';
import ClientPolicyDetails from './quote-steps/ClientPolicyDetails';
import CoverDetailsStep from './quote-steps/CoverDetailsStep';

interface QuoteData {
  product?: string;
  registrationNumber?: string;
  vehicleDetails?: any;
  clientDetails?: any;
  coverDetails?: any;
}

interface QuotationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (quoteData: QuoteData) => void;
}

const QuotationForm: React.FC<QuotationFormProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [quoteData, setQuoteData] = useState<QuoteData>({});

  const steps = [
    { id: 1, title: "Product Selection", component: ProductSelection },
    { id: 2, title: "Vehicle Details", component: VehicleDetailsStep },
    { id: 3, title: "Client & Policy Details", component: ClientPolicyDetails },
    { id: 4, title: "Cover Details", component: CoverDetailsStep }
  ];

  const handleNext = (stepData: any) => {
    setQuoteData(prev => ({ ...prev, ...stepData }));
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
    const completeQuote = { ...quoteData, ...finalData };
    onComplete(completeQuote);
    onClose();
    // Reset form
    setCurrentStep(1);
    setQuoteData({});
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
              <h3 className="text-2xl font-bold text-gray-900">Create New Quote</h3>
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
            data={quoteData}
            onNext={handleNext}
            onPrevious={currentStep > 1 ? handlePrevious : undefined}
            onSave={currentStep === steps.length ? handleSave : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default QuotationForm;
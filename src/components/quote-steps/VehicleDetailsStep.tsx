import React, { useState } from 'react';
import { Search, CheckCircle, Car, AlertCircle } from 'lucide-react';

interface VehicleDetailsStepProps {
  data: any;
  onNext: (data: any) => void;
  onPrevious: () => void;
}

const VehicleDetailsStep: React.FC<VehicleDetailsStepProps> = ({ data, onNext, onPrevious }) => {
  const [registrationNumber, setRegistrationNumber] = useState(data.registrationNumber || '');
  const [vehicleDetails, setVehicleDetails] = useState(data.vehicleDetails || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchVehicleDetails = async () => {
    if (!registrationNumber) {
      setError('Please enter a registration number');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call with mock data
    setTimeout(() => {
      const mockVehicleDetails = {
        chassisNumber: "JHM7654321234567",
        expiryDate: "2025-03-15",
        vehicleStatus: "Active",
        vehicleMake: "Toyota",
        vehicleModel: "Camry",
        modelNumber: "XV70",
        bodyType: "Sedan",
        vehicleColor: "Silver",
        engineNumber: "2GR-FE123456",
        engineSize: "3.5L V6",
        fuelType: "Petrol",
        numberOfAxles: "2",
        axleDistance: "2.82m",
        tareWeight: "1,590 kg",
        grossWeight: "2,100 kg",
        motorUsage: "Private",
        ownerCategory: "Individual",
        motorCategory: "Passenger Car",
        numberOfSeats: "5",
        manufactureYear: "2022",
        ownerName: "John Doe"
      };

      setVehicleDetails(mockVehicleDetails);
      setIsLoading(false);
    }, 2000);
  };

  const handleNext = () => {
    if (vehicleDetails) {
      onNext({ 
        registrationNumber,
        vehicleDetails 
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Vehicle Details</h3>
        <p className="text-gray-600">Enter the vehicle registration number to fetch comprehensive vehicle information</p>
      </div>

      {/* Registration Input */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Car className="h-5 w-5 text-blue-600" />
          <h4 className="font-semibold text-gray-900">Vehicle Registration</h4>
        </div>
        
        <div className="flex space-x-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter registration number (e.g., MC706EVK)"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase font-mono text-lg"
            />
            {error && (
              <div className="flex items-center mt-2 text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>
          <button
            onClick={fetchVehicleDetails}
            disabled={!registrationNumber || isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            <span>{isLoading ? 'Fetching...' : 'Fetch Details'}</span>
          </button>
        </div>
      </div>

      {/* Vehicle Details Display */}
      {vehicleDetails && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h4 className="font-semibold text-green-800">Vehicle Details Retrieved Successfully</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h5 className="font-medium text-gray-900 border-b border-gray-200 pb-1">Basic Information</h5>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium text-gray-700">Owner Name:</span> <span className="text-gray-900">{vehicleDetails.ownerName}</span></div>
                <div><span className="font-medium text-gray-700">Chassis Number:</span> <span className="text-gray-900">{vehicleDetails.chassisNumber}</span></div>
                <div><span className="font-medium text-gray-700">Expiry Date:</span> <span className="text-gray-900">{vehicleDetails.expiryDate}</span></div>
                <div><span className="font-medium text-gray-700">Status:</span> <span className="text-green-600 font-medium">{vehicleDetails.vehicleStatus}</span></div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-medium text-gray-900 border-b border-gray-200 pb-1">Vehicle Specifications</h5>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium text-gray-700">Make:</span> <span className="text-gray-900">{vehicleDetails.vehicleMake}</span></div>
                <div><span className="font-medium text-gray-700">Model:</span> <span className="text-gray-900">{vehicleDetails.vehicleModel}</span></div>
                <div><span className="font-medium text-gray-700">Model Number:</span> <span className="text-gray-900">{vehicleDetails.modelNumber}</span></div>
                <div><span className="font-medium text-gray-700">Body Type:</span> <span className="text-gray-900">{vehicleDetails.bodyType}</span></div>
                <div><span className="font-medium text-gray-700">Color:</span> <span className="text-gray-900">{vehicleDetails.vehicleColor}</span></div>
                <div><span className="font-medium text-gray-700">Year:</span> <span className="text-gray-900">{vehicleDetails.manufactureYear}</span></div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-medium text-gray-900 border-b border-gray-200 pb-1">Technical Details</h5>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium text-gray-700">Engine:</span> <span className="text-gray-900">{vehicleDetails.engineNumber}</span></div>
                <div><span className="font-medium text-gray-700">Engine Size:</span> <span className="text-gray-900">{vehicleDetails.engineSize}</span></div>
                <div><span className="font-medium text-gray-700">Fuel Type:</span> <span className="text-gray-900">{vehicleDetails.fuelType}</span></div>
                <div><span className="font-medium text-gray-700">Seats:</span> <span className="text-gray-900">{vehicleDetails.numberOfSeats}</span></div>
                <div><span className="font-medium text-gray-700">Axles:</span> <span className="text-gray-900">{vehicleDetails.numberOfAxles}</span></div>
                <div><span className="font-medium text-gray-700">Axle Distance:</span> <span className="text-gray-900">{vehicleDetails.axleDistance}</span></div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-medium text-gray-900 border-b border-gray-200 pb-1">Weight & Usage</h5>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium text-gray-700">Tare Weight:</span> <span className="text-gray-900">{vehicleDetails.tareWeight}</span></div>
                <div><span className="font-medium text-gray-700">Gross Weight:</span> <span className="text-gray-900">{vehicleDetails.grossWeight}</span></div>
                <div><span className="font-medium text-gray-700">Usage:</span> <span className="text-gray-900">{vehicleDetails.motorUsage}</span></div>
                <div><span className="font-medium text-gray-700">Owner Category:</span> <span className="text-gray-900">{vehicleDetails.ownerCategory}</span></div>
                <div><span className="font-medium text-gray-700">Motor Category:</span> <span className="text-gray-900">{vehicleDetails.motorCategory}</span></div>
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
          disabled={!vehicleDetails}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default VehicleDetailsStep;
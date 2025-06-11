import React, { useState } from 'react';
import { Car, Home, Briefcase, Heart, Shield } from 'lucide-react';

interface ProductSelectionProps {
  data: any;
  onNext: (data: any) => void;
}

const ProductSelection: React.FC<ProductSelectionProps> = ({ data, onNext }) => {
  const [selectedProduct, setSelectedProduct] = useState(data.product || '');

  const products = [
    {
      id: 'motor',
      title: 'Motor Insurance',
      description: 'Comprehensive coverage for vehicles including cars, motorcycles, and commercial vehicles',
      icon: Car,
      available: true,
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      id: 'property',
      title: 'Property Insurance',
      description: 'Protection for residential and commercial properties against fire, theft, and natural disasters',
      icon: Home,
      available: false,
      color: 'bg-green-50 border-green-200 text-green-700'
    },
    {
      id: 'liability',
      title: 'General Liability',
      description: 'Coverage for business operations, professional liability, and third-party claims',
      icon: Briefcase,
      available: false,
      color: 'bg-purple-50 border-purple-200 text-purple-700'
    },
    {
      id: 'marine',
      title: 'Marine Insurance',
      description: 'Protection for cargo, vessels, and marine transportation risks',
      icon: Shield,
      available: false,
      color: 'bg-teal-50 border-teal-200 text-teal-700'
    },
    {
      id: 'life',
      title: 'Life Insurance',
      description: 'Life coverage, health benefits, and family protection plans',
      icon: Heart,
      available: false,
      color: 'bg-red-50 border-red-200 text-red-700'
    }
  ];

  const handleNext = () => {
    if (selectedProduct) {
      onNext({ product: selectedProduct });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Insurance Product</h3>
        <p className="text-gray-600">Choose the type of insurance you want to create a quote for</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          const Icon = product.icon;
          return (
            <div
              key={product.id}
              className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedProduct === product.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-500' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              } ${!product.available ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => product.available && setSelectedProduct(product.id)}
            >
              {!product.available && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-600">
                    Coming Soon
                  </span>
                </div>
              )}
              
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  selectedProduct === product.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    selectedProduct === product.id ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <h4 className="font-semibold text-gray-900">{product.title}</h4>
              </div>
              
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
              
              {selectedProduct === product.id && (
                <div className="mt-4 flex items-center text-blue-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Selected</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={handleNext}
          disabled={!selectedProduct || selectedProduct !== 'motor'}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default ProductSelection;
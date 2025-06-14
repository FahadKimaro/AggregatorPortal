import React, { useState } from 'react';
import { TrendingUp, MessageSquare, Calendar, Save } from 'lucide-react';

interface MarketingFeedbackStepProps {
  data: any;
  onSave: (data: any) => void;
  onPrevious: () => void;
}

const MarketingFeedbackStep: React.FC<MarketingFeedbackStepProps> = ({ data, onSave, onPrevious }) => {
  const [formData, setFormData] = useState({
    marketingSource: data.marketingFeedback?.marketingSource || '',
    campaignName: data.marketingFeedback?.campaignName || '',
    marketingNotes: data.marketingFeedback?.marketingNotes || '',
    feedbackStatus: data.marketingFeedback?.feedbackStatus || '',
    feedbackNotes: data.marketingFeedback?.feedbackNotes || '',
    followUpDate: data.marketingFeedback?.followUpDate || ''
  });

  const marketingSources = [
    { value: 'google_ads', label: 'Google Ads' },
    { value: 'facebook_ads', label: 'Facebook Ads' },
    { value: 'email_campaign', label: 'Email Campaign' },
    { value: 'sms_campaign', label: 'SMS Campaign' },
    { value: 'print_media', label: 'Print Media' },
    { value: 'radio', label: 'Radio' },
    { value: 'tv', label: 'Television' },
    { value: 'referral', label: 'Referral' },
    { value: 'direct', label: 'Direct Contact' }
  ];

  const feedbackStatuses = [
    { value: 'positive', label: 'Positive' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'negative', label: 'Negative' },
    { value: 'pending', label: 'Pending' },
    { value: 'interested', label: 'Interested' },
    { value: 'not_interested', label: 'Not Interested' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const marketingFeedback = { ...formData };
    onSave({ marketingFeedback });
  };

  // Auto-set follow-up date to 7 days from now if not set
  const getDefaultFollowUpDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Marketing & Feedback</h3>
        <p className="text-gray-600">Track marketing sources and capture feedback for follow-up</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Marketing Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Marketing Details</h4>
          </div>
          
          <div className="space-y-4">
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
                {marketingSources.map((source) => (
                  <option key={source.value} value={source.value}>{source.label}</option>
                ))}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marketing Notes
              </label>
              <textarea
                name="marketingNotes"
                value={formData.marketingNotes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter marketing notes, campaign details, or source information..."
              />
            </div>
          </div>
        </div>

        {/* Feedback Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Feedback & Follow-up</h4>
          </div>
          
          <div className="space-y-4">
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
                {feedbackStatuses.map((status) => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Follow Up Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  name="followUpDate"
                  value={formData.followUpDate || getDefaultFollowUpDate()}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Default set to 7 days from today</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feedback Notes
              </label>
              <textarea
                name="feedbackNotes"
                value={formData.feedbackNotes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter feedback notes, client concerns, interests, or follow-up actions..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="font-semibold text-green-900 mb-3">Lead Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-green-800">Lead:</span>
            <div className="text-green-700">
              {data.leadDetails?.leadName || 'Not specified'}
              {data.leadDetails?.customerName && (
                <div className="text-xs">Company: {data.leadDetails.customerName}</div>
              )}
            </div>
          </div>
          <div>
            <span className="font-medium text-green-800">Vehicle:</span>
            <div className="text-green-700">
              {data.vehicleDetails?.registrationNumber || 'Not specified'}
              {data.vehicleDetails?.vehicleMake && data.vehicleDetails?.vehicleModel && (
                <div className="text-xs">{data.vehicleDetails.vehicleMake} {data.vehicleDetails.vehicleModel}</div>
              )}
            </div>
          </div>
          <div>
            <span className="font-medium text-green-800">Insurance:</span>
            <div className="text-green-700">
              {data.coverDetails?.insuranceType || 'Not specified'}
              {data.coverDetails?.insurer && (
                <div className="text-xs">Insurer: {data.coverDetails.insurer}</div>
              )}
            </div>
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
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Save Lead</span>
        </button>
      </div>
    </div>
  );
};

export default MarketingFeedbackStep;
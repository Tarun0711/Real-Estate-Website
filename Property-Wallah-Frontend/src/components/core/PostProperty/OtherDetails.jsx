import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { resetStep, saveFormData, resetForm, incrementStep } from '../../../Redux/FormDataSlice.js';
import { createProperty } from '../../../Services/Operations/PropertyServices.js';
import toast from 'react-hot-toast';

export default function OtherDetails() {
  const navigate = useNavigate();
  const formData = useSelector((state) => state.formData);
  const dispatch = useDispatch();

  const [features, setFeatures] = useState({
    feature1: 'East Facing',
    feature2: 'Close to Metro Station',
    feature3: 'Fresh Construction',
    feature4: 'Gated Society'
  });

  const featureOptions = [
    'East Facing', 
    'North Facing',
    'South Facing',
    'North-East Facing',
    'Fresh Construction',
    'Gated Society',
    'Corner Property',
    'Overlook Park/Garden',
    'Close to Metro Station'
  ];

  const handleFeatureChange = (featureKey, value) => {
    setFeatures(prev => ({
      ...prev,
      [featureKey]: value
    }));
  };

  const getFilteredOptions = (currentFeature) => {
    return featureOptions.filter(option => !Object.values(features).includes(option) || option === currentFeature);
  };

  const handleSkip = () => {
    dispatch(incrementStep());
  };

  const handleConfirm = () => {
    dispatch(saveFormData({ features }));
    dispatch(resetStep());
    toast.success('Property posted successfully');
    navigate('/');
    dispatch(createProperty(formData));
    dispatch(resetForm());
  };

  const handleCancel = () => {
    dispatch(resetForm());
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://www.99acres.com/universalapp/img/AboutMyProperty2.png" 
                alt="Property Features" 
                className="w-10 h-10"
              />
              <h2 className="text-xl font-semibold text-gray-900">
                Tell us the TOP 4 unique property features*
              </h2>
            </div>
            <button onClick={handleSkip} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div className="space-y-6">
              <p className="text-sm text-gray-600">Top 4 USP's</p>
              <div className="space-y-4">
                {Object.values(features).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              <p className="text-sm text-gray-600">
                We have shown the best 4 here. You can either change or confirm to post the Property
              </p>
              
              {/* Feature Selects */}
              {Object.keys(features).map((featureKey, index) => (
                <div key={featureKey} className="space-y-2">
                  <label className="text-sm text-gray-600">Feature {index + 1}</label>
                  <select
                    value={features[featureKey]}
                    onChange={(e) => handleFeatureChange(featureKey, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {getFilteredOptions(features[featureKey]).map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={handleSkip}
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
            >
              Skip to Post
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Confirm & Post Property
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


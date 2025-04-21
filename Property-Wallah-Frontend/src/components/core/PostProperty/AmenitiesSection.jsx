import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { incrementStep, saveFormData, resetForm } from '../../../Redux/FormDataSlice.js';
import StepsCounter from './StepsCounter';

// Reusable FeatureButton component
const FeatureButton = ({ feature, category, formData, handleFeatureClick }) => (
  <button
    type="button"
    key={feature}
    onClick={() => handleFeatureClick(category, feature)}
    className={`px-4 py-2 rounded-full text-sm border transition-colors ${
      formData[category].includes(feature)
        ? 'border-blue-600 bg-blue-50 text-blue-600'
        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
    }`}
  >
    {feature}
  </button>
);

FeatureButton.propTypes = {
  feature: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
  handleFeatureClick: PropTypes.func.isRequired,
};

export default function AmenitiesSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [propertyScore, setPropertyScore] = useState(75);
  const [currentStep, setCurrentStep] = useState(5);
  
  const [formData, setFormData] = useState({
    propertyFeatures: [],
    societyFeatures: [],
    waterSource: [],
    overlooking: [],
    otherFeatures: [],
    powerBackup: '',
    parking: '',
    additionalRooms:[],
    
  });


  // Property Features options
  const propertyFeatures = [
    'Water Purifier',
    'Private Garden',
    'Natural Light',
    'Airy Room',
    'Spacious Interior'
  ];


  // Society Building Features options
  const societyFeatures = [
    'Separate entry for servant room',
    'Waste Disposal',
    'Low Density Society',
    'Rain Water Harvesting'
  ];

  // Water Source options
  const waterSourceOptions = [
    'Municipal corporations',
    'Borewell/Tank',
    '24*7 water'
  ];

  // Overlooking options
  const overlookingOptions = [
    'Pool',
    'Park/Garden',
    'Club',
    'Main Road',
    'Playground',
    'Swimming Pool',
    'GYM',
    'Indoor Games',
    'Elevator',
  ];

  // Other Features options
  const otherFeatures = [
    'In a gated society',
    'Corner Property',
    'Pet friendly',
    'Wheelchair Friendly'
  ];

  // Power Backup options
  const powerBackupOptions = ['None', 'Partial', 'Full'];

  // Parking options
  const parkingOptions = [
    'Open Parking',
    'Covered Parking',
    'Two Wheeler Parking',
    'Four Wheeler Parking'
    ];
    const additionalRooms = [
      'Pooja Room',
      'Study Room',
      'Servant Room',
      'Store Room'
    ];

  const handleFeatureClick = (category, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleCheckboxChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleSelectAll = (category, options) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].length === options.length ? [] : [...options]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveFormData(formData));
    dispatch(incrementStep());
  };

  const handleCancel = () => {
    dispatch(resetForm());
  };

  return (
    <div className="min-h-screen mt-24 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl bg-gray-50 rounded-lg shadow-sm p-6">
        <div className=" gap-8">
          <StepsCounter currentStep={currentStep} />
          {/* Main Content */}
          <div className="space-y-8 bg-white p-6 rounded-lg">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Amenities</h1>
              <p className="text-lg text-gray-600">Select the amenities available in your property</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Property Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Property Features</h3>
                <div className="flex flex-wrap gap-3">
                  {propertyFeatures.map(feature => (
                    <FeatureButton
                      key={feature}
                      feature={feature}
                      category="propertyFeatures"
                      formData={formData}
                      handleFeatureClick={handleFeatureClick}
                    />
                  ))}
                </div>
              </div>

              {/* Society Building Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Society Building Features</h3>
                <div className="flex flex-wrap gap-3">
                  {societyFeatures.map(feature => (
                    <FeatureButton
                      key={feature}
                      feature={feature}
                      category="societyFeatures"
                      formData={formData}
                      handleFeatureClick={handleFeatureClick}
                    />
                  ))}
                </div>
              </div>

              {/* Water Source */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Water Source</h3>
                <div className="flex flex-wrap gap-3">
                  {waterSourceOptions.map(option => (
                    <FeatureButton
                      key={option}
                      feature={option}
                      category="waterSource"
                      formData={formData}
                      handleFeatureClick={handleFeatureClick}
                    />
                  ))}
                </div>
              </div>

              {/* Overlooking */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Overlooking</h3>
                <div className="flex flex-wrap gap-3">
                  {overlookingOptions.map(option => (
                    <FeatureButton
                      key={option}
                      feature={option}
                      category="overlooking"
                      formData={formData}
                      handleFeatureClick={handleFeatureClick}
                    />
                  ))}
                </div>
              </div>

              {/* Other Features */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Other Features</h3>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.otherFeatures.length === otherFeatures.length}
                      onChange={() => handleSelectAll('otherFeatures', otherFeatures)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Select All</span>
                  </label>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {otherFeatures.map(feature => (
                    <label key={feature} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.otherFeatures.includes(feature)}
                        onChange={() => handleCheckboxChange('otherFeatures', feature)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Power Backup */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Power Backup</h3>
                <div className="flex flex-wrap gap-3">
                  {powerBackupOptions.map(option => (
                    <FeatureButton
                      key={option}
                      feature={option}
                      category="powerBackup"
                      formData={formData}
                      handleFeatureClick={handleFeatureClick}
                    />
                  ))}
                </div>
              </div>
              {/* Facilities */}
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Additional Rooms</h3>
                <div className="flex flex-wrap gap-3">
                  {additionalRooms.map(option => (
                    <FeatureButton
                      key={option}
                      feature={option}
                      category="additionalRooms"
                      formData={formData}
                      handleFeatureClick={handleFeatureClick}
                    />
                  ))}
                </div>
              </div>
              {/* Parking */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Parking</h3>
                <div className="flex flex-wrap gap-3">
                  {parkingOptions.map(option => (
                    <FeatureButton
                      key={option}
                      feature={option}
                      category="parking"
                      formData={formData}
                      handleFeatureClick={handleFeatureClick}
                    />
                  ))}
                  
                </div>
              </div>
              {/* Property Score */}
              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">Property Score</p>
                  <p className="text-sm text-gray-500">Better your property score, greater your visibility</p>
                </div>
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4F46E5"
                      strokeWidth="3"
                      strokeDasharray={`${propertyScore}, 100`}
                    />
                    <text x="20" y="22" className="text-xs" textAnchor="middle">
                      {propertyScore}%
                    </text>
                  </svg>
                </div>
                
              </div>

              {/* Post Property Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post Property
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-8 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-right text-sm text-gray-600">
          <p>Need help?</p>
          <p>
            You can email us at{' '}
            <a href="mailto:bahadurdangi100@gmail.com " className="text-blue-600">
            bahadurdangi100@gmail.com 
            </a>
          </p>
          <p>
            or call us at{' '}
            <a href="tel:+919664265932" className="text-blue-600">
            +919664265932 
            </a>{' '}
            (IND)
          </p>
        </div>
      </div>
    </div>
  );
}




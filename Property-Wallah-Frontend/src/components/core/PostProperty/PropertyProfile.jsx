import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { incrementStep, saveFormData, resetForm } from '../../../Redux/FormDataSlice.js';
import StepsCounter from './StepsCounter';

export default function PropertyProfile() {
  const [availabilityStatus, setAvailabilityStatus] = useState(''); 
  const [propertyScore, setPropertyScore] = useState(33)
  const [currentStep, setCurrentStep] = useState(6)
  const [formData, setFormData] = useState({
    propertyProfile: {
      bedrooms: '',
      bathrooms: '',
      balconies: '',
      totalFloors: '',
      floorNo: '',
      furnishing: '',
      facing: '',
      ageOfProperty: '',
      rentOutTo: '',
      availabilityStatus: '', // Ensure this field is included in the initial state
    },
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      propertyProfile: {
        ...prevState.propertyProfile,
        [name]: value,
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {}
    if (!availabilityStatus) newErrors.availabilityStatus = 'Please select availability status';
    if (!formData.propertyProfile.bedrooms) newErrors.bedrooms = 'Please select number of bedrooms'
    if (!formData.propertyProfile.bathrooms) newErrors.bathrooms = 'Please select number of bathrooms'
    if (!formData.propertyProfile.balconies) newErrors.balconies = 'Please select number of balconies'
    if (!formData.propertyProfile.totalFloors) newErrors.totalFloors = 'Please enter total floors'
    if (!formData.propertyProfile.floorNo) newErrors.floorNo = 'Please enter floor number'
    if (!formData.propertyProfile.furnishing) newErrors.furnishing = 'Please select furnishing status'
    if (!formData.propertyProfile.facing) newErrors.facing = 'Please select property facing'
    if (!formData.propertyProfile.ageOfProperty) newErrors.ageOfProperty = 'Please select age of property'
    if (!formData.propertyProfile.rentOutTo) newErrors.rentOutTo = 'Please select rent out to'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length === 0) {
      dispatch(saveFormData({
        ...formData,
        propertyProfile: {
          ...formData.propertyProfile,
          availabilityStatus: availabilityStatus, // Ensure this field is included in the form data
        },
      }));
      dispatch(incrementStep());
    } else {
      setErrors(formErrors)
    }
  }

  const handleCancel = () => {
    dispatch(resetForm());
  };

  return (
    <div className="min-h-screen mt-24 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl bg-white rounded-lg shadow-sm p-6">
        <div className=" gap-8">
          <StepsCounter currentStep={currentStep} />
          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Property Profile</h1>
              <p className="text-lg text-gray-600">Tell us more about your property</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Bedrooms */}
                <div className="space-y-2">
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Bedrooms</label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.propertyProfile.bedrooms}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.bedrooms ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="">Select bedrooms</option>
                    {[1, 2, 3, 4, 5, '5+'].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  {errors.bedrooms && <p className="text-red-500 text-sm">{errors.bedrooms}</p>}
                </div>

                {/* Bathrooms */}
                <div className="space-y-2">
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Bathrooms</label>
                  <select
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.propertyProfile.bathrooms}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.bathrooms ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="">Select bathrooms</option>
                    {[1, 2, 3, 4, 5, '5+'].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  {errors.bathrooms && <p className="text-red-500 text-sm">{errors.bathrooms}</p>}
                </div>

                {/* Balconies */}
                <div className="space-y-2">
                  <label htmlFor="balconies" className="block text-sm font-medium text-gray-700">Balconies</label>
                  <select
                    id="balconies"
                    name="balconies"
                    value={formData.propertyProfile.balconies}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.balconies ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="">Select balconies</option>
                    {[0, 1, 2, 3, 4, '4+'].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  {errors.balconies && <p className="text-red-500 text-sm">{errors.balconies}</p>}
                </div> 

                {/* Total Floors */}
                <div className="space-y-2">
                  <label htmlFor="totalFloors" className="block text-sm font-medium text-gray-700">Total Floors</label>
                  <input
                    type="number"
                    id="totalFloors"
                    name="totalFloors"
                    value={formData.propertyProfile.totalFloors}
                    onChange={handleChange}
                    placeholder="Enter total floors"
                    className={`w-full px-3 py-2 border ${errors.totalFloors ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.totalFloors && <p className="text-red-500 text-sm">{errors.totalFloors}</p>}
                </div>

                {/* Floor No */}
                <div className="space-y-2">
                  <label htmlFor="floorNo" className="block text-sm font-medium text-gray-700">Floor No</label>
                  <input
                    type="number"
                    id="floorNo"
                    name="floorNo"
                    value={formData.propertyProfile.floorNo}
                    onChange={handleChange}
                    placeholder="Enter floor number"
                    className={`w-full px-3 py-2 border ${errors.floorNo ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.floorNo && <p className="text-red-500 text-sm">{errors.floorNo}</p>}
                </div>

                {/* Furnishing */}
                <div className="space-y-2">
                  <label htmlFor="furnishing" className="block text-sm font-medium text-gray-700">Furnishing</label>
                  <select
                    id="furnishing"
                    name="furnishing"
                    value={formData.propertyProfile.furnishing}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.furnishing ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="">Select furnishing status</option>
                    <option value="Furnished">Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                  {errors.furnishing && <p className="text-red-500 text-sm">{errors.furnishing}</p>}
                </div>

                {/* Facing */}
                <div className="space-y-2">
                  <label htmlFor="facing" className="block text-sm font-medium text-gray-700">Facing</label>
                  <select
                    id="facing"
                    name="facing"
                    value={formData.propertyProfile.facing}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.facing ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="">Select property facing</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="North-East">North-East</option>
                    <option value="North-West">North-West</option>
                    <option value="South-East">South-East</option>
                    <option value="South-West">South-West</option>
                  </select>
                  {errors.facing && <p className="text-red-500 text-sm">{errors.facing}</p>}
                </div>


                {/* Age of Property */}
                <div className="space-y-2">
                  <label htmlFor="ageOfProperty" className="block text-sm font-medium text-gray-700">Age of Property</label>
                  <select
                    id="ageOfProperty"
                    name="ageOfProperty"
                    value={formData.propertyProfile.ageOfProperty}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.ageOfProperty ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="">Select age of property</option>
                    <option value="0-1 year">0-1 year</option>
                    <option value="1-5 years">1-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                  {errors.ageOfProperty && <p className="text-red-500 text-sm">{errors.ageOfProperty}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
{/* Existing fields */}
<div className="space-y-2">
                  <label htmlFor="rentOutTo" className="block text-sm font-medium text-gray-700">Rent Out To</label>
                  <select
                    id="rentOutTo"
                    name="rentOutTo"
                    value={formData.propertyProfile.rentOutTo}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.facing ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="Family">Family</option>
                    <option value="SingleMan">SingleMan</option>
                    <option value="SingleWoman">SingleWoman</option>

                  </select>
                  {errors.facing && <p className="text-red-500 text-sm">{errors.facing}</p>}
                </div>

{/* Availability Status */}
<div className="space-y-2">
  <label htmlFor="availabilityStatus" className="block text-sm font-medium text-gray-700">Availability Status</label>
  <select
    id="availabilityStatus"
    value={availabilityStatus}
    onChange={(e) => setAvailabilityStatus(e.target.value)}
    className={`w-full px-3 py-2 border ${errors.availabilityStatus ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
  >
    <option value="">Select availability</option>
    <option value="ReadyToMove">Ready to Move</option>
    <option value="UnderConstruction">Under Construction</option>
  </select>
  {errors.availabilityStatus && <p className="text-red-500 text-sm">{errors.availabilityStatus}</p>}
</div>
</div>
              {/* Property Score */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
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
                    <text x="18" y="20.35" className="text-xs" textAnchor="middle">
                      {propertyScore}%
                    </text>
                  </svg>
                </div>
              </div>

              {/* Continue and Cancel Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
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
  )
}





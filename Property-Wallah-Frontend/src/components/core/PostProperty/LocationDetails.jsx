import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { incrementStep, saveFormData, resetForm } from '../../../Redux/FormDataSlice.js';
import StepsCounter from './StepsCounter';

export default function LocationDetails() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    city: '',
    locality: '',
    subLocality: '',
    apartment: '',
    houseNo: '',
    state: '' 
  })
  const [errors, setErrors] = useState({})
  const [propertyScore, setPropertyScore] = useState(12)
  const currentStep = 2;

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevState => ({
        ...prevState,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.city.trim()) newErrors.city = 'Please enter city'
    if (!formData.locality.trim()) newErrors.locality = 'Please enter locality'
    if (!formData.apartment.trim()) newErrors.apartment = 'Please enter Apartment/Society'
    if (!formData.state.trim()) newErrors.state = 'Please enter state' // Added validation for state
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      const locationDetails = {
        city: formData.city,
        state: formData.state,
        locality: formData.locality,
        subLocality: formData.subLocality,
        apartment: formData.apartment,
        houseNo: formData.houseNo
      };
  
      dispatch(saveFormData({ location: locationDetails }));
      dispatch(incrementStep());
      setPropertyScore(33);
    } else {
      setErrors(formErrors);
    }
  };

  const handleCancel = () => {
    dispatch(resetForm());
  };

  return (
    <div className="min-h-screen mt-24 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl bg-white rounded-lg shadow-sm p-6">
        <div className="">
          <StepsCounter currentStep={currentStep} />
          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Where is your property located?</h1>
              <p className="text-lg text-gray-600">An accurate location helps you connect with the right buyers</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className={`w-full px-3 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="locality" className="block text-sm font-medium text-gray-700">Locality</label>
                  <input
                    type="text"
                    id="locality"
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    placeholder="Enter locality"
                    className={`w-full px-3 py-2 border ${errors.locality ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.locality && <p className="text-red-500 text-sm">{errors.locality}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="subLocality" className="block text-sm font-medium text-gray-700">Sub Locality (Optional)</label>
                  <input
                    type="text"
                    id="subLocality"
                    name="subLocality"
                    value={formData.subLocality}
                    onChange={handleChange}
                    placeholder="Enter sub locality"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">Apartment/Society</label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    placeholder="Enter apartment or society name"
                    className={`w-full px-3 py-2 border ${errors.apartment ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.apartment && <p className="text-red-500 text-sm">{errors.apartment}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700">House No. (Optional)</label>
                  <input
                    type="text"
                    id="houseNo"
                    name="houseNo"
                    value={formData.houseNo} 
                    onChange={handleChange}
                    placeholder="Enter house number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2"> {/* Added state input */}
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                  <input 
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    className={`w-full px-3 py-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
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



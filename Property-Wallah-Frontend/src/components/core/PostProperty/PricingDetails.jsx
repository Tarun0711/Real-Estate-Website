import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementStep, saveFormData, resetForm } from '../../../Redux/FormDataSlice.js';
import StepsCounter from './StepsCounter';

export default function PricingDetails() {
  const [formData, setFormData] = useState({
    rentDetails: {
      expectedRent: '',
      isNegotiable: false,
      electricityCharges: false,
      waterCharges: false,
      securityDeposit: '',
      agreementDurationMonths: '',
      noticePeriodMonths: '',
      additionalRentDetails: {
        maintenance: '',
        bookingAmount: '',
        membershipCharges: '',  
        otherCharges: '',
      },
    },
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const currentStep = 5;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prevState) => {
      const keys = name.split('.');
      if (keys.length > 1) {
        return {
          ...prevState,
          rentDetails: {
            ...prevState.rentDetails,
            [keys[0]]: {
              ...prevState.rentDetails[keys[0]],
              [keys[1]]: fieldValue,
            },
          },
        };
      } else {
        return {
          ...prevState,
          rentDetails: {
            ...prevState.rentDetails,
            [name]: fieldValue,
          },
        };
      } 
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.rentDetails.expectedRent) newErrors.expectedRent = 'Please enter expected rent';
    if (!formData.rentDetails.securityDeposit) newErrors.securityDeposit = 'Please enter security deposit';
    if (!formData.rentDetails.agreementDurationMonths) newErrors.agreementDurationMonths = 'Please enter agreement duration';
    if (!formData.rentDetails.noticePeriodMonths) newErrors.noticePeriodMonths = 'Please enter notice period';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      dispatch(saveFormData(formData));
      dispatch(incrementStep());
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
        <div className=" gap-8">
          <StepsCounter currentStep={currentStep} />
          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Pricing Details</h1>
              <p className="text-lg text-gray-600">Provide the pricing details for your property</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="expectedRent" className="block text-sm font-medium text-gray-700">Expected Rent</label>
                  <input
                    type="number"
                    id="expectedRent"
                    name="expectedRent"
                    value={formData.rentDetails.expectedRent}
                    onChange={handleChange}
                    placeholder="Enter expected rent"
                    className={`w-full px-3 py-2 border ${errors.expectedRent ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.expectedRent && <p className="text-red-500 text-sm">{errors.expectedRent}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="securityDeposit" className="block text-sm font-medium text-gray-700">Security Deposit</label>
                  <input
                    type="number"
                    id="securityDeposit"
                    name="securityDeposit"
                    value={formData.rentDetails.securityDeposit}
                    onChange={handleChange}
                    placeholder="Enter security deposit"
                    className={`w-full px-3 py-2 border ${errors.securityDeposit ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.securityDeposit && <p className="text-red-500 text-sm">{errors.securityDeposit}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="agreementDurationMonths" className="block text-sm font-medium text-gray-700">Agreement Duration (Months)</label>
                  <input
                    type="number"
                    id="agreementDurationMonths"
                    name="agreementDurationMonths"
                    value={formData.rentDetails.agreementDurationMonths}
                    onChange={handleChange}
                    placeholder="Enter agreement duration"
                    className={`w-full px-3 py-2 border ${errors.agreementDurationMonths ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.agreementDurationMonths && <p className="text-red-500 text-sm">{errors.agreementDurationMonths}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="noticePeriodMonths" className="block text-sm font-medium text-gray-700">Notice Period (Months)</label>
                  <input
                    type="number"
                    id="noticePeriodMonths"
                    name="noticePeriodMonths"
                    value={formData.rentDetails.noticePeriodMonths}
                    onChange={handleChange}
                    placeholder="Enter notice period"
                    className={`w-full px-3 py-2 border ${errors.noticePeriodMonths ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.noticePeriodMonths && <p className="text-red-500 text-sm">{errors.noticePeriodMonths}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="isNegotiable" className="block text-sm font-medium text-gray-700">Is Rent Negotiable?</label>
                  <input
                    type="checkbox"
                    id="isNegotiable"
                    name="isNegotiable"
                    checked={formData.rentDetails.isNegotiable}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="electricityCharges" className="block text-sm font-medium text-gray-700">Electricity Charges Included?</label>
                  <input
                    type="checkbox"
                    id="electricityCharges"
                    name="electricityCharges"
                    checked={formData.rentDetails.electricityCharges}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="waterCharges" className="block text-sm font-medium text-gray-700">Water Charges Included?</label>
                  <input
                    type="checkbox"
                    id="waterCharges"
                    name="waterCharges"
                    checked={formData.rentDetails.waterCharges}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Additional Rent Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="maintenance" className="block text-sm font-medium text-gray-700">Maintenance</label>
                    <input
                      type="number"
                      id="maintenance"
                      name="additionalRentDetails.maintenance"
                      value={formData.rentDetails.additionalRentDetails.maintenance}
                      onChange={handleChange}
                      placeholder="Enter maintenance charges"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="bookingAmount" className="block text-sm font-medium text-gray-700">Booking Amount</label>
                    <input
                      type="number"
                      id="bookingAmount"
                      name="additionalRentDetails.bookingAmount"
                      value={formData.rentDetails.additionalRentDetails.bookingAmount}
                      onChange={handleChange}
                      placeholder="Enter booking amount"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="membershipCharges" className="block text-sm font-medium text-gray-700">Membership Charges</label>
                    <input
                      type="number"
                      id="membershipCharges"
                      name="additionalRentDetails.membershipCharges"
                      value={formData.rentDetails.additionalRentDetails.membershipCharges}
                      onChange={handleChange}
                      placeholder="Enter membership charges"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="otherCharges" className="block text-sm font-medium text-gray-700">Other Charges</label>
                    <input
                      type="text"
                      id="otherCharges"
                      name="additionalRentDetails.otherCharges"
                      value={formData.rentDetails.additionalRentDetails.otherCharges}
                      onChange={handleChange}
                      placeholder="Enter other charges"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

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
      </div>
    </div>
  );
}
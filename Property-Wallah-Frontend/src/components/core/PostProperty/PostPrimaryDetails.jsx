import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementStep, saveFormData, resetStep } from "../../../Redux/FormDataSlice";
import StepsCounter from "./StepsCounter";

export default function PostPrimaryDetails() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [showError, setShowError] = useState(false);
  // const { step } = useSelector((state) => state.formData);
  const { pwUser } = useSelector((state) => state.profile);
  console.log(pwUser);

  const currentStep = 1;

  const dispatch = useDispatch();

  const handleContinue = () => {
    if (!title || !description || !mobileNumber) {
      setShowError(true);
      return;
    }
    setShowError(false);
    dispatch(saveFormData({ title, description, mobileNumber }));
    dispatch(incrementStep());
  };

  return (
    <div className="min-h-screen w-full mt-24 p-4 md:p-6 lg:p-8 bg-gray-50">
      <div className="mx-auto max-w-6xl bg-white rounded-lg shadow-lg p-6">
        <div className=" gap-8">
          <StepsCounter currentStep={currentStep} />
          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Welcome back,{pwUser.name}</h1>
              <p className="text-lg text-gray-600">Fill out the basic details</p>
            </div>

            {/* Title Field */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter property title"
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter property description"
                rows="4"
              ></textarea>
            </div>

            {/* Mobile Number Field */}
            <div className="space-y-2">
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="tel"
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter mobile number"
              />
            </div>

            {showError && <p className="text-red-500 text-sm">Please fill in all the required fields.</p>}
 
            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Continue
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-right text-sm text-gray-600">
          <p>Need help?</p>
          <p>
            Email us at <a href="mailto:bahadurdangi100@gmail.com " className="text-blue-600">bahadurdangi100@gmail.com </a>
          </p>
          <p>
            Call us at <a href="tel:+919664265932" className="text-blue-600">+919664265932</a> (IND)
          </p>
        </div>
      </div> 
    </div>
  );
}

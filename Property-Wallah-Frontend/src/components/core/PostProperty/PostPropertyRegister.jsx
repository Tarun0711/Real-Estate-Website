import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { incrementStep, resetForm } from '../../../Redux/FormDataSlice.js';

export default function PostPropertyRegister() {
  const [selectedRole, setSelectedRole] = useState('');
  const dispatch = useDispatch();

  const handleContinue = () => {
    dispatch(incrementStep());
  };

  const handleCancel = () => {
    dispatch(resetForm());
  };

  return (
    <div className="flex pt-20 min-h-screen">
      {/* <StepsCounter currentStep={currentStep} /> */}
      {/* Left Section */}
      <div  className="md:flex w-full">
      <div className="flex-1 p-8 max-w-xl">
        <button 
          onClick={handleCancel} // Changed from navigate to handleCancel
          className="mb-8 hover:opacity-80"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        <h1 className="text-2xl font-semibold mb-4">Welcome</h1>
        <p className="text-gray-600 mb-8">To continue please let us know correctly</p>

        <div className="space-y-4">
          <p className="font-medium">You are</p>
          
          <div className="flex gap-4">
            <button
              className={`px-6 py-3 rounded-full border ${
                selectedRole === 'owner' 
                  ? 'border-blue-600 bg-blue-50 text-blue-600' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => setSelectedRole('owner')}
            >
              An Owner
            </button> 
            
            <button
              className={`px-6 py-3 rounded-full border ${
                selectedRole === 'broker' 
                  ? 'border-blue-600 bg-blue-50 text-blue-600' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => setSelectedRole('broker')}
            >
              A Broker
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Please choose accurately. If in future you wish to change this, it can only be done via the my profile section.
          </p>

          <button
            className="w-full bg-[#0078db] text-white py-3 rounded-md mt-6"
            onClick={handleContinue}
            disabled={!selectedRole}
          >
            Continue
          </button>
          <button
            className="w-full bg-gray-100 text-gray-600 py-3 rounded-md mt-6"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-gray-50 p-8 flex flex-col items-center justify-center">
        <img 
          src="https://www.99acres.com/ppf-static/media/RegisterRight.f76571ca.png"
          alt="Registration illustration"
          className="w-64 h-64 object-contain mb-8"
        />
        
        <h2 className="text-xl font-semibold mb-4">Why we verify your number</h2>
        <p className="text-center text-gray-600 mb-8 max-w-md">
          Your phone number gives easy access to your account and will help connect with buyers
        </p>
        <div className="text-sm text-gray-500 space-y-2">
          <p>Need help?</p>
          <p>You can email us at <a href="mailto:bahadurdangi100@gmail.com " className="text-blue-600">bahadurdangi100@gmail.com</a></p>
          <p>or call us at <span className="text-blue-600">+919664265932</span> (IND)</p>
        </div>
      </div>
      </div>
    </div>
  );
}


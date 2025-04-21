import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { incrementStep, uploadPhotos, resetForm } from '../../../Redux/FormDataSlice.js';
import StepsCounter from './StepsCounter';

export default function PostPhotos() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [propertyScore, setPropertyScore] = useState(66)
  const currentStep = 4;
  const [media, setMedia] = useState([]);
  const [errors, setErrors] = useState({});

  const handleMediaChange = (e) => { 
    const files = Array.from(e.target.files);
    setMedia((prevMedia) => [...prevMedia, ...files]);
  };

  const handleRemoveMedia = (index) => {
    setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (media.length === 0) {
      setErrors({ media: 'Please upload at least one photo or video' });
      return;
    }
    dispatch(uploadPhotos(media));
    dispatch(incrementStep());
  };

  const handleSkip = () => {
    dispatch(incrementStep());
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
              <h1 className="text-2xl font-semibold text-gray-900">Add photos or videos of your property</h1>
              <p className="text-lg text-gray-600">A picture is worth a thousand words. 87% of buyers look at photos before buying.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label htmlFor="media" className="block text-sm font-medium text-gray-700">
                  Upload Photos or Videos
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    id="media"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleMediaChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="media"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Choose Files
                  </label>
                </div>
                {errors.media && (
                  <p className="text-red-500 text-sm">{errors.media}</p>
                )}
              </div>

              {/* Media Preview */}
              <div className="grid grid-cols-2 gap-4">
                {media.map((file, index) => (
                  <div key={index} className="relative">
                    {file.type.startsWith('image/') ? (
                      <img src={URL.createObjectURL(file)} alt={`preview-${index}`} className="w-full h-32 object-cover rounded-lg" />
                    ) : (
                      <video controls className="w-full h-32 object-cover rounded-lg">
                        <source src={URL.createObjectURL(file)} type={file.type} />
                      </video>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveMedia(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              {/* Tips Section */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-4">Make your picture perfect!</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-800 rounded-full" />
                    Capture photos in landscape mode.
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-800 rounded-full" />
                    Try clicking photos during the day. Avoid using flash.
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-800 rounded-full" />
                    Tidy up for better impact.
                  </li>
                </ul>
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

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-8 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Continue without photos
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
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


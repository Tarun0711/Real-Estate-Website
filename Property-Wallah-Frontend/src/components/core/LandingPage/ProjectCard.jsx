import React from "react";

const PropertyCard = ({ image, title, subtitle, price }) => {
  return (
    <div className="max-w-sm rounded-lg shadow-lg bg-white">
      <div className="relative">
        {/* Image Section */}
        <img className="w-full h-48 object-cover rounded-t-lg" src={image} alt={title} />
        {/* Featured Badge */}
        <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded">
          Featured
        </span>
        {/* Favorite Icon */}
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img
            src="/path-to-logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
        </div>
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {/* Subtitle */}
        <p className="text-sm text-gray-600">{subtitle}</p>
        {/* Price */}
        <p className="text-lg font-semibold text-gray-800 mt-2">{price}</p>
      </div>
    </div>
  );
};

export default PropertyCard;

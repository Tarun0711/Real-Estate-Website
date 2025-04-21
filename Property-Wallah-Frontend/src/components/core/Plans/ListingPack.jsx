import React, { useState } from "react";

const ListingPack = () => {
  const [selectedPack, setSelectedPack] = useState(3);
  const prices = {
    3: { price: 1291, original: 2150 },
    6: { price: 2199, original: 4200 },
    10: { price: 3199, original: 7150 },
    15: { price: 4199, original: 9725 },
  };

  const handlePackChange = (e) => {
    setSelectedPack(Number(e.target.value));
  };

  const calculateDiscount = (original, discounted) => {
    return `${Math.round(((original - discounted) / original) * 100)}% off`;
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg border">
      {/* Icon */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex justify-center items-center">
          <img
            src="https://vectorified.com/images/home-care-icon-30.png" 
            alt="Icon"
            className="w-8 h-8"
          />
        </div>
      </div>
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">BUILD - Listing Pack</h2>
      <p className="text-gray-600 text-sm">
        Get Premium pack for posting multiple properties and sell faster
      </p>
      {/* Price Section */}
      <div className="mt-4">
        <p className="text-gray-800 font-bold text-lg">
          {selectedPack} Listing Pack <span className="text-gray-500">(incl. GST)</span>
        </p>
        <div className="flex items-center mt-1">
          <span className="text-2xl font-bold text-blue-600">₹{prices[selectedPack].price}</span>
          <span className="text-gray-400 line-through ml-2">₹{prices[selectedPack].original}</span>
          <span className="ml-2 text-green-500 font-medium text-sm">
            {calculateDiscount(prices[selectedPack].original, prices[selectedPack].price)}
          </span>
        </div>
      </div>
      {/* Dropdown */}
      <div className="mt-4">
        <label htmlFor="pack-select" className="block text-gray-700 text-sm font-bold mb-2">
          Select Pack:
        </label>
        <select
          id="pack-select"
          value={selectedPack}
          onChange={handlePackChange}
          className="block w-full mt-1 p-2 border rounded-md"
        >
          <option value={3}>3 Listings</option>
          <option value={6}>6 Listings</option>
          <option value={10}>10 Listings</option>
          <option value={15}>15 Listings</option>
        </select>
      </div>
      {/* CTA Button */}
      <button className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        Buy Sachet Pack
      </button>
      {/* Benefits */}
      <ul className="mt-4 space-y-2 text-sm text-gray-700">
        <li className="flex items-center">
          <span className="text-blue-600 mr-2">✔</span> Up to 5X increase in buyer responses
        </li>
        <li className="flex items-center">
          <span className="text-blue-600 mr-2">✔</span> Free verification<span className="text-gray-400 text-xs ml-1">*</span>
        </li>
        <li className="flex items-center">
          <span className="text-blue-600 mr-2">✔</span> Post any property (resale/rent/commercial)
        </li>
        <li className="text-blue-600 cursor-pointer">+ 3 more benefits</li>
      </ul>
    </div>
  );
};

export default ListingPack;

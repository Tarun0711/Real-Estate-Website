import React, { useState } from "react";

const Facilities = ({facilities}) => {
  const [showAll, setShowAll] = useState(false);

  

  const displayedFacilities = showAll ? facilities : facilities.slice(0, 8);

  return (
    <div className="p-4">
        <div className="flex items-center justify-between mb-4">
            <div>
            <h2 className="text-3xl font-semibold">Top Facilities</h2>
        <p className="text-gray-600 mb-4">
          Signature Global Daxin Vistas Gurgaon presents an exclusive opportunity
          to own a...
        </p>
            </div>


          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            {showAll? "Show Less" : "Show All"}
          </button>
        </div>

       
      <div className="grid grid-cols-9 gap-4">
        {displayedFacilities.map((facility, index) => (
          <div
            key={index}
            className="flex flex-col max-w-40 items-center bg-blue-50 rounded-lg p-4 shadow hover:shadow-md"
          >
            {/* <div className="text-2xl mb-2">{facility.icon}</div> */}
            <span className="text-sm text-center font-medium">{facility}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Facilities;

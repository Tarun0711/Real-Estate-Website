import React from "react";

const FeaturedDealers = () => {
  const dealers = [
    {
      id: 1,
      name: "Mangalam Realtors",
      company: "Mangalam Realtors",
      since: "Feb, 2023",
      tags: ["RESALE", "NEW SALE"],
      buyers: 40,
      matchingProperties: 17,
      helpful: false,
      image: null,
    },
    {
      id: 2,
      name: "Ankush Bhandari",
      company: "AB Estate",
      since: "Oct, 2017",
      tags: ["RESALE"],
      buyers: null,
      matchingProperties: 4,
      helpful: true,
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
      id: 3,
      name: "Sanjeet Sharma",
      company: "Sharma Estates",
      since: "Oct, 2009",
      tags: ["RESALE"],
      buyers: 58,
      matchingProperties: 33,
      helpful: false,
      image: "https://via.placeholder.com/150", // Replace with actual image URL
    },
  ];

  return (
    <div className="p-6 bg-red-vivid-100 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        Seek help from <span className="text-blue-500">Featured Dealers</span>
      </h2>
      <p className="text-gray-500 mb-6">who are popular amongst Residential Buyers</p>
      <div className="flex gap-4">
        {dealers.map((dealer) => (
          <div
            key={dealer.id}
            className=" border  bg-white rounded-lg shadow p-4 flex flex-col w-1/3 min-w-[300px]"
          >
            <div className="flex items-center justify-between">
              {dealer.buyers && (
                <span className="bg-white text-blue-500 text-xs rounded px-2 py-1">
                  {dealer.buyers} Buyers this week
                </span>
              )}
              {dealer.helpful && (
                <span className="text-green-500 text-sm font-semibold">
                  Helpful to 100% buyers
                </span>
              )}
            </div>
            <div className="my-4 text-center">
              <div className="rounded-full w-16 h-16 mx-auto overflow-hidden border-2 border-orange-500">
                {dealer.image ? (
                  <img
                    src={dealer.image}
                    alt={dealer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <i className="fas fa-user text-gray-400 text-2xl"></i>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold mt-2">{dealer.name}</h3>
              <p className="text-sm text-gray-500">{dealer.company}</p>
              <p className="text-xs text-gray-400">Member Since {dealer.since}</p>
            </div>
            <div className="flex gap-2 justify-center my-2">
              {dealer.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 text-xs rounded px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Contact Dealer
            </button>
            <p className="text-sm text-center text-gray-500 mt-2">
              {dealer.matchingProperties} Matching Properties
            </p>
          </div>
        ))}
      </div>
      {/* <div className="text-center mt-6">
        <button className="text-blue-500 font-medium hover:underline">
          View all
        </button>
      </div> */}
    </div>
  );
};

export default FeaturedDealers;

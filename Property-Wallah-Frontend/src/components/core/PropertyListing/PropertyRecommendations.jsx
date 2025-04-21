import React, { useState, useEffect } from "react";

const PropertyCard = ({ image, title, details, price, possession }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-80 flex-shrink-0">
      <div className="relative">
        <img src={image} alt={title} className="h-48 w-full object-cover" />
        {possession && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
            {possession}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm">{details}</p>
        <p className="text-blue-600 font-bold mt-2">₹ {price}</p>
        <button className="mt-4 text-blue-500 underline">View Details</button>
      </div>
    </div>
  );
};

const PropertyRecommendations = () => {
  const properties = [
    {
      image: "https://via.placeholder.com/300x200",
      title: "Vatika Xpressions",
      details: "2, 3 BHK Independent Floor in Sector 88B, Gurgaon",
      price: "1.43 - 1.64 Cr",
      possession: "Ready To Move",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Suncity Vatsal Valley",
      details: "2, 3 BHK Independent Floor in Gwal Pahari, Gurgaon",
      price: "1.39 - 1.93 Cr",
      possession: "Possession from Jan 2025",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "M3M Antalya Hills",
      details: "2, 3 BHK Independent Floor in Sector Gurgaon",
      price: "1.71 - 3.06 Cr",
      possession: "Possession from Dec 2025",
    },
  ];

  const [visibleProperties, setVisibleProperties] = useState(3);

  // Auto slider logic
  useEffect(() => {
    const slider = document.getElementById("slider");
    let currentIndex = 0;

    const autoSlide = () => {
      if (slider) {
        currentIndex = (currentIndex + 1) % properties.length;
        slider.scrollTo({
          left: slider.offsetWidth * currentIndex,
          behavior: "smooth",
        });
      }
    };

    const interval = setInterval(autoSlide, 3000);
    return () => clearInterval(interval);
  }, [properties.length]);

  // Handle scroll event for lazy loading
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setVisibleProperties((prev) => Math.min(prev + 3, properties.length));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold text-center mb-6">
        People who viewed this also viewed
      </h2>
      <div
        className="mx-auto mt-10 w-11/12 overflow-x-auto scrollbar-hide"
        id="slider"
      >
        <div className="flex space-x-4 px-4">
          {properties.slice(0, visibleProperties).map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyRecommendations;

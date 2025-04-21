import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Navbar } from "../../components/common/Navbar";
import SimilarProperties from "../../components/core/LandingPage/SimilarProperties";
import Facilities from "../../components/core/PropertyListing/Facilities";
import PropertyRecommendations from "../../components/core/PropertyListing/PropertyRecommendations";
import { getSocietyById } from "../../Services/Operations/SocietyServices";
import { formatDate } from "../../utils/DateFormater";
import Footer from "../../components/core/LandingPage/Footer";
import PPTViewer from "../../components/common/PPTViewer";

const PropertyCard = () => {
  const [propData, setPropData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const { projectId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchSocietyData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getSocietyById(projectId);
      setPropData(response.data);
      enqueueSnackbar("Property data loaded successfully", {
        variant: "success",
      });
    } catch {
      enqueueSnackbar("Failed to load property data", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }, [projectId, enqueueSnackbar]);

  useEffect(() => {
    fetchSocietyData();
  }, [fetchSocietyData]);

  const renderPropertyDetails = () => {
    const {
      name,
      companyName,
      bhkTypes = [],
      priceRange,
      location,
      city,
      state,
      country,
      status,
      expectedCompletionDate,

    } = propData || {};
    const handleDownloadBrochure = () => {
      if (propData.brochure && propData.brochure.length > 0) {
        window.open(`http://localhost:9002/upload/${propData.brochure[0]}`, '_blank');
      } else {
        enqueueSnackbar("No brochure available for download", { variant: "warning" });
      }
    };

    return (
      <div className="w-1/2">
        <h1 className="text-4xl font-bold">{name}</h1>
        <p>{companyName}</p>
        <p className="mt-3 text-lg">
          {bhkTypes.map((item, index) => (
            <span key={index}>{item}, </span>
          ))}
          <span className="font-bold">₹ {priceRange}</span>
        </p>
        <p className="mt-2 flex items-center space-x-4 text-sm">
          <span>
            📍 {location}, {city}, {state}, {country}
          </span>
          <span>
            {status === "Under Construction" ? (
              <>
                🚧 {status} ⏳ Completion in{" "}
                {formatDate(expectedCompletionDate)}
              </>
            ) : (
              <>🏠 {status}</>
            )}
          </span>
        </p>
        <div className="mt-5 flex items-center space-x-2">
          <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold">
            New Launch
          </div>
          <span>Project</span>
        </div>
        <div className="mt-5 flex space-x-6">
          {[
            { icon: "📈", text: "High price appreciation" },
            { icon: "❤️", text: "Units of choice" },
            { icon: "💰", text: "Easy Payment plans" },
          ].map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span>{feature.icon}</span>
              <p className="text-sm">{feature.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex space-x-4">
          <button className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-md shadow-md">
            View Contact
          </button>
          <button onClick={handleDownloadBrochure}
 className="Btn">
            Brochure
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          🔥 200+ families showed interest yesterday.
        </p>
      </div>
    );
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (!propData)
    return <div className="text-center mt-10">No property data found</div>;
  const pptUrl=`http://localhost:9002/upload/${propData.brochure[0]}`

  return (
    <>
      <Navbar isHome={false} />
      <div className="bg-gradient-to-b from-[#2c2f60] to-[#1d1e44] text-white p-8 h-screen flex justify-between items-center space-x-8">
        {renderPropertyDetails()}
        <div className="relative w-1/2">
          <div className="relative h-[450px] w-full overflow-hidden rounded-lg shadow-lg">
            <img
              src={`http://localhost:9002/upload/${propData.images[0]}`}
              alt="Property"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-center text-lg py-3">
              {propData.name}
            </div>
          </div>
        </div>
      </div>
      <Facilities facilities={propData?.amenities} />
      <div className="p-4">
      <h2 className="text-3xl font-semibold">Additional Features</h2>
        <p className="text-gray-600 mb-4">
        Discover the exceptional features that set this property apart, designed for modern living and ultimate comfort.
        </p>
        {propData?.additionalFeatures ?( 
          <ul className=" pl-4">
            {propData.additionalFeatures.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}
          </ul>
         ) :( "No additional details available at the moment.")}
        <p className="text-gray-600 text-center mt-4 px-8">
        </p>
      </div>
      <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-700">View official brochure</h1>
      <p className="text-xl font-bold text-blue-700">{propData.name}</p>
      <PPTViewer pptUrl={pptUrl} />
    </div>

      <div className="mt-10">
        <SimilarProperties />
      </div>
      <PropertyRecommendations />
      <Footer />
    </>
  );
};

export default PropertyCard;

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, CircularProgress, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import {
  Balcony,
  Bathroom,
  Bed,
  Description,
  FamilyRestroomSharp,
  MoneyTwoTone,
  Refresh,
  Title,
  Pool,
  Park,
  SportsEsports,
  FitnessCenter,
  Elevator,
  ChildCare,
  DirectionsRun,
  HomeWork,
} from "@mui/icons-material";
import { getPropertyById } from "../../Services/Operations/PropertyServices";

import { Navbar } from "../../components/common/Navbar";
import FeaturedDealers from "../../components/core/PropertyListing/FeaturedDealers";
import Footer from "../../components/core/LandingPage/Footer";
import NewlyLaunchedProjects from "../../components/core/LandingPage/NewlyLaunchedProjects";
import ContactModal from "./PropertyListing/ContactModal";
import {
  Building2,
  Calendar,
  GlassWater,
  HomeIcon,
  House,
  ParkingCircleIcon,
  SofaIcon,
  User,
} from "lucide-react";
import { formatDate } from "../../utils/DateFormater";
import { handleFavoriteToggle } from "../../utils/FavouriteToggle";
import ContactOwner from "./PropertyListing/ContactOwner";

const SingleP = () => {
  const { propertyId } = useParams(); // Extract property ID from URL params
  const { enqueueSnackbar } = useSnackbar(); // Snackbar for notifications
  const { token } = useSelector((state) => state.auth);

  const [propData, setPropData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { pwUser } = useSelector((state) => state.profile);
  const [contactOpen, setContactOpen] = useState(false);

  // Fetch property data by ID
  const fetchPropertyData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getPropertyById(propertyId, token);
      setPropData(response.data);
      console.log(response);
    } catch (error) {
      enqueueSnackbar("Failed to load property data", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }, [propertyId, token, enqueueSnackbar]);

  useEffect(() => {
    fetchPropertyData();
  }, [fetchPropertyData]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsFavorite(wishlist.some((item) => item._id === propertyId));
  }, [propertyId]);

  const handleContactModalOpen = () => {
    // Only open the modal if the user is logged in
    if (!token) {
      enqueueSnackbar("Login to view owner details", {
        variant: "warning",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    } else {
      setOpen(true);
    }
  };

  const amenityIcons = {
    Pool: <Pool />,
    "Park/Garden": <Park />,
    Club: <HomeWork />,
    "Main Road": <DirectionsRun />,
    Playground: <ChildCare />,
    "Swimming Pool": <Pool />,
    GYM: <FitnessCenter />,
    "Indoor Games": <SportsEsports />,
    Elevator: <Elevator />,
  };
  const handleContactOwner = () => {
    pwUser
      ? setContactOpen(true)
      : enqueueSnackbar("Login to view owner details", { variant: "warning" });
  };

  const colors = ["bg-[#f2938c]", "bg-[#dca081]", "bg-[#ee601d]", "bg-[#e09aa6]", "bg-[#f45d79]", "bg-[#dd7533]", "bg-[#e17141]","bg-[#f2938c]", "bg-[#dca081]", "bg-[#ee601d]", "bg-[#e09aa6]", "bg-[#f45d79]", "bg-[#dd7533]", "bg-[#e17141]","bg-[#f2938c]", "bg-[#dca081]", "bg-[#ee601d]", "bg-[#e09aa6]", "bg-[#f45d79]", "bg-[#dd7533]", "bg-[#e17141]"];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <CircularProgress />
        </div>
      );
    }

    if (!propData) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <p>No property data found.</p>
          <Button
            onClick={fetchPropertyData}
            variant="contained"
            color="primary"
          >
            Retry <Refresh />
          </Button>
        </div>
      );
    }
    const postedDate = formatDate(propData.updatedAt);

    return (
      <div className="px-4 py-12 md:px-10 md:py-20">
      <ContactOwner
        open={contactOpen}
        email={propData?.postedBy?.email}
        propId={propData._id}
        setOpen={setContactOpen}
      />
        <div
          className={`flex justify-between p-4 header rounded-lg bg-white ${
            isHeaderFixed ? "fixed top-0 left-0 w-full shadow-md z-50" : ""
          }`}
        >
          <div className="flex ">
            <div className="border-r-2 pr-4">
              <span className="text-5xl text-green-vivid-100 font-bold">
                ₹{(propData.rentDetails.expectedRent / 10000).toFixed(2)} LKH{" "}
              </span>
              <p className="text-sm text-right text-gray-500">{propData.category==="Sell" ? "" : "Per Month"}</p>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold mt-2">
                {" "}
                <Bed />
                {propData.propertyProfile.bedrooms} Bedrooms <Bathroom />{" "}
                {propData.propertyProfile?.bathrooms} Bath <Balcony />{" "}
                {propData.propertyProfile?.balconies} Balconies
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {propData.propertyProfile.bedrooms} BHK {propData.subCategory}{" "}
                in {propData.location.state},{propData.location.city}{" "}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <button
                onClick={handleContactOwner}
                className="bg-blue-500 text-white py-2 px-4 rounded-md mb-2">
              Contact Owner
            </button>
            <button
            onClick={() =>
              handleFavoriteToggle(
                propData,
                isFavorite,
                setIsFavorite,
                enqueueSnackbar
              )
            }
              className={` py-2 px-4 rounded-md mb-2 ${
                isFavorite
                  ? "bg-red-100 border-2 border-red-500 text-red-500"
                  : "bg-transparent border-2 border-blue-500 text-blue-500"
              }`}
            >
              <IconButton
                size="small"
                sx={{
                  paddingX:1,
                  paddingY: 0,
                  color: isFavorite ? "red" : "#777",
                  backgroundColor: isFavorite
                    ? "rgba(255, 0, 0, 0.1)"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: isFavorite
                      ? "rgba(255, 0, 0, 0.2)"
                      : "rgba(0, 0, 0, 0.04)",
                  },
                }}
                
              >
                <FavoriteBorderIcon />
              </IconButton>{" "}
              Shortlist
            </button>
          </div>
        </div>
        <div className="mt-8 w-full flex items-center justify-center gap-4  border-t-[0.5px] py-8 border-gray-300">
          <div className=" overflow-hidden bg-blue-100 rounded-t-2xl  ">
            <h2 className="text-sm text-blue-500 bg-cyan-050 px-4 py-2 font-semibold mb-4">
              Property Images
            </h2>
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.e1_IIdzBq8phEuVl2pXuuAHaEE&pid=Api&P=0&h=180"
              className="h-96 m-2"
              alt="property"
            />
          </div>
          <div className="w-1/2 bg-green-cool-100 bg-opacity-15 p-4">
            <h2 className="text-lg text-gray-500 font-semibold mb-4">
              Property Details
            </h2>
            <h2 className="text-lg font-semibold text-gray-500 mb-1">
              <Title />
              Title
            </h2>
            <p className=" pl-4">{propData.title}</p>
            <h2 className="text-lg font-semibold text-gray-500 mb-1">
              <Description />
              Description
            </h2>
            <p className="  pl-4">{propData.description}</p>
            <h2 className="text-lg text-gray-500 font-semibold mb-1">
              {" "}
              📍 Location
            </h2>
            <p className=" pl-4">
              {propData.location.apartment}, {propData.location.city},{" "}
              {propData.location.state}
            </p>
            <div className=" grid grid-cols-2 gap-3 mt-5">
              <div>
                <p className="text-sm text-gray-500">
                  <FamilyRestroomSharp /> Available For
                </p>
                <p className="pl-6 font-medium text-gray-800">
                  {propData.propertyProfile.rentOutTo}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex gap-1">
                  <SofaIcon /> Furnishing
                </p>
                <p className="pl-6 font-medium text-gray-800">
                  {propData.propertyProfile.furnishing}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex gap-1">
                  <Calendar /> Posted On
                </p>
                <p className="pl-6 font-medium text-gray-800">{postedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex gap-1">
                  <User /> Posted By
                </p>
                <p className="pl-6 font-medium text-gray-800">
                  {propData && propData.postedBy.isBorker ? "Borker" : "Owner"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex gap-1">
                  <House /> Configurations
                </p>
                <p className="pl-6 font-medium text-gray-800">
                  {propData.propertyProfile.bedrooms} BHK {propData.subCategory}
                  <br />
                  <span className="font-thin text-xs">Additional Rooms </span>
                  {propData.additionalRooms?.map((room) => (
                    <span key={room}>{room} ,</span>
                  ))}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex gap-1">
                  <MoneyTwoTone /> {propData.category==="Sell" ? "Price" : "Rent"}
                </p>
                <p className="pl-6 font-medium text-gray-800">
                  ₹{propData.rentDetails.expectedRent}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-lg font-medium my-2">
            Why should you consider this property?
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {
              // Features
              propData.otherFeatures?.map((feature) => (
                <div
                  key={feature}
                  className="bg-blue-100 text-blue-500 p-2 rounded-2xl"
                >
                  {feature}
                </div>
              ))
            }
            {propData.features?.map((feature) => (
              <div
                key={feature}
                className="bg-blue-100 text-blue-500 p-2 rounded-2xl"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 ">
          <h2 className="text-lg font-semibold text-gray-500 mb-4">
            Rent Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2">
              <p className="font-medium">Expected Rent</p>
              <p>₹{propData.rentDetails?.expectedRent}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-medium">Security Deposit</p>
              <p>₹{propData.rentDetails?.securityDeposit}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-medium">Maintenance Charges</p>
              <p>₹{propData.rentDetails?.additionalRentDetails?.maintenance}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-medium">Brokerage Charges</p>
              <p>₹{propData.rentDetails?.brokerageCharges || 0}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-medium">Booking Amount</p>
              <p>
                ₹{propData.rentDetails?.additionalRentDetails?.bookingAmount}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="font-medium">Electricity Charges </p>
              <p>
               {propData.rentDetails?.electricityCharges ? "Included" : "Not Included"}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="font-medium">Water Charges </p>
              <p>
               {propData.rentDetails?.waterCharges ? "Included" : "Not Included"}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="font-medium">Negotiable </p>
              <p>
               {propData.rentDetails?.isNegotiable ? "Is Negotiable" : "Not Negotiable"}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="font-medium">Agreement Duration Months </p>
              <p>
               {propData.rentDetails?.agreementDurationMonths} Months
              </p>
            </div>
            <div className="flex gap-2">
              <p className="font-medium">Other Charges </p>
              <p>
               {propData.rentDetails?.additionalRentDetails?.otherCharges}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 ">
          <h2 className="text-lg font-semibold text-gray-500 mb-4">
            Property Specifications
          </h2>
          <p className="flex gap-2 font-medium">
            <ParkingCircleIcon color="#d83933" /> Parking
          </p>
          {propData.parking?.map((parking) => (
            <p key={parking} className="pl-8">
              {parking}
            </p>
          ))}
          <p className="flex gap-2 font-medium">
            <Building2 color="#d83933" />
            Total Floor || Property on Floor
          </p>
          <p className="pl-8">
            {propData.propertyProfile.totalFloors} ||{" "}
            {propData.propertyProfile.floorNo}{" "}
          </p>
          <p className="flex gap-2 font-medium">
            <HomeIcon color="#d83933" />
            Age of Property
          </p>
          <p className="pl-8">{propData.propertyProfile.ageOfProperty} Years</p>
          <p className="flex gap-2 font-medium">
            <GlassWater color="#d83933" />
            Water Supply
          </p>
          <p className="pl-8">{propData.waterSource?.map(
            (water) => water + " , "
          )}</p>
        </div>
        <div className="mt-8 ">
          <h2 className="text-lg font-semibold text-gray-500 mb-4">
            Property Amenities
          </h2>
          <div className="flex gap-2 flex-wrap">
          {propData.amenities?.map((amenity) => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            return (
              <div key={amenity} className={`${randomColor} text-white  p-2 rounded-2xl flex items-center gap-2`}>
                {amenityIcons[amenity]} {amenity}
              </div>
            );
          })}
          </div>
          </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar isHome={true} />

      {renderContent()}
      <FeaturedDealers />
      <div
      style={{
        maxWidth: "100%",
        overflow: "hidden",
        color: "red",
        width: "500px",
        height: "500px",
      }}
    >
      <div id="my-map-display" style={{ height: "100%", width: "100%" }}>
        <iframe
          style={{ height: "100%", width: "100%", border: "0" }}
          frameBorder="0"
          src="https://www.google.com/maps/embed/v1/search?q=plot&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
          allowFullScreen
          title="Google Map"
        ></iframe>
      </div>
      <a
        className="our-googlemap-code"
        href="https://www.bootstrapskins.com/themes"
        id="get-map-data"
      >
        premium bootstrap themes
      </a>
      <style>
        {`
          #my-map-display img.text-marker {
            max-width: none !important;
            background: none !important;
          }
          img {
            max-width: none;
          }
        `}
      </style>
    </div>s
      <div className="my-10 mb-48">
        <NewlyLaunchedProjects />
      </div>

      <Footer />

      {/* Contact Modal */}
      {open && <ContactModal open={open} setOpen={setOpen} />}
    </div>
  );
};

export default SingleP;

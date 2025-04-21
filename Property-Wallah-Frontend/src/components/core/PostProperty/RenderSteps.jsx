import React from "react";
import { useSelector } from "react-redux";
import PostPropertyUser from "./PostPropertyUser";
import PostPropertyRegister from "./PostPropertyRegister";
import PostPrimaryDetails from "./PostPrimaryDetails";
import LocationDetails from "./LocationDetails";
import PropertyProfile from "./PropertyProfile";
import PostPhotos from "./PostPhotos";
import AmenitiesSection from "./AmenitiesSection";
import OtherDetails from "./OtherDetails"; 
import PricingDetails from "./PricingDetails";
import StepsCounter from "./StepsCounter";

function RenderSteps() {
  const { step } = useSelector((state) => state.formData); 
  return (
    <div>
      <StepsCounter currentStep={step} />
      {step === 1 && <PostPropertyUser />}
      {step === 2 && <PostPropertyRegister />}
      {step === 3 && <PostPrimaryDetails />}
      {step === 4 && <LocationDetails />}
      {step === 5 && <PropertyProfile />}
      {step === 6 && <PostPhotos />}
      {step === 7 && <PricingDetails />}
      {step === 8 && <AmenitiesSection />}
      {step === 9 && <OtherDetails />}
    </div>
  ); 
}

export default RenderSteps;

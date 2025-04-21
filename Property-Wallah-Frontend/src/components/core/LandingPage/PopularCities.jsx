import React from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

const citiesList = [
  {
    src1: "assets/HomeCitiesImage/delhi-ncr.jpg",
    text1: "Delhi / NCR",
    text2: "16000+ Properties",
    src2: "assets/HomeCitiesImage/Mumbai.jpg",
    text3: "Mumbai",
    text4: "98000+ Properties",
  },
  {
    src1: "assets/HomeCitiesImage/bangalore.jpg",
    text1: "Bangalore",
    text2: "48000+ Properties",
    src2: "assets/HomeCitiesImage/hyderabad.jpg",
    text3: "Hyderabad",
    text4: "32000+ Properties",
  },
  {
    src1: "assets/HomeCitiesImage/pune.jpg",
    text1: "Pune",
    text2: "49000+ Properties",
    src2: "assets/HomeCitiesImage/kolkata.jpg",
    text3: "Kolkata",
    text4: "32000+ Properties",
  },
  {
    src1: "assets/HomeCitiesImage/chennai.jpg",
    text1: "Chennai",
    text2: "37000+ Properties",
  },
];

const Card = ({ src, title, subtitle }) => (
  <div
    className="flex items-center mb-4 cursor-pointer bg-white  rounded-lg p-4 transition-transform transform hover:scale-105"
    onClick={() => console.log("Open Search Modal")}
  >
    <img
      src={src}
      alt="city"
      className="w-24 h-24 object-cover rounded-lg"
    />
    <div className="ml-4">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  </div>
);

const CommercialCard = ({
  bgColor,
  lightText,
  title1,
  title2,
  subtitle1,
  subtitle2,
  btnText,
}) => (
  <div
    className={`p-8 rounded-lg cursor-pointer ${bgColor} shadow-md transition-transform transform hover:scale-105`}
    onClick={() => console.log("Open Search Modal")}
  >
    <p className="text-sm text-gray-600">{lightText}</p>
    <h2 className="text-2xl font-bold text-gray-900 mt-2">
      {title1} <br /> {title2}
    </h2>
    <p className="text-gray-700 mt-2">
      {subtitle1}
      <br /> {subtitle2}
    </p>
    <button
      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      {btnText}
    </button>
  </div>
);

const WhyChoose = ({ title, subtitle }) => (
  <div className="p-4 bg-white shadow-md rounded-lg text-center">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="text-gray-500 mt-2">{subtitle}</p>
  </div>
);

const BottomSection = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="mb-20 md:w-[80%] px-4 mx-auto">
      <div className="mb-8 text-center">
        <p className="text-sm text-gray-500">TOP CITIES</p>
        <h2 className="text-2xl font-bold text-gray-900">
          Explore Real Estate in Popular Indian Cities
        </h2>
      </div>
      <Carousel responsive={responsive} className="mb-8">
        {citiesList.map((city, index) => (
          <div key={index} className="px-4">
            <Card src={city.src1} title={city.text1} subtitle={city.text2} />
            {city.src2 && (
              <Card src={city.src2} title={city.text3} subtitle={city.text4} />
            )}
          </div>
        ))}
      </Carousel>
      <div className="text-center mt-12">
        <p className="text-sm text-gray-500">COMMERCIAL SPACES</p>
        <h2 className="text-2xl font-bold text-gray-900">
          Choose from a wide variety of commercial properties
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-6 justify-center mt-8">
        <CommercialCard
          bgColor="bg-yellow-100"
          lightText="BUY FOR COMMERCIAL USE"
          title1="Buy a Commercial"
          title2="property"
          subtitle1="Explore from Office Spaces, Co-working spaces,"
          subtitle2="Retail Shops, Land, Factories and more"
          btnText="Explore Buying Commercial"
        />
        <CommercialCard
          bgColor="bg-blue-100"
          lightText="LEASE FOR COMMERCIAL USE"
          title1="Lease a Commercial"
          title2="property"
          subtitle1="Explore from Office Spaces, Co-working spaces,"
          subtitle2="Retail Shops, Land, Factories and more"
          btnText="Explore Leasing Commercial"
        />
      </div>
      <div className="text-center mt-12">
        <p className="text-sm text-gray-500">BENEFITS OF Property Wallah</p>
        <h2 className="text-2xl font-bold text-gray-900">
          Why choose Property Wallah
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <WhyChoose
          title="Over 12 Lac properties"
          subtitle="10,000+ properties are added every day"
        />
        <WhyChoose
          title="Verification by Property Wallah team"
          subtitle="Photos / Videos and other details are verified on location"
        />
        <WhyChoose
          title="Large user base"
          subtitle="High active user count and user engagement to find and close deals"
        />
      </div>
    </section>
  );
};

export default BottomSection;

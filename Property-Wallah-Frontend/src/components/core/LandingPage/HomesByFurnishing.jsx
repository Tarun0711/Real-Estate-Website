import React from "react";

const Data = [
  {
    title: "Fully Furnished",
    image: "https://images6.alphacoders.com/102/1020690.jpg",
  },
  {
    title: "Semifurnished",
    image:
      "https://global-uploads.webflow.com/62bc621399f5713af580f208/64a85945b1bb12df2ca3370f_Semi-Furnished%20Apartment_Ori%20Cloud%20Bed.JPG",
  },
  {
    title: "Unfurnished",
    image:
      "https://www.horizonq8.com/wp-content/uploads/2021/12/Horizon-Q8-Salmiya-350-4.jpg",
  },
];
function HomesByFurnishing() {
  return (
    <div className="w-3/4 pb-7 overflow-hidden mx-auto">
      <h1 className="font-bold text-2xl text-gray-700 mb-4">
        Homes Sorted by Furnishings
      </h1>
      <p className="text-sm text-gray-600 font-medium mb-6">
        Discover a wide range of homes tailored to your furnishing preferences,
        from fully equipped spaces ready for immediate move-in, to unfurnished
        homes offering a blank canvas for your personal touch.
      </p>
      <div className="flex-between px-3 flex-wrap ">
        {Data.map((item) => (
          <div
            key={item.title}
            className=" w-[300px] rounded-md cursor-pointer hover:translate-y-1 hover:scale-105 transition-all ease-in-out duration-500  relative"
          >
            <div
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "200px",
                borderRadius: "10px",
              }}
            ></div>
            <h2 className="text-md font-bold text-black mt-4">{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomesByFurnishing;

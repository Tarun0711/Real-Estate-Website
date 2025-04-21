import React, { useEffect } from "react";
import { Button } from "../../common/button";

export default function PropertyInsights() {
  const details = [
    {
      image: "https://www.99acres.com/universalapp/img/PriceTrend2.png",
      name: "Price Plan",
      desc: "Check property rates and price",
    },
    {
      image: "https://www.99acres.com/universalapp/img/LocalityInsights2.png",
      name: "Locality Insights",
      desc: "Know more about different locality",
    },
    {
      image: "https://www.99acres.com/universalapp/img/ReviewsRatings2.png",
      name: "Genuine Reviews by Residents",
      desc: "Read genuine reviews from residents",
    },
    {
      image: "https://www.99acres.com/universalapp/img/TransactionPrices2.png",
      name: "Transaction Price",
      desc: "Check property transaction values",
    },
    {
      image: "https://www.99acres.com/universalapp/img/AboutMyProperty2.png",
      name: "About My Property",
      desc: "Track price and analyze market demand",
    },
    {
      image: "https://www.99acres.com/universalapp/img/ReadIcons2.png",
      name: "Read Latest News",
      desc: "Around Real Estate",
    },
    {
      image: "https://www.99acres.com/universalapp/img/GuidesDesktop.png",
      name: "Check Article",
      desc: "On trading topics",
    },
    {
      image: "https://www.99acres.com/universalapp/img/PriceTrend2.png",
      name: "Price Plan",
      desc: "Check property rates and price",
    },
    {
      image: "https://www.99acres.com/universalapp/img/LocalityInsights2.png",
      name: "Locality Insights",
      desc: "Know more about different locality",
    },
    {
      image: "https://www.99acres.com/universalapp/img/ReviewsRatings2.png",
      name: "Genuine Reviews",
      desc: "Read genuine reviews from residents",
    },
  ];

  useEffect(() => {
    const slider = document.getElementById("slider");
    const sliderItems = slider?.querySelectorAll(".card");
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      if (counter >= sliderItems.length) {
        counter = 0;
      }
      slider?.scrollTo({
        left: sliderItems[counter].offsetLeft,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 bg-gray-50 mb-36 mt-10 mx-auto w-full md:w-3/4">
      <div className="h-[20rem] rounded-lg bg-blue-100 mx-auto w-[90%]">
        <div className="flex justify-between p-6 mt-16">
          <div className="flex items-center ">
            <img
              src="https://static.99acres.com/universalapp/img/batch_prediction.png"
              alt="Insights & Tools"
              className="h-20 w-auto mr-4"
            />
            <div className="flex flex-col ">
              <h1 className="font-extrabold  text-2xl">Insights & Tools</h1>
              <p className="text-gray-500">Go From browsing to buying</p>
            </div>
          </div>
          {/* <Button className="bg-transparent text-blue-500 font-extrabold border  border-blue-500 rounded px-4 py-2 hover:bg-blue-500 hover:text-white transition">
            View All Insights
          </Button> */}
        </div>

        {/* Slider Section */}
        <div
          className="mx-auto mt-10 w-11/12 overflow-x-auto scrollbar-hide"
          id="slider"
        >
          <div className="flex space-x-4 px-4">
            {details.map((detail, index) => (
              <div
                key={index}
                className="card flex flex-col items-center justify-between bg-white rounded-lg shadow-lg p-6 w-52 h-56 flex-shrink-0 hover:shadow-xl transition-shadow"
              >
                <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <img
                    src={detail.image}
                    alt={detail.name}
                    className="h-16 w-16 rounded-full"
                  />
                </div>

                <div className="text-left">
                  <h2 className="font-bold text-md mb-2">{detail.name}</h2>
                  <p className="text-gray-600 text-sm">{detail.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Data = [
  {
    title: "For Family",
    description:
      "Our family-friendly rentals are perfect for families looking for a place to stay during their holidays.",
    image:
      "https://png.pngtree.com/background/20230403/original/pngtree-portrait-of-happy-indian-family-of-four-sitting-together-on-sofa-picture-image_2295340.jpg",
  },
  {
    title: "For Single Men",
    description:
      "Our single-bedroom rentals are perfect for men looking to explore the city without worrying about the hassle of a larger apartment.",
    image:
      "https://www.themanual.com/wp-content/uploads/sites/9/2021/05/mens-apartment-essentials-2021.jpg?fit=800%2C800&p=1",
  },
  {
    title: "For Single Women",
    description:
      "Our single-bedroom rentals are perfect for women looking to explore the city without worrying about the hassle of a larger apartment.",
    image:
      "https://media.istockphoto.com/photos/woman-working-from-home-in-her-appartement-picture-id956628046?k=20&m=956628046&s=612x612&w=0&h=LId9BFBNOsCPJ9LR-OMABHH9brINovEQKG1rYrSEFLU=",
  },
  {
    title: "For Couples",
    description:
      "Our couples-friendly rentals are perfect for couples looking to explore the city without worrying about the hassle of a larger apartment.",
    image:
      "https://www.etchellsandyoung.co.za/assets/images/rentals-bg-p-1080.jpeg",
  },
];

function Recommend() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-3/4 py-8 overflow-hidden mx-auto">
      <h1 className="font-bold text-2xl text-gray-700 mb-2">
        Exclusive Rental Selections
      </h1>
      <p className="text-sm text-gray-600 font-medium mb-6">
        We've carefully curated a list of properties that are perfect for your
        next vacation.
      </p>
      <Carousel responsive={responsive}>
        {Data.map((item, index) => (
          <div
            key={index}
            className="relative mb-10 md:w-[350px] h-[270px] rounded-xl border overflow-hidden"
          >
            <div
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
              }}
              className="flex hover:scale-105 transition-all ease-in-out duration-300 flex-col justify-end"
            >
              <div className="bg-white bg-opacity-75 p-4">
                <h2 className="font-bold text-xl">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Recommend;

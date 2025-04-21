import { Navbar } from "../components/common/Navbar";
import Footer from "../components/core/LandingPage/Footer";
import React from "react";

function Aboutus() {
  return (
    <div className="w-full h-full ">
      <Navbar isHome={true} />
      <div className="w-11/12 h-full pt-20 mx-auto flex flex-col items-center justify-center">
        <div className="w-full h-[200px] bg-blue-300 rounded-xl flex flex-col items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/10017/10017692.png"
            alt=""
            className="h-20 p-2 rounded-full bg-white bg-opacity-40"
          />
          <h1 className="text-2xl font-bold text-center">
            About Us Property Wallah
          </h1>
        </div>
        <div className="w-full h-full px-10 py-10 text-gray-700 text-justify">
          <div className="mx-auto p-6 bg-white">
            <p className="mt-4 text-gray-600 text-center">
              Welcome to{" "}
              <span className="font-semibold text-indigo-600">
                Property Wallah
              </span>
              , your go-to real estate platform launched in 2025! We are
              committed to revolutionizing the way brokers, builders, and
              property seekers connect, making property transactions seamless
              and hassle-free.
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Our Mission
                </h2>
                <p className="text-gray-600 mt-2">
                  At <span className="font-semibold">Property Wallah</span>, we
                  aim to provide a powerful and user-friendly platform where
                  brokers and builders can easily list and manage their
                  properties. Whether you’re looking to buy, sell, or rent, our
                  advanced search and listing features help you find the perfect
                  match effortlessly.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Why Choose Us?
                </h2>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                  <li>
                    Seamless property listing and management for brokers and
                    builders.
                  </li>
                  <li>Advanced search features for buyers and investors.</li>
                  <li>
                    Continuous improvements with the latest real estate
                    technologies.
                  </li>
                  <li>Transparent and efficient property transactions.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Our Commitment
                </h2>
                <p className="text-gray-600 mt-2">
                  We are continuously working to enhance our platform, ensuring
                  a smooth and secure experience for all users. Our goal is to
                  simplify real estate transactions and create a transparent
                  marketplace for brokers, builders, and buyers.
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Join Us Today!
              </h2>
              <p className="text-gray-600 mt-2">
                Be a part of the future of real estate with{" "}
                <span className="font-semibold text-indigo-600">
                  Property Wallah
                </span>
                . Start listing, searching, and finding your dream property with
                ease! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Aboutus;

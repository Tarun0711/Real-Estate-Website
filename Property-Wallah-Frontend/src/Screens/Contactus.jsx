import { Navbar } from "../components/common/Navbar";
import Footer from "../components/core/LandingPage/Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import ContactForm from "../components/ContactForm";
import React from "react";
import RealEstateServices from "../components/RealEstateServices";

function Contactus() {
  return (
    <div className="w-full h-full bg-gray-50">
      <Navbar isHome={true} />
      <div className="w-11/12 h-full pt-20 mx-auto flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Get in Touch</h1>
        <p className="text-lg mb-8 text-gray-100">We're here to help you find your dream property</p>
        <div className="max-w-5xl w-full bg-white py-10 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-blue-500 -m-10 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold mb-4 text-white">Contact Information</h2>
            <div className="space-y-4 text-white">
              <p className="flex items-center space-x-2"><FaPhone className="text-gray-100" /> <span>+919664265932</span></p>
              <p className="flex items-center space-x-2"><FaEnvelope className="text-gray-100" /> <span>bahadurdangi100@gmail.com</span></p>
              <p className="flex items-center space-x-2"><FaClock className="text-gray-100" /> <span>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM</span></p>
            </div>
            <h3 className="mt-6 text-lg font-bold text-white">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <FaFacebookF className="cursor-pointer text-gray-100 hover:text-blue-600 transition duration-300" />
              <FaTwitter className="cursor-pointer text-gray-100 hover:text-blue-400 transition duration-300" />
              <FaInstagram className="cursor-pointer text-gray-100 hover:text-pink-500 transition duration-300" />
              <FaLinkedinIn className="cursor-pointer text-gray-100 hover:text-blue-700 transition duration-300" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 flex flex-col space-y-4 items-center justify-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Send Us a Message</h2>
            <ContactForm isModal={false} />
          </div>
        </div>
      </div>
      <RealEstateServices />
      <Footer />
    </div>
  );
};

export default Contactus;

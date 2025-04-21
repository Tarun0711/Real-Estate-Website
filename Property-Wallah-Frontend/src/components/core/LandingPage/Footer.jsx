import React from "react";
import { useNavigate } from "react-router";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start bg-[#151c22] overflow-hidden  w-full ">
      <div className="md:flex md:justify-around justify-between gap-4 w-full p-8">
        <div className="flex flex-row flex-wrap gap-4 md:w-[60%] justify-between">
          <div className="flex flex-col gap-4">
            <div className="text-white font-bold text-lg mb-2">Property Wallah</div>
            <div className="text-white font-medium text-base">Mobile Apps</div>
            <div className="text-white font-medium text-base">Our Services</div>
            <div className="text-white font-medium text-base">Post your Property</div>
            <div className="text-white font-medium text-base">Builders in India</div>
            <div className="text-white font-medium text-base">Articles</div>
            <div className="text-white font-medium text-base">Customer Service</div>
            <div className="text-white font-medium text-base">Sitemap</div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-white font-bold text-lg mb-2">Company</div>
            <div className="text-white font-medium text-base cursor-pointer" onClick={() => navigate("/aboutus")}>
              About us
            </div>
            <div className="text-white font-medium text-base cursor-pointer" onClick={() => navigate("/contactus")}>
              Contact us
            </div>
            <div className="text-white font-medium text-base">Careers with us</div>
            <div className="text-white font-medium text-base">Terms & Conditions</div>
            <div className="text-white font-medium text-base">Request Info</div>
            <div className="text-white font-medium text-base">Feedback</div>
            <div className="text-white font-medium text-base">Report a problem</div>
            <div className="text-white font-medium text-base">Testimonials</div>
            <div className="text-white font-medium text-base">Privacy Policy</div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-white font-bold text-lg mb-2">Our Partners</div>
            <div className="flex flex-col gap-4">
              <a href="https://www.vigya.in/" target="_blank" className="text-white font-medium text-base">
                Vigya.in - For IT Services And Solutions
              </a>
              <a href="https://www.aanganconnect.in/" target="_blank" className="text-white font-medium text-base">
                Aangan Connect - For Your Smart Society
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:w-[40%] ">
          <div className="text-white font-bold text-lg mb-2">Contact Us</div>
          <p className="text-white font-medium text-base">+919664265932 </p>
          <p className="text-white font-normal text-sm opacity-70 mt-1">Monday - Saturday (9:00Am to 7:00PM IST)</p>
          <div className="text-white font-normal text-xs mt-6">Email - bahadurdangi100@gmail.com </div>
          <div className="text-white font-bold text-lg mt-6">Connect with us</div>

          <div className="flex gap-4 mt-4">
            <a href="https://www.facebook.com/PropertyWallah/" target="_blank" className="text-white text-3xl">
              <Facebook />
            </a>
            <a href="https://www.youtube.com/user/PropertyWallahindia" target="_blank" className="text-white text-3xl">
              <YouTube />
            </a>
            <a href="https://twitter.com/PropertyWallahIndia" target="_blank" className="text-white text-3xl">
              <Twitter />
            </a>
            <a href="https://www.instagram.com/PropertyWallahindia/" target="_blank" className="text-white text-3xl">
              <Instagram />
            </a>
          </div>

          <div className="text-white text-xs opacity-50 mt-4">
            *Usage of propertywallah.org to upload content showing area in non standard units or which enables targeting by religion/community/caste/race is prohibited. Please report inappropriate content by writing to us at <span className="text-blue-500 font-medium">report abuse</span>
          </div>

          <p className="text-white font-medium text-base mt-4">
            All trademarks are the property of their respective owners.
          </p>

          <p className="text-white font-medium text-base mt-4">
            All rights reserved - Vigya.in
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

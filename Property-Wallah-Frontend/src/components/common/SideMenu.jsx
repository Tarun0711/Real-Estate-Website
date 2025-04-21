import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import LoginModal from "../core/Auth/LoginRegister";
import { Link } from "react-router-dom";
import { ArrowRight } from "@mui/icons-material";

const PropertiesLinks = [
  {
    label: "Post Property",
    link: "/post-property",
  },
  {
    label: "Commercial Properties",
    link: "/properties?propertyType=commercial",
  },
  {
    label: "Residential Properties",
    link: "/properties?propertyType=residential",
  },
];
const PlansLinks = [
  {
    label: "Plans",
    subLinks: [
      {
        label: "For Brokers",
        link: "/plans?selectedPlanType=brokers",
      },
      {
        label: "For Builders",
        link: "/plans",
      },
    ],
  },

];

const handlePlanLinkClick = (role) => {
  setActiveLink(null);
  setShowPlansSubLinks(false);
  onClose();
};

function SideMenu({ open, onClose }) {
  const { pwUser } = useSelector((state) => state.profile);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showPlansSubLinks, setShowPlansSubLinks] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const togglePlansSubLinks = (link) => {
    if (activeLink === link) {
      setShowPlansSubLinks(!showPlansSubLinks);
    } else {
      setActiveLink(link);
      setShowPlansSubLinks(true);
    }
  };

  return (
    <CSSTransition in={open} timeout={500} classNames="slide" unmountOnExit>
      <div className="md:w-[300px] w-full fixed shadow-xl overflow-hidden top-16 h-[92vh] right-0 rounded-l-lg bg-white">
        <div className="flex relative flex-col">
          <button
            onClick={onClose}
            className="text-gray-500 absolute top-0 right-4 p-3 hover:text-gray-800"
          >
            &#x2715;
          </button>
          <div className="flex flex-col h-full overflow-y-auto">
            {pwUser ? (
              <div className="flex bg-blue-100 p-2 font-bold text-cyan-600 items-center gap-2">
                Welcome Back! {pwUser.name}
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="flex bg-blue-100 p-2 font-bold text-cyan-600 items-center gap-2"
              >
                Login / Register
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500 p-2">Explore Property Wallah</p>
          {PropertiesLinks.map((link) => (
            <Link
              key={link.label}
              to={link.link}
              className="flex p-2 px-4 font-medium items-center text-blue-400 justify-between gap-2"
            >
              {link.label} <ArrowRight />
            </Link>
          ))}
          <p className="text-sm text-gray-500 p-2">Plans And Pricing</p>
          {PlansLinks.map((link) => (
            <div key={link.label}>
              <CSSTransition
                in={activeLink === link && showPlansSubLinks}
                timeout={300}
                classNames="slide"
                unmountOnExit
              >
                <div className="pl-4">
                  {link.subLinks.map((subLink) => (
                    <Link
                      key={subLink.label}
                      to={subLink.link}
                      className="flex p-2 px-4  items-center text-magenta-500 justify-between gap-2"
                      onClick={() => handlePlanLinkClick(subLink.label)}
                    >
                      {subLink.label} <ArrowRight />
                    </Link>
                  ))}
                </div>
              </CSSTransition>
              {!(activeLink === link && showPlansSubLinks) && (
                <button
                  onClick={() => togglePlansSubLinks(link)}
                  className="flex p-2 px-4 font-medium items-center text-blue-400 justify-between gap-2 w-full text-left"
                >
                  {link.label} <ArrowRight />
                </button>
              )}
            </div>
          ))}
          <p className="text-sm text-gray-500 p-2">Quick Links</p>
          <Link
            to="/info/about-us"
            className="flex p-2 px-4  items-center justify-between gap-2"
          >
            About Us <ArrowRight />
          </Link>
          <Link
            to="/help"
            className="flex p-2 px-4  items-center justify-between gap-2"
          >
            Help <ArrowRight />
          </Link>
          <Link
            to="/contact-us"
            className="flex p-2 px-4  items-center justify-between gap-2"
          >
            Contact Us <ArrowRight />
          </Link>
          <Link
            to="/info/term-and-conditions"
            className="flex p-2 px-4  items-center justify-between gap-2"
          >
            Terms & Conditions <ArrowRight />
          </Link>
          <Link
            to="/info/privacy-policy"
            className="flex p-2 px-4  items-center justify-between gap-2"
          >
            Privacy Policy <ArrowRight />
          </Link>
        </div> 
        <LoginModal open={isLoginModalOpen} handleClose={closeLoginModal} />
      </div>
    </CSSTransition>
  );
}

export default SideMenu;

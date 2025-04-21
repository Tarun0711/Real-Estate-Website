import CallbackModal from "../components/core/Plans/CallBackModal";
import { Navbar } from "../components/common/Navbar";
import React, { useState, useEffect } from "react";
import PricingCard from "../components/core/Plans/PricingCard";
import BossBenefits from "../components/core/Plans/Benefits";
import ListingPack from "../components/core/Plans/ListingPack";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../styles/animations.css"; // Make sure to create this CSS file for animations
import { useLocation } from "react-router-dom";

const Plans = [
  {
    name: "SMART 25",
    plans: [
      {
        duration: "1 month",
        pricePerMonth: 1497,
        totalPrice: 1497,
        contacts: 25,
        discount: 0,
      },
      {
        duration: "6 months",
        pricePerMonth: 1197,
        totalPrice: 7182,
        contacts: 150,
        discount: 20,
      },
      {
        duration: "12 months",
        pricePerMonth: 997,
        totalPrice: 11964,
        contacts: 300,
        discount: 33,
      },
    ],
  },
  {
    "name": "SMART 50",
    "plans": [
      {
        "duration": "1 month",
        "pricePerMonth": 2995,
        "totalPrice": 2995,
        "contacts": 50,
        "discount": 0
      },
      {
        "duration": "6 months",
        "pricePerMonth": 2495,
        "totalPrice": 14970,
        "contacts": 300,
        "discount": 16.7
      },
      {
        "duration": "12 months",
        "pricePerMonth": 2175,
        "totalPrice": 26100,
        "contacts": 450,
        "discount": 27.4
      }
    ]
  }  
];

function PlansScreen({ selectedRoleProp }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(selectedRoleProp || "Broker");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const role = params.get("selectedPlanType");
    if (role) {
      setSelectedRole(role.charAt(0).toUpperCase() + role.slice(1));
    }
  }, [location]);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="h- pb-2 w-full flex flex-col items-center justify-center bg-blue-500 rounded-b-3xl">
        <h1 className="text-center mt-16 text-white text-3xl flex gap-4 font-semibold">
        <img class="landingBoc__topImageLeft" src="https://static.99acres.com/universalapp/img/bocLeftStroke.png" width="13" height="25"/>
          {selectedRole === "Broker"
            ? "SMART - Solutions for Market Access and Realty Transactions"
            : "BUILD - Best Utility in Listings and Deals"}
        <img class="landingBoc__topImageLeft" src="https://static.99acres.com/universalapp/img/bocLeftStroke.png" width="13" className=" rotate-180" height="25"/>

        </h1>
        <div className="mt-6 w-[40%] px-4 rounded-md bg-white bg-opacity-80 py-2 flex gap-4 items-center justify-start ">
          <button
            className={`px-4 py-2 rounded ${selectedRole === "Broker" ? "bg-blue-500 text-white" : " bg-white text-blue-500"}`}
            onClick={() => setSelectedRole("Broker")}
          >
            Broker
          </button>
          <button
            className={`px-4 py-2 rounded ${selectedRole === "Builder" ? "bg-blue-500 text-white" : " bg-white text-blue-500"}`}
            onClick={() => setSelectedRole("Builder")}
          >
            Builder
          </button>
          <p className="text-sm text-gray-700">
            Choose your role to get the best {selectedRole === "Broker" ? "market access" : "utility"}!
          </p>
        </div>
        <div className="mt-6 w-full flex gap-4 items-center justify-center ">
          <TransitionGroup className="w-full flex gap-4 items-center justify-center">
            <CSSTransition
              key={selectedRole}
              timeout={500}
              classNames="fade"
            >
              <div className="w-full flex gap-4 items-center justify-center">
                {selectedRole === "Broker" ? (
                  Plans.map((planGroup) => (
                    <PricingCard
                      key={planGroup.name}
                      name={planGroup.name}
                      plans={planGroup.plans}
                    />
                  ))
                ) : (
                  <ListingPack />
                )}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
      <BossBenefits />
      <CallbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default PlansScreen;

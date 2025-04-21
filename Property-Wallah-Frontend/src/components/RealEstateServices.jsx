import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../Redux/Auth";
import LoginModal from "./core/Auth/LoginRegister";
import ServiceModal from "./ServiceModal"; 

export default function ServiceProvider() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    if (isAuthenticated) {
      setSelectedService(service);
    } else {
      setSelectedService("login");
    }
  };

  return (
    <div className="p-6">
      {/* Service Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <ServiceCard
          icon="🔧"
          title="Schedule a Service"
          description="Book a service appointment with our experts"
          buttonText="Book Now"
          onClick={() => handleServiceClick("service")}
        />
        <ServiceCard
          icon="💬"
          title="Consultation"
          description="Get a free consultation for your service needs"
          buttonText="Request Consultation"
          onClick={() => handleServiceClick("consultation")}
        />
        <ServiceCard
          icon="📅"
          title="Book Appointment"
          description="Meet with our service professionals"
          buttonText="Schedule Now"
          onClick={() => handleServiceClick("appointment")}
        />
      </div>

      {/* Quick Response Section */}
      <div className="mt-10 text-center bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold">Quick Response Promise</h3>
        <p className="text-gray-600 mt-2">
          We aim to respond to all inquiries within 24 hours during business hours
        </p>
      </div>

      {/* Modals */}
      {selectedService === "login" && <LoginModal open={true} />}
      {selectedService && selectedService !== "login" && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </div>
  );
}

function ServiceCard({ icon, title, description, buttonText, onClick }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow text-center mt-8">
      <div className=" w-12 h-12 flex items-center justify-center rounded-full mx-auto">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <button
        className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}

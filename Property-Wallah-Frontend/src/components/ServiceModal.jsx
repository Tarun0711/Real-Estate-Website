import React, { useEffect, useMemo } from "react";
import Modal from "./core/Modal";
import { useSelector } from "react-redux";
import ServiceAppointmentForm from "./forms/ServiceAppointmentForm";
import ConsultationRequestForm from "./forms/ConsultationRequestForm";
import AppointmentBookingForm from "./forms/AppointmentBookingForm";

export default function ServiceModal({ service, onClose }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const memoizedIsLoggedIn = useMemo(() => isLoggedIn, [isLoggedIn]);

  useEffect(() => {
    if (!memoizedIsLoggedIn) {
      onClose();
    }
  }, [memoizedIsLoggedIn, onClose]);

  const renderContent = () => {
    switch (service) {
      case "service":
        return <ServiceAppointmentForm />;
      case "consultation":
        return <ConsultationRequestForm />;
      case "appointment":
        return <AppointmentBookingForm />;
      default:
        return null;
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">{service}</h2>
        {renderContent()}
      </div>
    </Modal>
  );
}

import React, { useState } from "react";

const PricingCard = ({ name, plans }) => {
  const [selectedPlan, setSelectedPlan] = useState("12 months");

  return (
    <div className="w-[400px] border rounded-lg shadow-lg p-6 bg-white">
      <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-600">25 Contacts Access /month</p>
      <p className="text-sm text-gray-500 mt-2">Starter plan to access contacts</p>

      <div className="mt-4 space-y-4">
        {plans.map((plan) => (
          <label
            key={plan.duration}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:shadow-md transition duration-200 ${
              selectedPlan === plan.duration ? "border-blue-500 bg-blue-100" : "border-gray-200"
            }`}
          >
            <div>
              <input
                type="radio"
                name="plan"
                value={plan.duration}
                checked={selectedPlan === plan.duration}
                onChange={() => setSelectedPlan(plan.duration)}
                className="hidden"
              />
              <span className="block font-medium text-gray-800">{plan.duration}</span>
              {plan.discount > 0 && (
                <span className="text-green-500 text-sm">SAVE {plan.discount}%</span>
              )}
              <p className="text-sm text-gray-500">Access {plan.contacts} contacts</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-800">₹{plan.pricePerMonth}/mo.
              </p>
              <p className="text-sm text-gray-500">₹{plan.totalPrice}</p>
            </div>
          </label>
        ))}
      </div>

      <button
        className="mt-6 w-full bg-blue-500 text-white text-sm font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Buy {selectedPlan} plan
      </button>
    </div>
  );
};

export default PricingCard;

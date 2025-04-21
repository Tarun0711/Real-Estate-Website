import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";

const initialFormValues = {
  reason: "",
  dealer: "",
  phone: "",
  plan: "",
  homeLoan: false,
  siteVisit: false,
  terms: false,
};

const RadioGroup = ({ label, name, options = [], onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-2">{label}</label>
    <div className="space-x-4">
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center">
          <input
            type="radio"
            name={name}
            value={option.value}
            className="mr-2"
            onChange={onChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  </div>
);

const Checkbox = ({ label, name, checked, onChange }) => (
  <div className="mb-4">
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      {label}
    </label>
  </div>
);

const ContactOwner = ({ open, email, propId, setOpen }) => {
  const [formData, setFormData] = useState({
    ...initialFormValues,
    email,
    propId,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [type === "checkbox" ? name : name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone) {
      alert("Phone is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const token = "your-auth-token";
      const response = await axios.post(
        "http://localhost:9002/api/v1/contact/contact",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from API:", response.data);
      alert("Form submitted successfully!");
      setOpen(false);
      resetForm();
    } catch (err) {
      console.error("Error submitting the form:", err);
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ ...initialFormValues, email, propId });
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        resetForm();
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{ "& .MuiBackdrop-root": { backgroundColor: "rgba(0,0,0,0.9)" } }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={() => {
              setOpen(false);
              resetForm();
            }}
          >
            &times;
          </button>
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-bold mb-4">Basic Information</h3>
            <RadioGroup
              label="Your reason to buy is:"
              name="reason"
              options={[
                { value: "investment", label: "Investment" },
                { value: "self-use", label: "Self Use" },
              ]}
              onChange={handleChange}
            />
            <RadioGroup
              label="Are you a property dealer?"
              name="dealer"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              onChange={handleChange}
            />
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="+91 9817761746"
                required
              />
            </div>
            <h3 className="text-lg font-bold mb-4">Optional Information</h3>
            <RadioGroup
              label="Planning to buy property:"
              name="plan"
              options={[
                { value: "3months", label: "3 months" },
                { value: "6months", label: "6 months" },
                { value: "more", label: "More than 6 months" },
              ]}
              onChange={handleChange}
            />
            <Checkbox
              name="homeLoan"
              label="I am interested in home loan"
              checked={formData.homeLoan}
              onChange={handleChange}
            />
            <Checkbox
              name="siteVisit"
              label="I am interested in site visits"
              checked={formData.siteVisit}
              onChange={handleChange}
            />
            <Checkbox
              name="terms"
              label={
                <>
                  I agree to the{" "}
                  <a href="#" className="text-blue-500 underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-500 underline">
                    Privacy Policy
                  </a>
                </>
              }
              checked={formData.terms}
              onChange={handleChange}
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className={`w-full text-white py-2 px-4 rounded ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ContactOwner;

import React, { useState } from "react";
import {
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../../../components/common/Navbar";
import { createSociety } from "../../../Services/Operations/SocietyServices";

const bhkOptions = ["1BHK", "2BHK", "3BHK", "4BHK", "5BHK+"];
const amenitiesOptions = [
  "🎭 Mini Theatre",
"🏊Swimming Pool",
"📽️Conference Room",
"✂️ Salon",
"🎾 Tennis Court",
"🏸 Badminton Court",
"🏀 Basketball Court",
"🏏 Cricket Pitch",
"🏓 Table Tennis",
"🎯 Indoor Games",
"🎨 Art Room",
"🎤 Party Hall",
"🎡 Amphi Theatre",
"🎮 Video Games Room",
"💆 Spa",
"⛸️ Skating Rink",
"📚 Library",
"🧘Yoga/Meditation Area",
"🎮Indoor Games",
"🏋️Gym",
"🌳Garden",
"🛝Kids Play Area",
"🚗Parking",
];
const steps = ["Basic Info", "Society Details", "Pricing", "Contact & Amenities", "Upload Files"];

function SocietyForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    location: "",
    city: "",
    state: "",
    country: "",
    about: "",
    sellerContactType: "phone",
    sellerPhone: "",
    sellerEmail: "",
    additionalFeatures: [],
    images: [],
    brochure: null,
    priceRange: "",
    bhkTypes: [],
    amenities: [],
    status: "Ready to Move",
    expectedCompletionDate: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const files = name === "images" ? Array.from(e.target.files) : e.target.files[0];
    setFormData((prev) => ({ ...prev, [name]: files }));
  };

  const toggleSelection = (option, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(option)
        ? prev[field].filter((item) => item !== option)
        : [...prev[field], option],
    }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      additionalFeatures: [...prev.additionalFeatures, ""],
    }));
  };

  const handleAdditionalFeaturesChange = (index, value) => {
    const updatedFeatures = [...formData.additionalFeatures];
    updatedFeatures[index] = value;
    setFormData((prev) => ({ ...prev, additionalFeatures: updatedFeatures }));
  };

  const validateStep = () => {
    const newErrors = {};
    const requiredFields = {
      0: ["name", "companyName", "location", "city", "state", "country"],
      1: ["status", ...(formData.status === "Under Construction" ? ["expectedCompletionDate"] : []), "bhkTypes"],
      2: ["priceRange"],
      3: ["sellerContactType", "sellerPhone", "sellerEmail"],
    };

    (requiredFields[step] || []).forEach((field) => {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) value.forEach((item) => data.append(key, item));
      else data.append(key, value);
    });

    try {
      await dispatch(createSociety(data));
      setFormData({
        name: "",
        companyName: "",
        location: "",
        city: "",
        state: "",
        country: "",
        about: "",
        sellerContactType: "phone",
        sellerPhone: "",
        sellerEmail: "",
        additionalFeatures: [],
        images: [],
        brochure: null,
        priceRange: "",
        bhkTypes: [],
        amenities: [],
        status: "Ready to Move",
        expectedCompletionDate: "",
      });
      setErrors({});
      setStep(0);
      // Clear uploaded files
      document.querySelector('input[type="file"]').value = "";
      document.querySelector('input[type="file"]').files = [];
      // Clear uploaded brochure
      document.querySelector('input[type="file"][accept=".pdf"]').value = "";
      document.querySelector('input[type="file"][accept=".pdf"]').files = [];
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  // Reusable Components
  const renderTextField = (label, name, type = "text", required = true) => (
    <TextField
      label={label}
      name={name}
      type={type}
      value={formData[name]}
      onChange={handleChange}
      fullWidth
      required={required}
      error={!!errors[name]}
      helperText={errors[name]}
    />
  );

  const renderSelectField = (label, name, options) => (
    <FormControl fullWidth error={!!errors[name]}>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={formData[name]} onChange={handleChange}>
        {options.map((option, idx) => (
          <MenuItem key={idx} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {errors[name] && <Typography color="error">{errors[name]}</Typography>}
    </FormControl>
  );

  const renderChips = (options, field) => (
    <Stack direction="row" spacing={1} gap={1} flexWrap="wrap">
      {options.map((option, idx) => (
        <Chip
          key={idx}
          label={option}
          color={formData[field].includes(option) ? "primary" : "default"}
          onClick={() => toggleSelection(option, field)}
        />
      ))}
    </Stack>
  );

  const renderStepContent = (currentStep) => {
    const stepContent = [
      <Stack spacing={2}>
        {renderTextField("Society Name", "name")}
        {renderTextField("Company Name", "companyName")}
        {renderTextField("Location", "location")}
        {renderTextField("City", "city")}
        {renderTextField("State", "state")}
        {renderTextField("Country", "country")}
      </Stack>,
      <Stack spacing={2}>
        {renderSelectField("Status", "status", ["Ready to Move", "Under Construction", "Launch", "Completed", "Cancelled"])}
        {formData.status === "Under Construction" &&
          renderTextField("Expected Completion Date", "expectedCompletionDate", "date")}
        <Box>
          <Typography>Select BHK Types:</Typography>
          {renderChips(bhkOptions, "bhkTypes")}
          {errors.bhkTypes && <Typography color="error">{errors.bhkTypes}</Typography>}
        </Box>
      </Stack>,
      renderTextField("Price Range (e.g., 50 Lakhs - 1 Crore)", "priceRange"),
      <Stack spacing={2}>
        <FormControl fullWidth error={!!errors.sellerContactType}>
          <InputLabel>Contact Type</InputLabel>
          <Select
            name="sellerContactType"
            value={formData.sellerContactType}
            onChange={handleChange}
          >
            <MenuItem value="phone">Phone</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
          {errors.sellerContactType && <Typography color="error">{errors.sellerContactType}</Typography>}
        </FormControl>
        {renderTextField("Seller Phone", "sellerPhone")}
        {renderTextField("Seller Email", "sellerEmail")}
        <Box>
          <Typography>Select Amenities:</Typography>
          {renderChips(amenitiesOptions, "amenities")}
        </Box>
        {formData.additionalFeatures.map((feature, idx) => (
          <TextField
            key={idx}
            label={`Additional Feature ${idx + 1}`}
            value={feature}
            onChange={(e) => handleAdditionalFeaturesChange(idx, e.target.value)}
            fullWidth
            required
          />
        ))}
        <Button variant="outlined" onClick={addFeature}>
          Add Additional Feature
        </Button>
      </Stack>,
      <Stack spacing={2}>
        <Box>
          <Typography>Upload Brochure:</Typography>
          <input type="file" name="brochure" accept=".pptx" onChange={handleFileChange} />
        </Box>
        <Box>
          <Typography>Upload Images:</Typography>
          <input type="file" name="images" accept="image/*" multiple onChange={handleFileChange} />
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {formData.images.map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt={`Preview ${idx}`}
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
            ))}
          </Stack>
        </Box>
      </Stack>,
    ];
    return stepContent[currentStep] || "Unknown step";
  };

  return (
    <>
    <Navbar isHome={true} />
    <Box sx={{ maxWidth: 600, mx: "auto", pt: 10 ,}}>
      <Typography variant="h4" gutterBottom>
        Add Society
      </Typography>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label, idx) => (
          <Step key={idx}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit}>
        <Box mt={4}>{renderStepContent(step)}</Box>
        <Box mt={4} display="flex" justifyContent="space-between">
          {step > 0 && (
            <Button variant="contained" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button variant="contained" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          )}
        </Box>
      </form>
    </Box>
    </>
  );
}

export default SocietyForm;

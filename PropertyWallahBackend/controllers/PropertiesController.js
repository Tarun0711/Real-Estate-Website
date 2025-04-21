const Property = require("../models/propertyModel");
const mailSender = require("../config/mailSender");
const { validationResult } = require("express-validator");

// Create a new property
const createProperty = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      category,
      propertyType,
      postedBy,
      formData,
    } = req.body;

    console.log(req.body);

    const requiredFields = [
      "subCategory", "selectedIntent", "selectedSubtype", "city", "locality",
      "subLocality", "apartment", "houseNo", "state", "bedrooms", "bathrooms",
      "balconies", "totalFloors", "floorNo", "furnishing", "facing", "ageOfProperty",
      "price", "expectedRent", "isNegotiable", "electricityCharges", "waterCharges",
      "securityDeposit", "agreementDurationMonths", "noticePeriodMonths",
      "additionalRentDetails", "propertyFeatures", "societyFeatures", "waterSource",
      "overlooking", "otherFeatures", "powerBackup"
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return res.status(400).json({ message: `${field} is required in form data.` });
      }
    }

    // Handle file uploads (photos and videos)
    const photoPaths = req.files?.photos?.map((file) => file.path) || [];
    const videoPaths = req.files?.videos?.map((file) => file.path) || [];

    // Create the property
    const property = new Property({
      category,
      propertyType,
      postedBy,
      ...formData,
      media: {
        photos: photoPaths,
        videos: videoPaths,
      },
    });

    // Save the property
    await property.save();

    // Send email notifications
    const adminEmail = process.env.ADMIN_MAIL;
    const adminSubject = "New Property Added to Queue";
    const adminBody = `A new property has been added to the queue. Please verify it. Property ID: ${property._id}`;

    const ownerSubject = "Your Property is Under Verification";
    const ownerBody = `Your property has been successfully added to our platform and is currently under verification. We will notify you once it's verified. Property ID: ${property._id}`;

    await Promise.all([
      mailSender(adminEmail, adminSubject, adminBody),
    ]);

    res.status(200).json({
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Server error occurred while creating the property." });
  }
};

// Get property by ID
const getPropertyById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    // Find property with populated details
    const property = await Property.findById(id)
      .populate("postedBy", "name email");

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ property });
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update property by ID
const updateProperty = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const photoPaths = req.files["photos"]
      ? req.files["photos"].map((file) => file.path)
      : [];
    const videoPaths = req.files["videos"]
      ? req.files["videos"].map((file) => file.path)
      : [];
    const updateData = {
      ...req.body,
      media: { photos: photoPaths, videos: videoPaths },
    };

    // Find and update property
    const property = await Property.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res
      .status(200)
      .json({ message: "Property updated successfully", property });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete property by ID
const deleteProperty = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    // Find and delete property
    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all properties with filtering and pagination
const getAllProperties = async (req, res) => {
  try {
    const { category, propertyType, subType, page = 1, limit = 10 } = req.query;

    // Build filter based on query params
    const filter = {};
    if (category) filter.category = category;
    if (propertyType) filter.propertyType = propertyType;
    if (subType) filter.subType = subType;

    const properties = await Property.find(filter)
      .populate("postedBy", "name email")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Property.countDocuments(filter);

    res.status(200).json({
      properties,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const propertyId = req.params.id;
    const newStatus = req.body.status;
    const reason = req.body.reason;

    if (!propertyId || !newStatus) {
      return res
        .status(400)
        .json({ error: "Property ID and new status are required" });
    }

    if (!["Listed", "UnderVerification", "Unlisted"].includes(newStatus)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const property = await Property.findById(propertyId).populate("postedBy");

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    property.status = newStatus;
    await property.save();

    const ownerEmail = property.postedBy.email;
    let ownerSubject;
    let ownerBody;

    if (newStatus === "Unlisted") {
      ownerSubject = "Your Property has been Unlisted";
      ownerBody = `Your property has been unlisted. Reason: ${
        reason || "No reason provided."
      }`;
    } else if (newStatus === "Listed") {
      ownerSubject = "Your Property is Listed";
      ownerBody = `Congratulations! Your property has been successfully listed. Current status: ${newStatus}`;
    } else {
      ownerSubject = "Your Property is Under Verification";
      ownerBody = `Your property is currently under verification. We will notify you once it's verified. Current status: ${newStatus}`;
    }

    await mailSender(ownerEmail, ownerSubject, ownerBody);

    res.json({ message: "Property status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  updateStatus,
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getAllProperties,
};

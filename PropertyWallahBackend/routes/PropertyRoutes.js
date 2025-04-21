const express = require("express");
const router = express.Router();
const multer = require("multer");
const Property = require("../models/propertyModel");
const { validationResult } = require("express-validator");
const protectRoute = require("../MiddleWares/Protected.js");
const mailSender = require("../config/mailSender");

// Multer configuration for media uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "photos") {
      cb(null, "uploads/photos/");
    } else if (file.fieldname === "videos") {
      cb(null, "uploads/videos/");
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Create a new property
// Create a new property
router.post(
  "/properties",
  protectRoute,
  upload.fields([{ name: "photos" }, { name: "videos" }]),
  async (req, res) => {
    try {
      const { formData } = req.body; // Extract the formData object from the request body
      if (!formData) {
        return res.status(400).json({ message: "Invalid request, formData is missing" });
      }
      const isFinished=req.body.isFinished

      const {
        title,
        description,
        category,
        propertyType,
        subCategory,
        additionalRooms,
        parking,
        location,
        propertyProfile,
        rentDetails,
        powerBackup,
        uniqueDescription,
        mobileNumber,
        overlooking,
        societyFeatures,
        otherFeatures,
        waterSource,
      } = formData;
      console.log(formData)

      const user = req.user;

      // Extract uploaded file paths
      const photos = req.files?.photos?.map((file) => file.path) || [];
      const videos = req.files?.videos?.map((file) => file.path) || [];

      // Create property object
      const property = new Property({
        title,
        description,
        category: propertyType || "Sell",
        propertyType: category || "Residential",
        subCategory: subCategory || "Apartment",
        postedBy: user._id,
        mobileNumber,
        propertyProfile,
        location,
        rentDetails,
        powerBackup,
        waterSource,
        additionalRooms,
        uniqueDescription,
        amenities: overlooking,
        features: societyFeatures,
        otherFeatures,
        parking,
        media: {
          photos:photos,
          videos:videos
        },
        isFinished
      });

      // Save property to the database
      await property.save();

      // Notify admin and property owner via email
      const adminEmail = process.env.ADMIN_MAIL;
      const adminSubject = "New Property Added to Queue";
      const adminBody = `A new property has been added to the queue. Please verify it. Property ID: ${property._id}`;
      const sellerContact = user.email;
      const ownerSubject = "Your Property is Under Verification";
      const ownerBody = `Your property has been successfully added to our platform and is currently under verification. We will notify you once it's verified. Property ID: ${property._id}`;

      await Promise.all([
        mailSender(adminEmail, adminSubject, adminBody),
        mailSender(sellerContact, ownerSubject, ownerBody),
      ]);

      res.status(201).json({
        message: "Property created successfully",
        success: true,
        property,
      });
    } catch (error) {
      console.error("Error creating property:", error);
      res.status(500).json({
        message: "Server error occurred while creating the property.",
      });
    }
  }
); 


// Fetch all properties with filtering
router.get("/properties", async (req, res) => {
  try {
    const filters = req.query; 
    const properties = await Property.find(filters)
      .sort({ createdAt: -1 });
      console.log(properties)
      res.status(200).json({
        success: true,
        message: 'Properties retrieved successfully',
        data: properties
      });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res
      .status(500)
      .json({ message: "Server error occurred while fetching properties." });
  }
});

// Fetch a single property by ID
router.get("/properties/:id", protectRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id).populate(
      "postedBy"
      ,
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    res.status(200).json({
      message: "Property retrieved successfully",
      success: true,
      data: property,
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    res
      .status(500)
      .json({ message: "Server error occurred while fetching the property." });
  }
});

// Update a property by ID
router.put(
  "/properties/:id",
  protectRoute,
  upload.fields([{ name: "photos" }, { name: "videos" }]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Handle media uploads
      if (req.files?.photos) {
        updates["media.photos"] = req.files.photos.map((file) => file.path);
      }
      if (req.files?.videos) {
        updates["media.videos"] = req.files.videos.map((file) => file.path);
      }

      const property = await Property.findByIdAndUpdate(id, updates, {
        new: true,
      });

      if (!property) {
        return res.status(404).json({ message: "Property not found." });
      }

      res.status(200).json({
        message: "Property updated successfully",
        property,
      });
    } catch (error) {
      console.error("Error updating property:", error);
      res
        .status(500)
        .json({
          message: "Server error occurred while updating the property.",
        });
    }
  }
);

// Delete a property by ID
router.delete("/properties/:id", protectRoute, async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    res.status(200).json({ message: "Property deleted successfully." });
  } catch (error) {
    console.error("Error deleting property:", error);
    res
      .status(500)
      .json({ message: "Server error occurred while deleting the property." });
  }
});

// Update property status
router.patch("/properties/:id/status", protectRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Listed", "UnderVerification", "Unlisted"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const property = await Property.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    res.status(200).json({
      message: "Property status updated successfully",
      property,
    });
  } catch (error) {
    console.error("Error updating property status:", error);
    res
      .status(500)
      .json({
        message: "Server error occurred while updating property status.",
      });
  }
});

module.exports = router;

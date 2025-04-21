const mongoose = require("mongoose");
const Society = require("../models/Societymodel");
const SocietyDetails = require("../models/SocietyDetailsModel");
const SellerContact = require("../models/SellerModel");

/**
 * Get all societies with nested references (Details and SellerContact).
 */
const getAllSocieties = async (req, res) => {
  try {
    const societies = await Society.find()


    res.status(200).json({
      success: true,
      count: societies.length,
      data: societies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
};

/**
 * Get a single society by ID with nested references.
 */
const getSocietyById = async (req, res) => {
  try {
    const society = await Society.findById(req.params.id)
    if (!society) {
      return res.status(404).json({
        success: false,
        error: "Society not found",
      });
    }

    res.status(200).json({
      success: true,
      data: society,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
};

/**
 * Create a new society.
 */
const createSociety = async (req, res) => {
  try {
    const {
      name,
      companyName,
      location,
      city,
      state,
      country,
      about,
      sellerContactType,
      sellerPhone,
      sellerEmail,
      additionalFeatures,
      priceRange,
      bhkTypes,
      amenities,
      status,
      expectedCompletionDate,
    } = req.body;

    // Process images array and remove 'upload\\' prefix
    const images = req.files?.images?.map((file) => file.path.replace('upload\\', '')) || [];

    // Handle single brochure upload and remove 'upload\\' prefix
    const brochure = req.files?.brochure
      ? Array.isArray(req.files.brochure)
        ? req.files.brochure.map((file) => file.path.replace('upload\\', ''))
        : req.files.brochure.path.replace('upload\\', '')
      : null;

    // Create society
    const society = await Society.create({
      name,
      companyName,
      location,
      city,
      state,
      country,
      about,
      sellerContactType,
      sellerPhone,
      sellerEmail,
      additionalFeatures,
      images,
      brochure,
      priceRange,
      bhkTypes,
      amenities,
      status,
      expectedCompletionDate,
    });

    res.status(201).json({
      success: true,
      data: society,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create society",
      message: error.message,
    });
  }
};

/**
 * Update society by ID.
 */
const updateSociety = async (req, res) => {
  try {
    const {
      name,
      companyName,
      location,
      city,
      state,
      country,
      about,
      sellerContactType,
      sellerPhone,
      sellerEmail,
      additionalFeatures,
      priceRange,
      bhkTypes,
      amenities,
      status,
      expectedCompletionDate,
    } = req.body;

    // Process images array and remove 'upload\\' prefix
    const images = req.files?.images?.map((file) => file.path.replace('upload\\', '')) || [];

    // Handle single brochure upload and remove 'upload\\' prefix
    const brochure = req.files?.brochure
      ? Array.isArray(req.files.brochure)
        ? req.files.brochure.map((file) => file.path.replace('upload\\', ''))
        : req.files.brochure.path.replace('upload\\', '')
      : null;

    const society = await Society.findByIdAndUpdate(
      req.params.id,
      {
        name,
        companyName,
        location,
        city,
        state,
        country,
        about,
        sellerContactType,
        sellerPhone,
        sellerEmail,
        additionalFeatures,
        images,
        brochure,
        priceRange,
        bhkTypes,
        amenities,
        status,
        expectedCompletionDate,
      },
      { new: true }
    );

    if (!society) {
      return res.status(404).json({
        success: false,
        error: "Society not found",
      });
    }
    res.status(200).json({
      success: true,
      data: society,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update society",
      message: error.message,
    });
  }
};

const deleteSociety = async (req, res) => {
  try {
    const society = await Society.findByIdAndDelete(req.params.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        error: "Society not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Society deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete society",
      message: error.message,
    });
  }
};

/**
 * Create Society Details.
 */
const createSocietyDetails = async (req, res) => {
  try {
    const details = await SocietyDetails.create(req.body);
    res.status(201).json({
      success: true,
      data: details,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create society details",
      message: error.message,
    });
  }
};

/**
 * Create Seller Contact.
 */
const createSellerContact = async (req, res) => {
  try {
    const contact = await SellerContact.create(req.body);

    res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create seller contact",
      message: error.message,
    });
  }
};

/**
 * Get Seller Contact by ID.
 */
const getSellerContactById = async (req, res) => {
  try {
    const contact = await SellerContact.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to retrieve seller contact",
      message: error.message,
    });
  }
};

/**
 * Update Seller Contact by ID.
 */
const updateSellerContact = async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;

    const contact = await SellerContact.findByIdAndUpdate(
      req.params.id,
      { name, phone, email, address },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Seller contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update seller contact",
      message: error.message,
    });
  }
};

/**
 * Delete Seller Contact by ID.
 */
const deleteSellerContact = async (req, res) => {
  try {
    const contact = await SellerContact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Seller contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Seller contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete seller contact",
      message: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const societyID = req.params.id;
    const newStatus = req.body.status;

    // Validate presence of societyID and newStatus
    if (!societyID || !newStatus) {
      return res.status(400).json({
        success: false,
        error: "Society ID and new status are required.",
      });
    }

    // Define allowed status values based on Society schema
    const allowedStatuses = ["Listed", "UnderVerification", "Unlisted"];

    if (!allowedStatuses.includes(newStatus)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid status value." });
    }

    // Find the society and update the status field
    const society = await Society.findById(societyID);

    if (!society) {
      return res
        .status(404)
        .json({ success: false, error: "Society not found." });
    }

    // Update the societyStatus field
    society.societyStatus = newStatus;
    await society.save();

    res.status(200).json({
      success: true,
      message: "Society status updated successfully.",
      data: society,
    });
  } catch (err) {
    console.error("Error updating society status:", err);
    res.status(500).json({ success: false, error: "Internal Server Error." });
  }
};

module.exports = {
  updateStatus,
  getAllSocieties,
  getSocietyById,
  createSociety,
  updateSociety,
  deleteSociety,
  createSocietyDetails,
  createSellerContact,
  getSellerContactById,
  updateSellerContact,
  deleteSellerContact,
};

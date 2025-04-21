const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SocietySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true, 
    },
    about: {
      type: String,
    },
    sellerContactType: {
      type: String,
      enum: ["phone", "email"],
      required: true,
    },
    sellerPhone: {
      type: String,
      required: true,
    },
    sellerEmail: {
      type: String,
      required: true,
    },
    additionalFeatures: {
      type: [String],
      default: [],
    },
    images: [{ type: String }],
    brochure: {
      type: [String],
      required: true,
    },
    priceRange: {
      type: String,
      required: true,
    },
    bhkTypes: {
      type: [String],
      required: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      required: true,
    },
    expectedCompletionDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Society", SocietySchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema for property options
const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Sell", "Rent / Lease", "PG", "Residential"],
      required: true,
    },
    propertyType: {
      type: String,
      enum: ["Residential", "Commercial"],
      required: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Listed", "UnderVerification", "Unlisted"],
      default: "UnderVerification",
    },
    mobileNumber:{
      type:String,  
      required:true
    },
    media: {
      photos: [
        {
          type: String,
          match: [/^https?:\/\/.+/, "Please provide a valid URL"],
        },
      ],
      videos: [
        {
          type: String,
          match: [/^https?:\/\/.+/, "Please provide a valid URL"],
        },
      ],
    },
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      locality: { type: String, required: true },
      subLocality: { type: String },
      apartment: { type: String },
      houseNo: { type: String },
    },
    propertyProfile: {
      bedrooms: { type: String, min: 0, required: true },
      bathrooms: { type: String, min: 0, required: true },
      balconies: { type: String, min: 0 },
      // area: { type: Number, required: true },
      totalFloors: { type: String },
      floorNo: { type: String },
      ageOfProperty: { type: String },
      rentOutTo: {
        type: String,
        enum: ["SingleMan", "SingleWoman", "Family"],
      },
      furnishing: {
        type: String,
        enum: ["Furnished", "Semi-Furnished", "Unfurnished"], // Add "Unfurnished" to enum
        required: true,
      },
          },
    rentDetails: {
      expectedRent: { type: Number },
      isNegotiable: { type: Boolean, default: false },
      electricityCharges: { type: Boolean, default: false },
      waterCharges: { type: Boolean, default: false },
      securityDeposit: { type: Number },
      agreementDurationMonths: { type: Number },
      noticePeriodMonths: { type: Number },
      additionalRentDetails: {
        maintenance: { type: Number },
        bookingAmount: { type: Number },
        membershipCharges: { type: Number },
        otherCharges: { type: String },
      },
    },
    additionalRooms: [{ type: String }],
    // agreementType: {
    //   preferredAgreement: {
    //     type: String,
    //     enum: ["companyLease", "regularAgreement"],
    //   },
    //   brokerContactAllowed: { type: Boolean, default: false },
    // },
    uniqueDescription: {
      type: String,
      trim: true,
    },
    amenities: [{ type: String }],
    features: [{ type: String }],
    otherFeatures: [{ type: String }],
    waterSource:[{ type: String }],
    isFinished:{
      type:Boolean,
      default:false
    },
    elevator: { type: Boolean },
    parking: [{ type: String }],
    powerBackup: [{ type: String }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);

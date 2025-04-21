const mongoose = require("mongoose");

const propertyDetailsSchema = new mongoose.Schema({
  location: {
    city: {
      type: String,
      // required: true,
    },
    state: {
      type: String,
      // required: true,
    },
    locality: {
      type: String,
      // required: true,
    },
    subLocality: {
      type: String,
    },
    apartment: {
      type: String,
    },
    houseNo: {
      type: String,
    },
  },
  propertyProfile: {
    bedrooms: {
      type: Number,
      // required: true,
      min: 0,
    },
    bathrooms: {
      type: Number,
      // required: true,
      min: 0,
    },
    balconies: {
      type: Number,
    },
    area: {
      type: Number,
      // required: true,
    },
    furnishingStatus: {
      type: String,
      enum: ["furnished", "semi-furnished", "unfurnished"],
      // required: true,
    },
    furnishingDetails: {
      type: Object,
      validate: {
        validator: function (value) {
          if (this.furnishingStatus === "semi-furnished") {
            // Ensure furnishingDetails exists and is not empty
            return value && Object.keys(value).length > 0;
          }
          return true; // Pass validation if not "semi-furnished"
        },
        message:
          "Furnishing details are required when the property is semi-furnished.",
      },
    },
    totalFloors: {
      type: Number,
      // required: true,
    },
    propertyOnFloor: {
      type: Number,
      // required: true,
    },
    propertyAge: {
      type: Number,
      // required: true,
    },
    availableFrom: {
      type: Date,
      // required: true,
    },
    rentOutTo: {
      type: String,
      enum: ["singleMan", "singleWoman", "family"],
      // required: true,
    },
    parkingSlot: {
      type: Boolean,
      default: false,
    },
  },
  rentDetails: {
    expectedRent: {
      type: Number,
      // required: true,
    },
    isNegotiable: {
      type: Boolean,
      default: false,
    },
    electricityCharges: {
      type: Boolean,
      default: false,
    },
    waterCharges: {
      type: Boolean,
      default: false,
    },
    securityDeposit: {
      type: Number,
      // required: true,
    },
    agreementDurationMonths: {
      type: Number,
      // required: true,
    },
    noticePeriodMonths: {
      type: Number,
      // required: true,
    },
    additionalRentDetails: {
      maintenance: {
        type: Number,
      },
      bookingAmount: {
        type: Number,
      },
      membershipCharges: {
        type: Number,
      },
      otherCharges: {
        type: String,
      },
    },
  },
  additionalRooms: {
    poojaRoom: {
      type: Boolean,
      default: false,
    },
    studyRoom: {
      type: Boolean,
      default: false,
    },
    servantRoom: {
      type: Boolean,
      default: false,
    },
    storeRoom: {
      type: Boolean,
      default: false,
    },
  },
  agreementType: {
    preferredAgreement: {
      type: String,
      enum: ["companyLease", "regularAgreement"],
    },
    brokerContactAllowed: {
      type: Boolean,
      default: false,
    },
  },
  uniqueDescription: {
    type: String,
    // required: true,
  },
  amenities: [{ type: String }],
  features: [{ type: String }],
  elevator: { type: Boolean },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PropertyDetails", propertyDetailsSchema);

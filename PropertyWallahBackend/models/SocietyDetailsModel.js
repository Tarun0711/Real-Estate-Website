const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SocietyDetailsSchema = new Schema(
  {
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["Available", "Under Construction", "Upcoming", "Completed"],
      required: true,
    },
    brokerageAvailable: { type: Boolean, default: false },
    expectedCompletionDate: {
      type: Date,
      required: function () {
        return (
          this.status === "Under Construction" || this.status === "Upcoming"
        );
      },
    },
    apartmentTypes: [
      {
        type: {
          type: String,
          required: true,
        },
        carpetArea: { type: Number, required: true }, // in sq.ft or sq.m
        price: { type: Number, required: true }, // Price in local currency
      },
    ],
    whatBenefits: [String],
    whatNeedsAttention: [String],
    facilities: [String], // E.g., 'Swimming Pool', 'Gym', 'Gazebo', 'Pool Table'
    locationAdvantages: [String], // Reasons why the location is beneficial
    whyConnect: [String], // Reasons to connect/buy from the society
    amenities: [String], // Amenities like parks, playgrounds, etc.
    brochure: { type: String }, // URL/path to PDF brochure
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    faqs: [{ type: Schema.Types.ObjectId, ref: "SocietyFAQ" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SocietyDetails", SocietyDetailsSchema);

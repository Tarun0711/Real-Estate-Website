const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    phone: {
      type: String,
      // required: true,
      unique: true,
      match: [/^\d{10}$/, 'Please fill a valid phone number']
    },
    role: {
      type: String,
      enum: ["Buyer", "Seller", "Renter", "Agent"],
      required: true,
      default: "Buyer",
    },
    location: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    postedProperty: {
      type: Array,
      default: [],
    },
    activePlan: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
    },
    isBroker: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

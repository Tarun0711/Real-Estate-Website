const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const stateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    cities: [citySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("State", stateSchema);

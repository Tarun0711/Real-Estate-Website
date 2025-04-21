const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, required: true }, // For grouping FAQs under categories
  isFeatured: { type: Boolean, default: false }, // Highlight specific FAQs if needed
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

faqSchema.pre("save", function (next) {
  this.updatedAt = Date.now(); // Automatically update 'updatedAt' field on save
  next();
});

module.exports = mongoose.model("FAQ", faqSchema);

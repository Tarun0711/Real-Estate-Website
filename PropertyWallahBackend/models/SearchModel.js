const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  searchParameters: {
    location: String,
    priceRange: { min: Number, max: Number },
    propertyType: String,
  },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('SearchHistory', searchHistorySchema);

const mongoose = require('mongoose');

const packSchema = new mongoose.Schema({
  packName: {
    type: String,
    required: true,
    enum: ['Premium', 'Basic', 'Standard'], 
  },
  listingsAvailable: {
    type: Number,
    required: true,
    default: 3,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
    get: function () {
      return ((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100;
    },
  },
  features: {
    type: [String],
    default: [
      'Up to 5X increase in buyer responses',
      'Free verification',
      'Post any property (resale/rent/commercial)',
      'Applicable PAN India',
    ],
  },
  listingDuration: {
    type: String,
    required: true,
    default: '2 months',
  },
  validityPeriod: {
    type: String,
    required: true,
    default: '3 months',
  },
  buyedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Plans = mongoose.model('Plan',packSchema);

module.exports = Plans;

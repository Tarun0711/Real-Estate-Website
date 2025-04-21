const mongoose = require("mongoose");

const SocietyReviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    society: { type: Schema.Types.ObjectId, ref: "Society", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SocietyReview", SocietyReviewSchema);

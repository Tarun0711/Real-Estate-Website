// reviews.controller.js
const SocietyReview = require("../models/SocietyReviews");

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const review = new SocietyReview({
      user: req.user._id,
      rating: req.body.rating,
      comment: req.body.comment,
      society: req.body.society,
    });

    await review.save();
    res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error creating review", error });
  }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await SocietyReview.find()
      .populate("user", "name email")
      .populate("society", "name description");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ message: "Error fetching reviews", error });
  }
};

// Get review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await SocietyReview.findById(req.params.reviewId)
      .populate("user", "name email")
      .populate("society", "name description");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ message: "Error fetching review", error });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const review = await SocietyReview.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.rating = req.body.rating;
    review.comment = req.body.comment;

    await review.save();
    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error updating review", error });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const review = await SocietyReview.findByIdAndDelete(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting review", error });
  }
};
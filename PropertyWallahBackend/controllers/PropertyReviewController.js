const Review = require('../models/ReviewModel');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const review = new Review({
      user: req.body.user,
      property: req.body.property,
      agent: req.body.agent,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    await review.save();
    res.status(201).json({ message: 'Review created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating review' });
  }
};

// Get all reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user property agent');
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

// Get a single review by ID
exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('user property agent');
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
    } else {
      res.json(review);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching review' });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
    } else {
      res.json({ message: 'Review updated successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating review' });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndRemove(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting review' });
  }
};
const express = require('express');
const Subscription = require('../models/Subscription');
const router = express.Router();

// POST route to subscribe an email
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  try {
    // Check if email already exists
    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ success: false, message: 'Email already subscribed.' });
    }

    // Create new subscription
    const newSubscription = new Subscription({ email });
    await newSubscription.save();

    res.status(201).json({ success: true, message: 'Successfully subscribed.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

module.exports = router;

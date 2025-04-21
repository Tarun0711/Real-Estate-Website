const express = require('express');
const authController = require('../controllers/AuthController');

const router = express.Router();
// ********************************************************************************************************
//                                      Authentication routes                                              
// ********************************************************************************************************



// Route to send OTP
router.post('/send-otp', authController.sendotp);

// Route to verify OTP and authenticate (login or signup)
router.post('/verify-otp', authController.verifyOTPAndAuth);

module.exports = router;







module.exports = router;
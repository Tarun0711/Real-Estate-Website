const User = require("../models/userModel");
const OTP = require("../models/otpModel");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const sendResponse = (res, status, success, message, token, user) => {
  return res.status(status).json({
    success,
    message,
    token,
    user: user ? {
      id: user._id,
      email: user.email,
      name: user.name,
      image: user.image,
    } : undefined,
  });
};

const authController = {
  verifyOTPAndAuth: async (req, res) => {
    try {
      const { email, otp } = req.body;

      // Debugging: Log incoming email and OTP
      console.log("VerifyOTPAndAuth - Email:", email, "OTP:", otp);

      // Find the OTP document
      const otpDoc = await OTP.findOne({ otp, email });

      if (!otpDoc) {
        console.error("No matching OTP document found");
        return res.status(401).json({ success: false, message: "Invalid OTP" });
      }

      const currentTime = new Date();
      if (currentTime > otpDoc.expiry) {
        console.error("OTP expired for email:", email);
        return res.status(401).json({ success: false, message: "OTP expired" });
      }

      // Delete OTP after successful validation
      await OTP.deleteOne({ _id: otpDoc._id });

      // Check if the user exists
      let user = await User.findOne({ email });

      if (user) {
        const token = generateToken(user._id);
        return sendResponse(res, 200, true, "Login successful", token, user);
      } else {
        // Create a new user if not found
        const newUser = new User({
          email,
          name: "Guest",
          userName: email.split('@')[0], 
          image: `https://api.dicebear.com/6.x/initials/svg?seed=${email}&backgroundColor=b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`,
        });

        user = await newUser.save();
        const token = generateToken(user._id);
        return sendResponse(res, 201, true, "Signup and login successful", token, user);
      }
    } catch (error) {
      console.error("Error in verifyOTPAndAuth:", error.message);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  },

  sendotp: async (req, res) => {
    try {
      const { email } = req.body;

      let otp;
      let result;
      do {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        result = await OTP.findOne({ otp });
      } while (result);

      const otpPayload = { email, otp, expiry: new Date(Date.now() + 10 * 60 * 1000) };
      await OTP.create(otpPayload);

      console.log("OTP sent successfully. Email:", email, "OTP:", otp);

      res.status(200).json({
        success: true,
        message: `OTP sent successfully`,
      });
    } catch (error) {
      console.error("Error in sendotp:", error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  },
};

module.exports = authController;
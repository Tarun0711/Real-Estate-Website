const Razorpay = require('razorpay');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Transaction = require('../models/Transaction');
const Plan = require('../models/Plan');

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Create Order (Buy Plan)
exports.buyPlan = async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });

    const amount = plan.price * 100; // convert to paise
    const orderOptions = {
      amount,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(orderOptions);

    // Create a transaction entry
    const transaction = await Transaction.create({
      userId: req.user._id, // assuming you have authentication
      planId: planId,
      razorpayOrderId: order.id,
      amount: plan.price,
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: plan.price,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating Razorpay order', error });
  }
};

// Capture Payment & Verify Signature
exports.capturePayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    // Fetch transaction details
    const transaction = await Transaction.findOne({ razorpayOrderId });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    // Update transaction details
    transaction.razorpayPaymentId = razorpayPaymentId;
    transaction.razorpaySignature = razorpaySignature;
    transaction.status = 'success';
    await transaction.save();

    // Send success email (optional)
    sendSuccessEmail(req.user.email, transaction);

    res.status(200).json({ success: true, message: 'Payment captured successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error capturing payment', error });
  }
};

// Send success email
const sendSuccessEmail = async (userEmail, transaction) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Payment Successful',
    text: `Your payment for plan with transaction ID: ${transaction._id} was successful!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

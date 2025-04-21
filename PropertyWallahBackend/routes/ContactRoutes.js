const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/ContactController');
const protectRoute = require('../MiddleWares/Protected');

router.post('/contact', sendContactEmail);

module.exports = router;

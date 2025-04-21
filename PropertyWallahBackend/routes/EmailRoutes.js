const express = require("express");
const router = express.Router();
const { bulkMailSender,sendEmailToSingle } = require("../controllers/MailController");

router.post("/bulkMail", bulkMailSender);
router.post("/sendEmailToSingle", sendEmailToSingle);


module.exports = router;
  
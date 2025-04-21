const nodemailer = require("nodemailer");
require('dotenv').config()

const mailSender = async (email, title, body) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });
  
      const info = await transporter.sendMail({
        from: `"Property Wallah || We Makes The Dream Comes True" <${process.env.MAIL_USER}>`,
        to: email,
        subject: title,
        html: body,
      });
  
      console.log("Email sent:", info.response);
      return info;
    } catch (error) {
      console.error("Error sending email:", error.message);
      throw new Error("Failed to send email"); 
    }
  };


module.exports = mailSender;
const mailSender = require('../config/mailSender'); 

const bulkMailSender = async (req, res) => {
    const { emails, title, body } = req.body; // Assuming you're sending emails, title, and body from the frontend

    if (!Array.isArray(emails) || emails.length === 0) {
        return res.status(400).json({ message: "Please provide a valid array of email addresses." });
    }

    try {
        const emailPromises = emails.map(email => mailSender(email, title, body));
        const results = await Promise.all(emailPromises); // Wait for all emails to be sent

        res.status(200).json({
            message: "Emails sent successfully",
            results,
        });
    } catch (error) {
        console.error("Error sending bulk emails:", error.message);
        res.status(500).json({ message: "Failed to send emails", error: error.message });
    }
};

const sendEmailToSingle = async (req, res) => {
    const { email, title, body } = req.body; // Assuming email, title, and body are sent from the frontend

    // Validate the incoming request data
    if (!email || !title || !body) {
        return res.status(400).json({ message: "Email, title, and body are required." });
    }

    try {
        // Send email using the mailSender function
        const info = await mailSender(email, title, body);

        res.status(200).json({
            message: "Email sent successfully",
            info,
        });
    } catch (error) {
        console.error("Error sending email:", error.message);
        res.status(500).json({ message: "Failed to send email", error: error.message });
    }
};

module.exports = {bulkMailSender,sendEmailToSingle};

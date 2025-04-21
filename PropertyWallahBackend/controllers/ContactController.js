const ContactEmail = require("../mails-templates/ContactEmail");
const mailSender = require("../config/mailSender");
const Property = require("../models/propertyModel");

// Send a contact email
const sendContactEmail = async (req, res) => {
  try {
    const {
      dealer,
      email,
      siteVisit,
      homeLoan,
      phone,
      plan,
      propId,
      reason,
      name,
    } = req.body;

    // Validate required fields
    if (!email || !phone || !propId) {
      return res
        .status(400)
        .json({ error: "Email, phone, and property ID are required." });
    }

    // Fetch the property details
    const property = await Property.findById(propId);
    if (!property) {
      return res.status(404).json({ error: "Property not found." });
    }
    // Prepare email details
    const propertyName = property.title;
    const propertyId = propId;
    const isDealer = dealer;
    const contactPerson = name || "Anonymous";
    const interestedMonths = plan || [];
    const phoneNumber = phone;
    const usageType = reason || "Not specified";
    const interestedInSiteVisit = siteVisit || false;
    const ownerEmail = email;
    // Send email to owner
    const emailToOwner = await mailSender(
      ownerEmail,
      "Property Inquiry",
      ContactEmail({
        propertyName,
        propertyId,
        isDealer,
        contactPerson,
        interestedMonths,
        phoneNumber,
        usageType,
        interestedInSiteVisit,
      })
    );

    console.log(`Email sent successfully to owner: `);
    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  sendContactEmail,
};

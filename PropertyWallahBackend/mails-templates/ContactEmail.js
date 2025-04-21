const ContactEmail = ({ propertyName,
  propertyId,
  isDealer,
  contactPerson,
  interestedMonths,
  phoneNumber,
  usageType,
  interestedInSiteVisit
}) => {
  console.log('propertyName', propertyName)
 

  // Ensure default values for potential undefined inputs
  const dealerText = isDealer === "No" ? "not a dealer" : "a dealer";
  const visitText = interestedInSiteVisit ? "is interested in a site visit" : "is not interested in a site visit";
  const monthsText = interestedMonths ; // Handle undefined `interestedMonths`

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #4CAF50;">Property Inquiry</h2>
      <p>Dear Team,</p>
      <p>You have been contacted regarding the property with the following details:</p>
      <ul>
        <li><strong>Property Name:</strong> ${propertyName }</li>
        <li><strong>Property ID:</strong> ${propertyId }</li>
      </ul>
      <p><strong>Contact Details:</strong></p>
      <ul>
        <li><strong>Contact Person:</strong> ${contactPerson || "Anonymous"}</li>
        <li><strong>Phone Number:</strong> ${phoneNumber }</li>
      </ul>
      <p><strong>Additional Information:</strong></p>
      <ul> 
        <li>The person is ${dealerText}.</li>
        <li>Interested in the property for: <strong>${usageType }</strong>.</li>
        <li>Timeline for purchase: <strong>${monthsText} months</strong>.</li>
        <li>The person ${visitText}.</li>
      </ul>
      <p>Best regards,</p>
      <p>Your Property Team</p>
    </div>
  `;
};

module.exports = ContactEmail;
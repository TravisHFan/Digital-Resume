const Contact = require("../models/Contact");
const emailService = require("../services/emailService");
const { validationResult } = require("express-validator");

exports.submitContact = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors.array(),
      });
    }

    const {
      name,
      email,
      organization,
      title,
      reason,
      otherReason,
      meetingDate,
      meetingTime,
    } = req.body;

    // Create new contact record
    const contact = new Contact({
      name,
      email,
      organization,
      title,
      reason,
      otherReason,
      meetingDate: meetingDate ? new Date(meetingDate) : null,
      meetingTime,
      ipAddress: req.ip || req.connection.remoteAddress,
    });

    // Save to database
    await contact.save();

    // Send notification email
    try {
      await emailService.sendContactNotification(contact);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Continue execution even if email fails
    }

    res.status(201).json({
      message: "Contact form submitted successfully",
      contactId: contact._id,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({
      error: "Failed to submit contact form. Please try again.",
    });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 }).limit(50);

    res.json(contacts);
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({ error: "Failed to retrieve contacts" });
  }
};

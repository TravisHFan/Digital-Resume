const express = require("express");
const { body } = require("express-validator");
const contactController = require("../controllers/contactController");

const router = express.Router();

// Validation middleware
const validateContact = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Name is required and must be less than 100 characters"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("organization")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Organization must be less than 200 characters"),

  body("title")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Title must be less than 100 characters"),

  body("reason")
    .isIn(["OF", "CO", "PR", "OT"])
    .withMessage("Please select a valid reason"),

  body("otherReason")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Other reason must be less than 500 characters"),

  body("meetingDate")
    .optional()
    .isISO8601()
    .withMessage("Please provide a valid date"),

  body("meetingTime")
    .optional()
    .isIn(["AM", "PM"])
    .withMessage("Please select a valid meeting time"),
];

// Routes
router.post("/submit", validateContact, contactController.submitContact);
router.get("/list", contactController.getContacts);

module.exports = router;

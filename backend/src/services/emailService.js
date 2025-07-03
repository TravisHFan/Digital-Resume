const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Map reason codes to readable text
const reasonMap = {
  OF: "Apply an Offer",
  CO: "Cooperation",
  PR: "Project",
  OT: "Other",
};

exports.sendContactNotification = async (contact) => {
  const reasonText = reasonMap[contact.reason] || "Unknown";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFICATION_EMAIL || "travisfanht@gmail.com",
    subject: `New Contact Form Submission - ${contact.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Organization:</strong> ${
        contact.organization || "Not provided"
      }</p>
      <p><strong>Title:</strong> ${contact.title || "Not provided"}</p>
      <p><strong>Reason:</strong> ${reasonText}</p>
      ${
        contact.otherReason
          ? `<p><strong>Other Reason:</strong> ${contact.otherReason}</p>`
          : ""
      }
      ${
        contact.meetingDate
          ? `<p><strong>Meeting Date:</strong> ${contact.meetingDate.toDateString()}</p>`
          : ""
      }
      ${
        contact.meetingTime
          ? `<p><strong>Meeting Time:</strong> ${
              contact.meetingTime === "AM"
                ? "Morning (10:00 a.m. to 12:00 p.m. PST)"
                : "Afternoon (2:00 p.m. to 4:00 p.m. PST)"
            }</p>`
          : ""
      }
      <p><strong>Submitted At:</strong> ${contact.submittedAt.toLocaleString()}</p>
      <p><strong>IP Address:</strong> ${contact.ipAddress}</p>
    `,
  };

  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("SMTP Error:", err);
    } else {
      console.log("Mail sent success:", info);
    }
  });
};

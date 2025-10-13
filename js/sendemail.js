const nodemailer = require("nodemailer");

// Make sure you add your Brevo SMTP credentials in environment variables
// BREVO_USER = your Brevo SMTP login (usually your Brevo email)
// BREVO_PASS = your Brevo SMTP password (SMTP key generated from Brevo dashboard)

async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com", // Brevo SMTP host
    port: 587,                     // TLS port
    secure: false,                 // true for 465, false for 587
    auth: {
      user:"keshabooooooooo7@gmail.com",
      pass:"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",
    },
  });

  const mailOptions = {
    from: `"Restaurant App" <keshabooooooooo7@gmail.com>`, // sender name and your email
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to", to);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

module.exports = sendEmail;

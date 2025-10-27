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
      user:"9a287e001@smtp-brevo.com",
      pass:"53HCKbtILkaQmpFx", //hgdpjlfdbsajdzfy
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

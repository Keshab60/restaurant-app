const Brevo = require("@getbrevo/brevo");
require("dotenv").config();

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.authentications["apiKey"].apiKey ="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";

async function sendEmail(to, subject, text) {
  const sendSmtpEmail = {
    sender: { email: "goudakeshabg@gmail.com", name: "Restaurant App" },
    to: [{ email: to }],
    subject: subject,
    textContent: text,
  };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent:", response.messageId || "Success");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

module.exports = sendEmail;

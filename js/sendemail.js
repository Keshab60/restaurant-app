const Brevo = require("@getbrevo/brevo");
require("dotenv").config();

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.authentications["apiKey"].apiKey ="53HCKbtILkaQmpFx";

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

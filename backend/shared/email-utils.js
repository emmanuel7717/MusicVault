const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

async function sendEmail(to, subject, message) {
  if (!to) throw new Error("Parameter 'to' (recipient email) is required");
  if (!subject) throw new Error("Parameter 'subject' is required");
  if (!message) throw new Error("Parameter 'message' (email body) is required");

  const mailOptions = {
    from: process.env.GOOGLE_EMAIL,
    to,
    subject,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err) {
    console.log("Error sending email:", err);
    throw err;
  }
}

module.exports = sendEmail;

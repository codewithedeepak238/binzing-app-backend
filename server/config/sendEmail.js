import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVO_EMAIL,
    pass: process.env.BREVO_SMTP_KEY
  }
});

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Blinkit" <${process.env.BREVO_EMAIL}>`, // must match verified sender
      to: sendTo,
      subject,
      html
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("Email error:", err);
    throw err;
  }
};

export default sendEmail;

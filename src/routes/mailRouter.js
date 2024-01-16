import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "gianicraft@gmail.com",
    pass: "IfahJSWyvQPKpndx",
  },
});

router.get("/sendmail", async (req, res) => {
  const message = {
    from: "sender@server.com",
    to: "receiver@sender.com",
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>",
  };
  try {
    await transporter.sendMail(message);
    res.send("mail enviado");
  } catch (error) {
    console.log(error);
  }
});

export default router;

import nodemailer from "nodemailer";
import { userService } from "../services/services.js";
import bcrypt from "bcrypt";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "gianicraft@gmail.com",
    pass: "IfahJSWyvQPKpndx",
  },
});

const recoverPassword = async (req, res) => {
  try {
    const { userId } = req.session;

    const user = await userService.findOne({ _id: userId });

    const email = user.email;

    if (!user) {
      return res.status(404).send("Id no encontrado");
    }

    const message = {
      from: "ecommerceBackEnd@gmail.com",
      to: email,
      subject: "Recuperación de contraseña",
      text: `Hola, haz clic en el enlace para restablecer tu contraseña: http://localhost:8080/resetpassword`,
      html: `<p>Hola, haz clic <a href="http://localhost:8080/resetpassword">aquí</a> para restablecer tu contraseña.</p>`,
    };

    await transporter.sendMail(message);
  } catch (error) {
    console.log(error, "recoverPassword, recoverPasswordController");
  }
};

const resetPassword = async (req, res) => {
  const { userId } = req.session;
  const { newPassword } = req.body;
  console.log(newPassword);

  try {
    const user = await userService.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send("Id no encontrado");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await userService.update(userId, user);
    res.redirect("/home/1");
  } catch (error) {
    console.error(error, "resetPassword, resetPasswordController");
    res.status(500).send("Error al restablecer la contraseña");
  }
};

export default { recoverPassword, resetPassword };

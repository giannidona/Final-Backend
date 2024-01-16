import { userService } from "../services/services.js";
import nodemailer from "nodemailer";

const showUsers = async (req, res) => {
  try {
    const users = await userService.getAll().lean();

    res.render("usersManager", { users });
  } catch (error) {
    console.log(error, "showUsers dashboardController");
  }
};

const updateRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    await userService.updateRole(userId, role);

    res.redirect("/api/usersManager/updateRole");
  } catch (error) {
    console.log(error, "updateRole usersController");
    res.status(500).json({ error: "Error al actualizar el rol del usuario" });
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "gianicraft@gmail.com",
    pass: "IfahJSWyvQPKpndx",
  },
});

const deleteInactiveUsers = async (req, res) => {
  try {
    const users = await userService
      .getAll()
      .select("last_connection email")
      .lean();

    const currentDate = new Date();

    const inactiveUsers = users.filter((user) => {
      if (user.last_connection) {
        const lastConnectionDate = new Date(user.last_connection);
        const timeDifference = currentDate - lastConnectionDate;
        const minutesDifference = timeDifference / (1000 * 60 * 60 * 24);

        return minutesDifference > 2;
      }
      return false;
    });

    for (const user of inactiveUsers) {
      await sendInactiveUserEmail(user.email);
      await userService.delete(user._id);
    }
  } catch (error) {
    console.log(error, "deleteInactiveUsers usersController");
  }
};

const sendInactiveUserEmail = async (userEmail) => {
  const mailOptions = {
    from: "ecommerceBackEnd@gmail.com",
    to: userEmail,
    subject: "Cuenta Desactivada",
    text: "Desactivamos tu cuenta por inactividad",
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error al enviar correo electrónico a ${userEmail}:`, error);
  }
};

export default { showUsers, updateRole, deleteInactiveUsers };

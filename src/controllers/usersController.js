import { userService } from "../services/services.js";

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

    // Validar que el rol es uno de los roles permitidos (admin, premium, default)

    await userService.updateRole(userId, role);

    res.redirect("/api/users"); // Redirige a la lista de usuarios después de la actualización
  } catch (error) {
    console.log(error, "updateRole usersController");
    res.status(500).json({ error: "Error al actualizar el rol del usuario" });
  }
};

export default { showUsers, updateRole };

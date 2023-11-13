// authorize.js
import { userModel } from "../dao/models/userModel.js";

const authorize = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "Usuario no autorizado" });
    }

    if (req.path.startsWith("/admin")) {
      if (user.role !== "admin") {
        return res
          .status(403)
          .json({ error: "Acceso denegado para usuarios no administradores" });
      }
    }

    if (req.path.startsWith("/user")) {
      if (user.role !== "user") {
        return res
          .status(403)
          .json({ error: "Acceso denegado para usuarios no registrados" });
      }
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error de autorización" });
  }
};

export default authorize;

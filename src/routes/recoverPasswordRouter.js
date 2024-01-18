import { Router } from "express";
import recoverPasswordController from "../controllers/recoverPasswordController.js";
import privateRoutes from "../middlewares/privateRoutes.js";

const router = Router();

router.get(
  "/recover",
  privateRoutes,
  recoverPasswordController.recoverPassword,
  async (req, res) => {
    res.render("recover");
  }
);

router.get("/resetpassword", privateRoutes, async (req, res) => {
  res.render("resetPassword");
});

router.post("/resetpassword", recoverPasswordController.resetPassword);

export default router;

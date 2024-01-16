import { Router } from "express";
import sessionController from "../controllers/sessionController.js";
import publicRoutes from "../middlewares/publicRoutes.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = Router();

router.get("/register", publicRoutes, async (req, res) => {
  res.render("register");
});
router.post("/register", sessionController.register);

router.get("/login", publicRoutes, async (req, res) => {
  res.render("login");
});
router.post("/login", sessionController.login);

router.get("/logout", sessionController.logout);

router.get("/current", jwtAuth, (req, res) =>
  res.send({ status: "success", payload: req.user })
);

export default router;

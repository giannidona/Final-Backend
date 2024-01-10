import { Router } from "express";
import sessionController from "../controllers/sessionController.js";

const router = Router();

router.get("/register", async (req, res) => {
  res.render("register");
});
router.post("/register", sessionController.register);

router.get("/login", sessionController.login);
router.post("/login", sessionController.login);

export default router;

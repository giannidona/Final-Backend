import { Router } from "express";
import recoverPasswordController from "../controllers/recoverPasswordController.js";

const router = Router();

router.post("/recover", recoverPasswordController.recoverPassword);

router.post("/resetpassword", recoverPasswordController.resetPassword);

export default router;

import { Router } from "express";
import profileController from "../controllers/profileController.js";
import privateRoutes from "../middlewares/privateRoutes.js";

const router = Router();

router.get("/profile", privateRoutes, profileController.renderProfile);

export default router;

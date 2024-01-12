import { Router } from "express";
import homeController from "../controllers/homeController.js";
import privateRoutes from "../middlewares/privateRoutes.js";

const router = Router();

router.get("/home", privateRoutes, homeController.renderHome);

export default router;

import { Router } from "express";
import homeController from "../controllers/homeController.js";
import privateRoutes from "../middlewares/privateRoutes.js";
import isAdmin from "../middlewares/authorize.js";

const router = Router();

router.get("/home", privateRoutes, isAdmin, homeController.renderHome);

export default router;

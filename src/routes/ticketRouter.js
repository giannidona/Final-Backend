import { Router } from "express";
import cartController from "../controllers/cartController.js";
import privateRoutes from "../middlewares/privateRoutes.js";
import userAccess from "../middlewares/userAccess.js";

const router = Router();

router.get("/ticket", privateRoutes, userAccess, cartController.ticket);

export default router;

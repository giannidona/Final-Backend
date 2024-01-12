import { Router } from "express";
import cartController from "../controllers/cartController.js";
import privateRoutes from "../middlewares/privateRoutes.js";

const router = Router();

router.get("/ticket", privateRoutes, cartController.ticket);

export default router;

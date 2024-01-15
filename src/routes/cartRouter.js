import { Router } from "express";
import cartController from "../controllers/cartController.js";
import privateRoutes from "../middlewares/privateRoutes.js";
import userAccess from "../middlewares/userAccess.js";

const router = Router();

router.get("/cart", privateRoutes, userAccess, cartController.renderCart);

router.post("/cart/:productId", cartController.addToCart);

export default router;

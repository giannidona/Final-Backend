import { Router } from "express";
import cartController from "../controllers/cartController.js";
import privateRoutes from "../middlewares/privateRoutes.js";

const router = Router();

router.get("/cart", privateRoutes, cartController.renderCart);

router.post("/cart/:productId", cartController.addToCart);

export default router;

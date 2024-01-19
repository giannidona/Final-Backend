import { Router } from "express";
import cartController from "../controllers/cartController.js";
import privateRoutes from "../middlewares/privateRoutes.js";
import userPremiumAccess from "../middlewares/userPremiumAccess.js";

const router = Router();

router.get(
  "/cart",
  privateRoutes,
  userPremiumAccess,
  cartController.renderCart
);

router.post("/cart/:productId", cartController.addToCart);

router.get("/cart/delete/:productId", cartController.deleteItemCart);

router.get("/cart/empty", cartController.emptyCart);

export default router;

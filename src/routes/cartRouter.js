import { Router } from "express";

import authorize from "../middlewares/authorize.js";
import {
  addToCart,
  viewCart,
  finalizePurchase,
} from "../controllers/cartController.js";

const router = new Router();

router.get("/cart", authorize, viewCart);

router.post("/add-to-cart/:productId", addToCart);

router.get("/:cid/purchase", finalizePurchase);
router.post("/:cid/purchase", finalizePurchase);

export default router;

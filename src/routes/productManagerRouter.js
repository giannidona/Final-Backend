import { Router } from "express";
import productController from "../controllers/productController.js";
import { uploader } from "../middlewares/multer.js";
import privateRoutes from "../middlewares/privateRoutes.js";
import isAdmin from "../middlewares/authorize.js";

const router = Router();

router.get("/productManager", isAdmin, privateRoutes, async (req, res) => {
  res.render("productManager");
});

router.post(
  "/productManager",
  uploader.single("file"),
  productController.createProduct
);

router.post("/productManager/delete", productController.deleteProduct);

export default router;
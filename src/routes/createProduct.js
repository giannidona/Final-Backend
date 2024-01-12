import { Router } from "express";
import productController from "../controllers/productController.js";
import { uploader } from "../middlewares/multer.js";
import privateRoutes from "../middlewares/privateRoutes.js";

const router = Router();

router.get("/createproduct", privateRoutes, async (req, res) => {
  res.render("createproduct");
});
router.post(
  "/createproduct",
  uploader.single("file"),
  productController.createProduct
);

export default router;

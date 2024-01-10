import { Router } from "express";
import productController from "../controllers/productController.js";
import { uploader } from "../middlewares/multer.js";

const router = Router();

router.get("/createproduct", async (req, res) => {
  res.render("createproduct");
});
router.post(
  "/createproduct",
  uploader.single("file"),
  productController.createProduct
);

export default router;

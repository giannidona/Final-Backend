import { Router } from "express";
import { uploader } from "../middlewares/multer.js";
import {
  createProduct,
  showProducts,
} from "../controllers/productController.js";
import authorize from "../middlewares/authorize.js";

const router = new Router();

router.get("/products", showProducts, async (req, res) => {
  try {
    if (!req.session.isLogged) {
      return res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/products", authorize, async (req, res) => {});

router.get("/addproduct", authorize, async (req, res) => {
  try {
    if (!req.session.isLogged) {
      return res.redirect("/login");
    }

    res.render("addproduct");
  } catch (error) {
    console.log(error);
  }
});

router.post("/addproduct", authorize, uploader.single("file"), createProduct);

export default router;

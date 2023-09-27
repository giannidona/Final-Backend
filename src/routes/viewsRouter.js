import { Router } from "express";
import ProductManager from "../dao/db/productManager.js";
import { productModel } from "../dao/models/productModel.js";
import cartModel from "../dao/models/cartModel.js";

const router = Router();

router.get("/products", async (req, res) => {
  let page = parseInt(req.query.page);
  if (!page) page = 1;

  let result = await productModel.paginate({}, { page, limit: 5, lean: true });

  result.prevLink = result.hasPrevPage
    ? `http://localhost:8080/api/products?page=${result.prevPage}`
    : "";
  result.nextLink = result.hasNextPage
    ? `http://localhost:8080/api/products?page=${result.nextPage}`
    : "";
  result.isValid = !(page <= 0 || page > result.totalPages);
  res.render("allproducts", result);
});

router.post("/products", async (req, res) => {
  try {
    const productId = req.body.productId;

    const cart = await cartModel.findOne({});

    if (!cart) {
      const newCart = new cartModel({
        products: [],
      });
      await newCart.save();
    }

    cart.products.push(productId);
    await cart.save();

    res.status(200).json({ message: "Producto agregado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
export default router;

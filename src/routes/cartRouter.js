import { Router } from "express";
import CartManager from "../cartManager.js";
import ProductManager from "../productManager.js";

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

router.post("/cart/", (req, res) => {
  try {
    const newCart = cartManager.createCart();
    res.json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al crear el carrito." });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = cartManager.getCartById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }

    const productsInCart = cart.products.map((productId) =>
      productManager.getProductById(productId)
    );

    res.json(productsInCart);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Error al obtener los productos del carrito." });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const cart = cartManager.getCartById(cartId);
    const product = productManager.getProductById(productId);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    const existingProductIndex = cart.products.findIndex(
      (item) => item.product === productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity++;
    } else {
      const productToAdd = {
        product: productId,
        quantity: 1,
      };
      cart.products.push(productToAdd);
    }

    await cartManager.saveCarts();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al agregar el producto al carrito." });
  }
});

export default router;

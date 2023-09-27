import { Router } from "express";
import CartManager from "../dao/db/cartManager.js";
import ProductManager from "../dao/db/productManager.js";
import cartModel from "../dao/models/cartModel.js";

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

// CREA UN CARRITO NUEVO
router.post("/newcart", async (req, res) => {
  try {
    const newCart = cartManager.createCart();
    res.json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al crear el carrito." });
  }
});

// MUESTRA TODOS LOS CARRITOS
router.get("/carts", async (req, res) => {
  try {
    const cartsWithProducts = await cartModel.find().populate("products");

    res.json(cartsWithProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener todos los carritos." });
  }
});

// MUESTRA LOS PRODUCTOS DEL CARRITO INDICADO
router.get("/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const cart = await cartManager.getCartById(cartId);

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado." });
  }
});

// ELIMINA EL PRODUCTO CON EL ID SELECCIONADO DENTRO DEL CARRITO
router.delete("/carts/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const cart = await cartModel.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }

    const productIndex = cart.products.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito." });
    }

    cart.products.splice(productIndex, 1);

    await cart.save();

    const cartWithProducts = await cartModel
      .findById(cartId)
      .populate("products");

    res.json(cartWithProducts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al eliminar el producto del carrito." });
  }
});

// ACTUALIZA EL CARRITO CON UNA NUEVA LISTA DE PRODUCTOS
router.put("/carts/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const updatedCartData = req.body;

    const cart = await cartModel.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }

    cart.products = updatedCartData;

    await cart.save();

    const cartWithProducts = await cartModel
      .findById(cartId)
      .populate("products");

    res.json(cartWithProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el carrito." });
  }
});

// ACTUALIZA LA CANTIDAD DE UN SOLO PRODUCTO
router.put("/carts/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const updatedQuantity = req.body.quantity;

    const cart = await cartModel.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }

    const product = cart.products.find((p) => p._id.toString() === productId);

    if (!product) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito." });
    }

    product.quantity = updatedQuantity;

    await cart.save();

    const cartWithProducts = await cartModel
      .findById(cartId)
      .populate("products");

    res.json(cartWithProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al actualizar la cantidad del producto en el carrito.",
    });
  }
});

// ELIMINA TODOS LOS PRODUCTOS DEL CARRITO
router.delete("/carts/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;

    const cart = await cartModel.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }

    cart.products = [];

    await cart.save();

    const cartWithProducts = await cartModel
      .findById(cartId)
      .populate("products");

    res.json(cartWithProducts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al eliminar todos los productos del carrito." });
  }
});

export default router;

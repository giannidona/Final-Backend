import { cartService } from "../services/services.js";
import { userService } from "../services/services.js";
import { productService } from "../services/services.js";
import { ticketService } from "../services/services.js";
import { logger } from "../utils.js/logger.js";

const addToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.session.userId;
    const userEmail = req.session.email;

    const productData = await productService.getById({ _id: productId }).lean();
    if (productData.owner === userEmail) {
      return res
        .status(403)
        .send("No puedes agregar tu propio producto al carrito");
    }

    const user = await userService.getById({ _id: userId }).populate("cart");
    const userCart = user.cart;

    const existingProduct = userCart.products.find(
      (product) => product.product.toString() === productId.toString()
    );

    let productInfo;

    productInfo = await productService.getById({ _id: productId }).lean();

    if (existingProduct) {
      existingProduct.quantity++;
      const updatedProductInfo = await productService
        .getById({ _id: productId })
        .lean();
      existingProduct.price =
        existingProduct.quantity * updatedProductInfo.price;
    } else {
      const productPrice = productInfo.price;

      const newProduct = {
        product: productId,
        quantity: 1,
        price: productPrice,
      };

      userCart.products.push(newProduct);
    }

    userCart.products.forEach(async (product) => {
      const productInfo = await productService
        .getById({ _id: product.product })
        .lean();
      product.price = product.quantity * productInfo.price;
    });

    await cartService.update(userCart._id, { products: userCart.products });
    res.redirect("/home/1");
  } catch (error) {
    logger.error(error, "Error al agregar producto al carrito");
    res.status(500).send("Error al agregar producto al carrito");
  }
};

const deleteItemCart = async (req, res) => {
  try {
    const userId = req.session.userId;
    const productId = req.params.productId;

    const user = await userService.getById({ _id: userId }).populate("cart");
    const userCart = user.cart;

    userCart.products = userCart.products.filter(
      (product) => product.product.toString() !== productId.toString()
    );

    await cartService.update(userCart._id, { products: userCart.products });

    res.redirect("/cart");
  } catch (error) {
    logger.error(error, "deleteItemCart cartController");
    res.status(500).send("Error deleting product from cart");
  }
};

const emptyCart = async (req, res) => {
  try {
    const userId = req.session.userId;

    const user = await userService.getById({ _id: userId }).populate("cart");
    const userCart = user.cart;

    userCart.products = [];

    await cartService.update(userCart._id, { products: userCart.products });

    res.redirect("/cart");
  } catch (error) {
    console.error(error, "emptyCart cartController");
    res.status(500).send("Error emptying the cart");
  }
};

const renderCart = async (req, res) => {
  const userId = req.session.userId;
  const cart = await cartService.getById({ user: userId }).lean();
  res.render("cart", { cart });
};

const ticket = async (req, res) => {
  try {
    const purchaserEmail = req.session.email;
    const userId = req.session.userId;

    const user = await userService.getById({ _id: userId }).populate("cart");
    const cart = user.cart;

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartProducts = cart.products;

    const amount = cartProducts.reduce((total, item) => {
      return total + item.price;
    }, 0);

    const newTicket = {
      code: generateUniqueCode(),
      amount,
      purchaser: purchaserEmail,
    };

    await ticketService.save(newTicket);

    for (const cartProduct of cartProducts) {
      const product = await productService.getById({
        _id: cartProduct.product,
      });

      const updatedStock = product.stock - cartProduct.quantity;

      await productService.update(product._id, { stock: updatedStock });
    }

    await cartService.update(cart._id, { products: [] });

    res.render("ticket", { ticket: newTicket });
  } catch (error) {
    logger.error(error, "ticket cartController");
    res.status(500).json({ message: "Error during checkout", error });
  }
};

const generateUniqueCode = () => {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
};

export default { addToCart, deleteItemCart, emptyCart, renderCart, ticket };

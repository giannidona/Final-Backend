import cartModel from "../dao/models/cartModel.js";
import { productModel } from "../dao/models/productModel.js";
import { userModel } from "../dao/models/userModel.js";
import { ticketModel } from "../dao/models/ticketModel.js";

const addToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.session.userId;

    const user = await userModel.findById(userId).populate("cart");
    const cart = user.cart;

    const existingProduct = cart.products.find(
      (product) => product.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({
        product: productId,
        quantity: 1,
      });
    }

    const product = await productModel.findById(productId);
    if (product) {
      product.stock -= 1;
      await product.save();
    }

    await cart.save();

    res.json({ message: "product added succefully" });
  } catch (error) {
    console.error("Error al agregar el producto al carrito", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { addToCart };

const viewCart = async (req, res) => {
  try {
    const userId = req.session.userId;

    const user = await userModel
      .findById(userId)
      .populate({
        path: "cart",
        populate: {
          path: "products.product",
          model: "products",
        },
      })
      .lean();
    const cart = user.cart;

    res.render("cart", { cart });
  } catch (error) {
    console.error("Error getting cart", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { viewCart };

const finalizePurchase = async (req, res) => {
  try {
    const purchaserEmail = req.session.email;

    const { cid } = req.params;
    const cart = await cartModel.findById(cid).populate("products.product");

    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }

    const amount = cart.products.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const ticket = new ticketModel({
      code: generateUniqueCode(),
      amount,
      purchaser: purchaserEmail,
    });

    await ticket.save();

    return res
      .status(200)
      .json({ message: "Purchase completed successfully", ticket });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error during checkout", error });
  }
};

const generateUniqueCode = () => {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
};

export { finalizePurchase };

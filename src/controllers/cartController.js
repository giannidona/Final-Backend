import { cartService } from "../services/services.js";
import { userService } from "../services/services.js";
import { productService } from "../services/services.js";
import { ticketService } from "../services/services.js";

const addToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.session.userId;

    const user = await userService.getById({ _id: userId }).populate("cart");
    const userCart = user.cart || { products: [] };

    let productInfo;

    const existingProduct = userCart.products.find(
      (product) => product.product.toString() === productId.toString()
    );

    if (existingProduct) {
      existingProduct.quantity++;
      existingProduct.price = existingProduct.quantity * existingProduct.price;
    } else {
      productInfo = await productService.getById({ _id: productId }).lean();
      const productPrice = productInfo.price;

      const newProduct = {
        product: productId,
        quantity: 1,
        price: productPrice,
      };

      userCart.products.push(newProduct);
    }

    if (productInfo) {
      userCart.products.forEach((product) => {
        product.price = product.quantity * productInfo.price;
      });
    }

    await cartService.update(userCart._id, { products: userCart.products });

    res.redirect("/home");
  } catch (error) {
    console.log(error, "addToCart cartController");
    res.status(500).send("Error al agregar producto al carrito");
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

    const amount = cart.products.reduce((total, item) => {
      return total + item.price;
    }, 0);

    const newTicket = {
      code: generateUniqueCode(),
      amount,
      purchaser: purchaserEmail,
    };

    await ticketService.save(newTicket);

    await cartService.update(cart._id, { products: [] });

    res.render("ticket", { ticket: newTicket });
  } catch (error) {
    console.error(error, "ticket cartController");
    res.status(500).json({ message: "Error during checkout", error });
  }
};

const generateUniqueCode = () => {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
};

export default { addToCart, renderCart, ticket };

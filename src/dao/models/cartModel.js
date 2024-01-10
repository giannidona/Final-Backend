import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

const cartModel = mongoose.model(cartCollection, cartSchema);
export { cartModel };

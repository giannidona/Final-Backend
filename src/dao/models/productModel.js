import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  prod_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  prod_image: {
    type: String,
  },
});

const productModel = mongoose.model(productCollection, productSchema);
export { productModel };

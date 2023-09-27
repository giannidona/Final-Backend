import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const prodCollection = "products";

const prodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  descrip: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

prodSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(prodCollection, prodSchema);
export { productModel };

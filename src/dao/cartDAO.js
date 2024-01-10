import { cartModel } from "./models/cartModel.js";

export default class CartDAO {
  get = (params) => {
    return cartModel.find(params).populate("user").populate("products.product");
  };

  getById = (params) => {
    return cartModel
      .findOne(params)
      .populate("user")
      .populate("products.product");
  };

  create = (doc) => {
    return cartModel.create(doc);
  };

  update = (id, doc) => {
    return cartModel.findByIdAndUpdate(id, { $set: doc });
  };

  delete = (id) => {
    return cartModel.findByIdAndDelete(id);
  };
}

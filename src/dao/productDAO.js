import { productModel } from "./models/productModel.js";

export default class userDAO {
  get = (params) => {
    return productModel.find(params);
  };

  getById = (params) => {
    return productModel.findOne(params);
  };

  create = (doc) => {
    return productModel.create(doc);
  };

  update = (id, doc) => {
    return productModel.findByIdAndUpdate(id, { $set: doc });
  };

  delete = (id) => {
    return productModel.findByIdAndDelete(id);
  };
}

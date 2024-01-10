import { userModel } from "./models/userModel.js";

export default class userDAO {
  get = (params) => {
    return userModel.find(params);
  };

  findOne = (params) => {
    return userModel.findOne(params);
  };

  getById = (params) => {
    return userModel.findById(params);
  };

  create = (doc) => {
    return userModel.create(doc);
  };

  update = (id, doc) => {
    return userModel.findByIdAndUpdate(id, { $set: doc });
  };

  delete = (id) => {
    return userModel.findByIdAndDelete(id);
  };
}

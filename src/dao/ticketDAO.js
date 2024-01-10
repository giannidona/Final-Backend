import { ticketModel } from "./models/ticketModel.js";

export default class ticketDAO {
  get = (params) => {
    return ticketModel.find(params);
  };

  getById = (params) => {
    return ticketModel.findOne(params);
  };

  create = (doc) => {
    return ticketModel.create(doc);
  };

  update = (id, doc) => {
    return ticketModel.findByIdAndUpdate(id, { $set: doc });
  };

  delete = (id) => {
    return ticketModel.findByIdAndDelete(id);
  };
}
